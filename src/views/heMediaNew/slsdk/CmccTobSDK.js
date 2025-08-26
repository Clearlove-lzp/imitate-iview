import Pocsdk from "./js/pocsdk.js";
import Win from "./js/hal/win.js";
import { openLog, logInfo, warn, error } from "./js/core/log.js";
import Recorder from "./js/module/audio/src/recorder-core.js";
import pcm from "./js/module/audio/src/engine/pcm.js";
import buffer_stream from "./js/module/audio/src/extensions/buffer_stream.player.js";
import AMR from "./js/module/amrnb.js";

var pocsdk = new Pocsdk();
var win = new Win();

var net = function (url, reconnect, netstate, proto) {
  //ws地址
  this.url = url;
  //socket对象
  this.socket = null;
  //心跳状态  为false时不能执行操作 等待重连
  this.isHeartflag = false;
  //重连状态  避免不间断的重连操作
  this.isReconnect = reconnect;
  //重新链接定时器
  this.timeoutSet = null;
  //重连计数
  this.reConnectNum = 1;
  //重连次数限定
  this.limitReConnectNum = 10;
  this.loginNum = 0;
  this.open = true;
  //消息头长度
  this.header_len = 14;
  /*  this.web_url = "gateway.tob.cmpoc.top";*/
  this.buf_size = 50000;
  this.version = "1.0";
  this.flag = 1;
  this.coll_netstate_fun = netstate;
  this.callback_fun;
  this.all_callback_fun = [];
  this.callback_GetCurrentGroupGid_fun;
  this.QueryEnterpriseGroupList_fun;
  this.coll_message_fun = null;
  this.Uiact = proto.ui.act;
  this.Uipush = proto.ui.push;
  this.PlayRecordAudiocallback_fun = null;

  setTimeout(() => {
    this.coll_netstate_fun("open");
  }, 1000);
  this.on_notify = function (msgName, msg) {
    console.log("===================msgName:", msgName);
    // this.connect(msgName,msg)；
    this.log(1, "CmcctobSDK--msgName", msgName);
    // this.log(1, 'CmcctobSDK--msg', msg)
    this.getPushCcontent(msgName, msg);
    this.getActCcontent(msgName, msg);

    if (msgName == "webconn_open") {
      this.isHeartflag = true;
      this.reConnectNum = 1;
      ////console.info('websocket 链接成功');
      // this.coll_netstate_fun('open');
      return;
    } else if (msgName == "webconn_error") {
      clearTimeout(this.timeoutSet);
      this.isHeartflag = false;
      this.reConnect();
      // this.coll_netstate_fun('error');
      this.coll_netstate_fun("error", this.reConnectNum);
    } else if (msgName == "webconn_close") {
      clearTimeout(this.timeoutSet);
      this.reConnect();
      this.isHeartflag = false;
      this.coll_netstate_fun("close");
    } else if (msgName == "ui.act.RestorationAck") {
      return;
    }
    this.coll_message_fun(msgName, msg);
  };
  this.on_notify = this.on_notify.bind(this);

  this.log = function (level, fun, msg) {
    switch (level) {
      case 1:
        logInfo("CmcctobSDK", fun, msg);
        break;

      case 2:
        warn("CmcctobSDK", fun, msg);
        break;
      case 3:
        error("CmcctobSDK", fun, msg);
        break;
      default:
        logInfo("CmcctobSDK", fun, msg);
        break;
    }
  };
  this.log = this.log.bind(this);

  pocsdk.do_init(this.on_notify);

  /*
    this.onopen = function (event) {
        this.isHeartflag = true;
        this.reConnectNum = 1
        this.coll_netstate_fun('open');
    };

    this.onmessage = function (event) {
        this.handleEvent(event.data)
    };

    this.onerror = function (event) {
        clearTimeout(this.timeoutSet);
        this.isHeartflag = false;
        this.reConnect();
        // this.coll_netstate_fun('error');
        this.coll_netstate_fun('error', this.reConnectNum);
    };

    this.onclose = function (event) {
        clearTimeout(this.timeoutSet);
        this.reConnect();
        this.isHeartflag = false;
        this.coll_netstate_fun('close');
    };
    */
  //设置消息头
  this.setMsgHeader = function (msgbuffer, msgNameLen, msgContentLen) {
    var view = new DataView(msgbuffer);
    var msglenth = this.header_len + msgNameLen + msgContentLen;
    view.setUint32(0, msglenth);
    view.setUint16(4, this.version);
    view.setUint16(6, this.flag);
    view.setUint16(8, msgNameLen);
    view.setUint32(10, msgContentLen);
    return msglenth;
  };
  //获取消息头
  this.getMsgHeader = function (msgbuffer) {
    var view = new DataView(msgbuffer);
    var header = Array();
    header["length"] = view.getUint32(0);
    header["version"] = view.getUint16(4);
    header["seq_num"] = view.getUint16(6);
    header["name_length"] = view.getUint16(8);
    header["msg_size"] = view.getUint32(10);
    return header;
  };
  //设置消息名称
  this.setSmgName = function (str, buffer) {
    var arr = [];
    for (var i = 0, j = str.length; i < j; ++i) {
      arr.push(str.charCodeAt(i));
    }
    var buff = new Uint8Array(arr);
    for (var i = 0; i < buff.byteLength; i++) {
      buffer.setUint8(i, buff[i]);
    }
    buffer.setUint8(buff.byteLength, 0);
    return buff.byteLength + 1;
  };
  this.decodeUTF8 = function (arr) {
    var str = "";
    for (var i = 0; i < arr.length; i++) {
      str += String.fromCharCode(arr[i]);
    }
    return decodeURIComponent(escape(str));
  };

  //获取消息名称
  this.getSmgName = function (view, lenth) {
    let uint8Array = new Uint8Array(lenth - 1);
    for (var i = 0; i < lenth - 1; i++) {
      uint8Array[i] = view.getUint8(i);
    }
    var str = this.decodeUTF8(uint8Array);
    return str;
  };
  //获得自定义消息内容
  this.getActCcontent = function (getSmgName, msg_content) {
    var msg = "";

    if (getSmgName == "ui.act.SetCustomAck") {
      msg = this.Uiact.SetCustomAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.GetCustomAck") {
      msg = this.Uiact.GetCustomAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.AudioenableAck") {
      msg = this.Uiact.AudioenableAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.ClearSavedAccountAck") {
      msg = this.Uiact.ClearSavedAccountAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.ConnectAck") {
      msg = this.Uiact.ConnectAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.DisconnectAck") {
      msg = this.Uiact.DisconnectAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.DownLoadFileAck") {
      msg = msg_content;
    }
    if (getSmgName == "ui.act.EnterGroupAck") {
      // msg = this.Uiact.EnterGroupAck.deserializeBinary(msg_content);
      msg = msg_content;
    }
    if (getSmgName == "ui.act.ForceDemolitionAck") {
      msg = this.Uiact.ForceDemolitionAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.ForceDispatchAck") {
      msg = this.Uiact.ForceDispatchAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.DownloadPathAck") {
      msg = this.Uiact.ForceDispatchAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.HasSaveAccountAck") {
      msg = this.Uiact.HasSaveAccountAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetConfigureAck") {
      msg = this.Uiact.GetConfigureAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.RestorationAck") {
      // msg = this.Uiact.RestorationAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetCurrentGroupGidAck") {
      msg = msg_content;
      this.callback_GetCurrentGroupGid_fun(msg);
    }
    if (getSmgName == "ui.act.GetCurrentGroupMembersAck") {
      // msg = this.Uiact.GetCurrentGroupMembersAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetCurrentNameAck") {
      msg = this.Uiact.GetCurrentNameAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetCurrentOnlineStatusAck") {
      msg = this.Uiact.GetCurrentOnlineStatusAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetCurrentSpeakingUserAck") {
      msg = this.Uiact.GetCurrentSpeakingUserAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetCurrentUidAck") {
      msg = this.Uiact.GetCurrentUidAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetCurrentUserAck") {
      console.log("GetCurrentUserAck", msg_content);
      msg = msg_content;
      var fun = this.all_callback_fun["GetCurrentUserAck_callback"];
      fun(msg);
    }
    if (getSmgName == "ui.act.SetMemberTopAck") {
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetGroupByGidAck") {
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetGroupsListRefreshAck") {
      msg = this.Uiact.GetGroupsListRefreshAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetMosAck") {
      msg = this.Uiact.GetMosAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.GetPlayingSoundUserAck") {
      msg = this.Uiact.GetPlayingSoundUserAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetQueryUidAck") {
      // msg = this.Uiact.GetQueryUidAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetSaveAccountAck") {
      msg = this.Uiact.GetSaveAccountAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetVersionAck") {
      msg = this.Uiact.GetVersionAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetWatchGroupCountAck") {
      msg = this.Uiact.GetWatchGroupCountAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetWatchGrouplistAck") {
      msg = this.Uiact.GetWatchGrouplistAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.IsWatchGroupAck") {
      msg = this.Uiact.IsWatchGroupAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.QueryWatchListenGroupAck") {
      msg = this.Uiact.QueryWatchListenGroupAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.HasAudioEnabledAck") {
      msg = this.Uiact.HasAudioEnabledAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetGroupsListAck") {
      msg = msg_content;
      var fun = this.all_callback_fun["GetGroupsListAck"];
      fun(msg);
    }
    if (getSmgName == "ui.act.GetAllSessionAck") {
      msg = msg_content;
      var fun = this.all_callback_fun["GetAllSessionAck"];
      fun(msg);
    }
    if (getSmgName == "ui.act.IsListeningAck") {
      msg = this.Uiact.IsListeningAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.IsSpeakingAck") {
      msg = this.Uiact.IsSpeakingAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.LeaveGroupAck") {
      msg = msg_content;
    }
    if (getSmgName == "ui.act.LoginAck") {
      msg = msg_content;
    }
    if (getSmgName == "ui.act.LoginBySaveAck") {
      msg = this.Uiact.LoginBySaveAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.LogoutAck") {
      msg = msg_content;
    }
    if (getSmgName == "ui.act.ManyCallAck") {
      msg = this.Uiact.ManyCallAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.PlayLocalRecordAck") {
      msg = this.Uiact.PlayLocalRecordAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.PlayRecordBroadcastAudioAck") {
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.SaveAccountAck") {
      msg = this.Uiact.SaveAccountAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.ChangeCurrentEmailAck") {
      msg = this.Uiact.ChangeCurrentEmailAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.ChangeCurrentPhoneAck") {
      msg = this.Uiact.ChangeCurrentPhoneAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.PlayHistoryAck") {
      // msg = this.Uiact.PlayHistoryAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.TalkbackHistoryRecordAck") {
      // msg = this.Uiact.TalkbackHistoryRecordAck.deserializeBinary(msg_content);
      console.log("TalkbackHistoryRecordAck:", msg_content);
      console.log("TalkbackHistoryRecordAck:", this.callback_fun);
      var fun = this.all_callback_fun["HistorySpeech_callback"];
      msg = msg_content;
      fun(msg);
    }
    if (getSmgName == "ui.act.SendAudioBroadcastAck") {
      msg = this.Uiact.SendAudioBroadcastAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.SendMsgAck") {
      msg = this.Uiact.SendMsgAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.SendTextBroadcastAck") {
      msg = this.Uiact.SendTextBroadcastAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.SetConfigureAck") {
      msg = this.Uiact.SetConfigureAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.SetLocalRecordAck") {
      msg = this.Uiact.SetLocalRecordAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.StartRecordAudioAck") {
      msg = this.Uiact.StartRecordAudioAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.StartRecordBroadcastAudioAck") {
      // msg = this.Uiact.StartRecordBroadcastAudioAck.deserializeBinary(msg_content);
      msg = msg_content;

      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.StartSingleCallAck") {
      msg = this.Uiact.StartSingleCallAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.StartSpeakAck") {
      // msg = this.Uiact.StartSpeakAck.deserializeBinary(msg_content);
      msg = msg_content;
    }
    if (getSmgName == "ui.act.StartWatchGroupAck") {
      // msg = this.Uiact.StartWatchGroupAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.StopRecordAudioAck") {
      msg = this.Uiact.StopRecordAudioAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.StopRecordBroadcastAudioAck") {
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.StopSingleCallAck") {
      msg = this.Uiact.StopSingleCallAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.StopSpeakAck") {
      // msg = this.Uiact.StopSpeakAck.deserializeBinary(msg_content);
      msg = msg_content;
    }
    if (getSmgName == "ui.act.StopWatchGroupAck") {
      // msg = this.Uiact.StopWatchGroupAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.SwitchLocationAck") {
      msg = this.Uiact.SwitchLocationAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.SetGroupSpeakTimeAck") {
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.SetGroupPriorityAck") {
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.SetUsersPriorityAck") {
      // msg = this.Uiact.SetUsersPriorityAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.ChangeGroupNameAck") {
      // msg = this.Uiact.ChangeGroupNameAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.TempEnterGroupAck") {
      // msg = this.Uiact.TempEnterGroupAck.deserializeBinary(msg_content);
      msg = msg_content;
    }
    if (getSmgName == "ui.act.TempLeaveGroupAck") {
      msg = this.Uiact.TempLeaveGroupAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.StopPlayRecordOnLineAck") {
      msg = this.Uiact.StopPlayRecordOnLineAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.User") {
      msg = this.Uiact.User.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.act.CreateGroupAck") {
      // msg = this.Uiact.CreateGroupAck.deserializeBinary(msg_content);
      msg = msg_content;
      fun = this.all_callback_fun["creategroup_callback"];
      fun(msg);
    }
    if (getSmgName == "ui.act.DeleteSessionAck") {
      // msg = this.Uiact.DeleteSessionAck.deserializeBinary(msg_content);
      msg = msg_content;

      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.StartSessionAck") {
      // msg = this.Uiact.StartSessionAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.StopSessionAck") {
      // msg = this.Uiact.StopSessionAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.ResponseSessionAck") {
      // msg = this.Uiact.ResponseSessionAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.ResponseJoinSessionAck") {
      msg = this.Uiact.ResponseJoinSessionAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.ResponseSessionResultnAck") {
      msg = this.Uiact.ResponseSessionResultnAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GrouplistSessionAck") {
      msg = msg_content;
      fun = this.all_callback_fun["GrouplistSessionAck"];
      // console.log('---msg',msg)
      fun(msg);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.DisableUserAck") {
      msg = this.Uiact.DisableUserAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.EnableUserAck") {
      msg = this.Uiact.EnableUserAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.ChangeGroupDescAck") {
      msg = this.Uiact.ChangeGroupDescAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.DeliverMsgAck") {
      msg = this.Uiact.DeliverMsgAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.QueryEnterpriseGroupAck") {
      // msg = this.Uiact.QueryEnterpriseGroupAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.QueryEnterpriseGroupListAck") {
      // msg = this.Uiact.QueryEnterpriseGroupListAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.QueryEnterpriseGroupList_fun(msg);
    }
    if (getSmgName == "ui.act.InviteSessionAck") {
      msg = this.Uiact.InviteSessionAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.QueryMemberAck") {
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.UpdateUserConfigureAck") {
      msg = this.Uiact.UpdateUserConfigureAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.SetLockedGroupAck") {
      // msg = this.Uiact.SetLockedGroupAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.GetLockedGroupAck") {
      msg = this.Uiact.GetLockedGroupAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.CreateMkdirAck") {
      msg = this.Uiact.CreateMkdirAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.UploadFileAck") {
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.DownLoadHistoryAudioAck") {
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.CreateTxtFileAck") {
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.StartExeAck") {
      msg = this.Uiact.StartExeAck.deserializeBinary(msg_content);
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.SetUserChatEnabledAck") {
      // msg = this.Uiact.SetUserChatEnabledAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.CheckNetAck") {
      msg = this.Uiact.CheckNetAck.deserializeBinary(msg_content);
      //this.callback_fun(msg);
    }
    if (getSmgName == "ui.act.PlayRecordAudioAck") {
      // msg = this.Uiact.PlayRecordAudioAck.deserializeBinary(msg_content);
      msg = msg_content;
      this.PlayRecordAudiocallback_fun(msg);
    }
    return msg;
  };
  //获得自定义消息内容
  this.getPushCcontent = function (getSmgName, msg_content) {
    var _this = this;
    var msg;
    return msg_content;
    if (getSmgName == "ui.push.AudioEnableChanged") {
      // msg = this.Uipush.AudioEnableChanged.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.AudioEnableResult") {
      msg = this.Uipush.AudioEnableResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.ChangeNameResult") {
      msg = this.Uipush.ChangeNameResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.ChangePasswordResult") {
      msg = this.Uipush.ChangePasswordResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.CurrentGroupChanged") {
      msg = this.Uipush.CurrentGroupChanged.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.Dispatch") {
      msg = this.Uipush.Dispatch.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.DispatchResult") {
      msg = this.Uipush.DispatchResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.EnabledResult") {
      msg = this.Uipush.EnabledResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.RRResuntAck") {
      msg = this.Uipush.RRResuntAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.ErrorMessage") {
      msg = this.Uipush.ErrorMessage.deserializeBinary(msg_content);
      if (msg["array"][0] == 2 && this.loginNum < 5) {
        setTimeout(function () {
          _this.loginNum++;
          var token = sessionStorage.getItem("sdk_cmcctobserver_token");
          var web_account = sessionStorage.getItem("sdk_web_phone");
          var web_token = sessionStorage.getItem("sdk_web_token");
          _this.CmccTobServerLogin(token, web_account, web_token);
        }, 1000);
        msg = "";
      }
    }
    if (getSmgName == "ui.push.Group") {
      msg = this.Uipush.Group.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.GroupListChanged") {
      msg = this.Uipush.GroupListChanged.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.GroupType") {
      msg = this.Uipush.GroupType.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.Member") {
      msg = this.Uipush.Member.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.MemberChanged") {
      msg = this.Uipush.MemberChanged.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.MemberListChanged") {
      msg = this.Uipush.MemberListChanged.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.OnlineStatus") {
      msg = this.Uipush.OnlineStatus.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.OnlineStatusChanged") {
      msg = this.Uipush.OnlineStatusChanged.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.PlayAudioFileStatue") {
      msg = this.Uipush.PlayAudioFileStatue.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.PostBroadcastResult") {
      msg = this.Uipush.PostBroadcastResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.RecordEvent") {
      msg = this.Uipush.RecordEvent.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.RecordStart") {
      msg = this.Uipush.RecordStart.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.RecordStop") {
      msg = this.Uipush.RecordStop.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.SelfStartSpeak") {
      msg = this.Uipush.SelfStartSpeak.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.SelfStopSpeak") {
      msg = this.Uipush.SelfStopSpeak.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.SwitchLocateResult") {
      msg = this.Uipush.SwitchLocateResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.TakemicResult") {
      msg = this.Uipush.TakemicResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.User") {
      msg = this.Uipush.User.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.UserStartSpeak") {
      msg = this.Uipush.UserStartSpeak.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.UserStopSpeak") {
      msg = this.Uipush.UserStopSpeak.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.UsersChanged") {
      msg = this.Uipush.UsersChanged.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.QuerylistenGroupChanged") {
      msg = this.Uipush.QuerylistenGroupChanged.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.QuerylistenGroupResult") {
      msg = this.Uipush.QuerylistenGroupResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.WatchGroupListChanged") {
      msg = this.Uipush.WatchGroupListChanged.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.QuitGrouResult") {
      msg = this.Uipush.QuitGrouResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.RequestJoinSession") {
      msg = this.Uipush.RequestJoinSession.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.DeleteSessionAck") {
      msg = this.Uipush.DeleteSessionAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.StartSessionAck") {
      msg = this.Uipush.StartSessionAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.StopSessionAck") {
      msg = this.Uipush.StopSessionAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.ResponseSessionAck") {
      msg = this.Uipush.ResponseSessionAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.ResponseJoinSessionAck") {
      msg = this.Uipush.ResponseJoinSessionAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.ChangeGroupNameResult") {
      msg = this.Uipush.ChangeGroupNameResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.GroupChanged") {
      msg = this.Uipush.GroupChanged.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.ResponseSessionResult") {
      msg = this.Uipush.ResponseSessionResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.DisableUserAck") {
      msg = this.Uipush.DisableUserAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.EnableUserAck") {
      msg = this.Uipush.EnableUserAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.PushDeliver") {
      msg = this.Uipush.PushDeliver.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.StopSessionResult") {
      msg = this.Uipush.StopSessionResult.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.SetGroupMaxSpeechTimeAck") {
      msg = this.Uipush.SetGroupMaxSpeechTimeAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.UserStatusChanged") {
      msg = this.Uipush.UserStatusChanged.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.ChangeGroupDescAck") {
      msg = this.Uipush.UserStatusChanged.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.LiosMic") {
      msg = this.Uipush.LiosMic.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.PlayProgressAck") {
      msg = this.Uipush.PlayProgressAck.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.LntercomInfo") {
      // 问题
      msg = this.Uipush.LntercomInfo.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.MemberGetMic") {
      msg = this.Uipush.MemberGetMic.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.MemberLostMic") {
      msg = this.Uipush.MemberLostMic.deserializeBinary(msg_content);
    }
    if (getSmgName == "ui.push.RecvFirstPack") {
      msg = this.Uipush.RecvFirstPack.deserializeBinary(msg_content);
    }
    return msg;
  };

  //发送消息
  this.sendmsg = function (msgname, buffer) {
    /*
        var msgbuffer = new ArrayBuffer(this.buf_size);
        var view_name = new DataView(msgbuffer, this.header_len);
        var msg_name_len = this.setSmgName(msgname, view_name);
        var msg_content = new DataView(msgbuffer, this.header_len + msg_name_len);
        // ////console.log(msgname,msgbuffer,this.header_len + msg_name_len)
        var msg_contentlen = 0;
        if (null != buffer) {
            //////console.info(buffer);
            for (var i = 0; i < buffer.byteLength; i++) {
                msg_content.setUint8(i, buffer[i]);
            }
            msg_contentlen = buffer.byteLength;
        }
        var msg_len = this.setMsgHeader(msgbuffer, msg_name_len, msg_contentlen);
        // this.socket.send(msgbuffer.slice(0, msg_len));
        */
  };
  // this.LoadQroto();

  // this.initWs();

  // openLog();
};

net.prototype.Reconnect = function (n) {
  this.isReconnect = n;
};

function getRealJsonData(baseStr) {
  if (!baseStr || typeof baseStr != "string") return null;
  var jsonData = null;
  try {
    jsonData = JSON.parse(baseStr);
  } catch (err) {
    return null;
  }
  var needReplaceStrs = [];
  loopFindArrOrObj(jsonData, needReplaceStrs);
  needReplaceStrs.forEach(function (replaceInfo) {
    var matchArr = baseStr.match(
      eval('/"' + replaceInfo.key + '":[0-9]{15,}/')
    );
    if (matchArr) {
      var str = matchArr[0];
      var replaceStr = str.replace(
        '"' + replaceInfo.key + '":',
        '"' + replaceInfo.key + '":"'
      );
      replaceStr += '"';
      baseStr = baseStr.replace(str, replaceStr);
    }
  });
  var returnJson = null;
  try {
    returnJson = JSON.parse(baseStr);
  } catch (err) {
    return null;
  }
  return returnJson;
}

//遍历对象类型的
function getNeedRpStrByObj(obj, needReplaceStrs) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var value = obj[key];
      if (typeof value == "number" && value > 9007199254740992) {
        needReplaceStrs.push({ key: key });
      }
      loopFindArrOrObj(value, needReplaceStrs);
    }
  }
}

//遍历数组类型的
function getNeedRpStrByArr(arr, needReplaceStrs) {
  for (var i = 0; i < arr.length; i++) {
    var value = arr[i];
    loopFindArrOrObj(value, needReplaceStrs);
  }
}

//递归遍历
function loopFindArrOrObj(value, needRpStrArr) {
  var valueTypeof = Object.prototype.toString.call(value);
  if (valueTypeof === "[object Object]") {
    needRpStrArr.concat(getNeedRpStrByObj(value, needRpStrArr));
  }
  if (valueTypeof === "[object Array]") {
    needRpStrArr.concat(getNeedRpStrByArr(value, needRpStrArr));
  }
}

net.prototype.initWs = function () {
  // pocsdk.do_init()
  pocsdk.do_connect();
  return;
  window.WebSocket = window.WebSocket || window.MozWebSocket;
  if (!window.WebSocket) {
    // 检测浏览器支持
    ////console.error('错误: 浏览器不支持websocket');
    return;
  }
  if (this.isHeartflag) return;
  const that = this;

  this.socket = new WebSocket(this.url);
  this.socket.binaryType = "arraybuffer";
  this.socket.onopen = function (e) {
    that.onopen(e);
  };
  this.socket.onmessage = function (e) {
    that.onmessage(e);
  };

  this.socket.onclose = function (e) {
    that.onclose(e);
    that.socket = null; // 清理
  };
  this.socket.onerror = function (e) {
    that.onerror(e);
    that.socket = null; // 清理
  };
  return this;
};
net.prototype.close = function () {
  this.socket.close();
  this.socket = null;
};

net.prototype.reConnect = function () {
  console.log("调用复位reConnect", this.isReconnect);
  this.log(1, "调用复位reConnect", this.isReconnect);
  return;
  // if (this.isReconnect) return;
  this.isReconnect = true;
  clearTimeout(this.timeoutSet);
  ////console.log(this.reConnectNum,this.limitReConnectNum,'---this.limitReConnectNum)')
  if (this.reConnectNum < this.limitReConnectNum) {
    const self = this;
    this.timeoutSet = setTimeout(function () {
      self.initWs();
      // do_connect();
      self.reConnectNum++;
      ////console.info('正在重连第' + self.reConnectNum + '次');
      self.isReconnect = false;
    }, 2000);
  }
};
net.prototype.LoadQroto = function () {};

net.prototype.handleEvent = function (message) {
  var header = this.getMsgHeader(message);
  var name_buff = new DataView(message, this.header_len);
  var msg_name = this.getSmgName(name_buff, header["name_length"]);
  ////console.info("msg_name:" + msg_name);
  if (msg_name == "ui.net.HeartBeat") {
    this.HeartBeat();
    return;
  }
  var hea_name_len = this.header_len + header["name_length"];
  var msg_content = message.slice(hea_name_len, header["length"]);

  var msg = null;
  if (msg_name.indexOf(".act.") != -1) {
    msg = this.getActCcontent(msg_name, msg_content);
    if (msg == "") {
      return;
    }
    ////console.log('msgenamnme', msg)
    if (this.coll_message_fun != null) {
      this.coll_message_fun(msg_name, msg);
    }
  }
  if (msg_name.indexOf(".push.") != -1) {
    msg = this.getPushCcontent(msg_name, msg_content);
    if (msg == "") {
      return;
    }
    this.coll_message_fun(msg_name, msg);
  }
};
//设置消息回调函数
net.prototype.CallNetstate = function (cfun) {
  this.coll_netstate_fun = cfun;
};

//配置信息
net.prototype.setCustom = function (dns) {
  var lookup = new this.Uiact.SetCustom();
  lookup.setDns(dns);
  lookup.setContext("");
  lookup.setUrl(this.web_url);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.SetCustom", buffer);
};

//获取配置
net.prototype.getCustom = function () {
  this.sendmsg("ui.act.GetCustom", null);
};

//下载路径设置
net.prototype.DownLoadPath = function (path) {
  var lookup = new this.Uiact.DownloadPath();
  lookup.setPath(path);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.DownloadPath", buffer);
};

//设置消息回调函数
net.prototype.CallMessage = function (cfun) {
  this.coll_message_fun = cfun;
};

//链接
net.prototype.NetConnect = function (appid, password, type, version, fun) {
  this.callback_fun = fun;
  this.isReconnect = false;
  var lookup = new this.Uiact.Connect();
  lookup.setAppid(appid);
  lookup.setPassword(password);
  lookup.setType(type);
  lookup.setVersion(version);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.Connect", buffer);
};
//断开链接
net.prototype.DisNetConnect = function (token) {
  this.isReconnect = true;
  var lookup = new this.Uiact.Disconnect();
  lookup.setToken(token);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.Disconnect", buffer);
};
//复位
net.prototype.Restoration = function (account, fun) {
  // console.log('调用复位Restoration', accountthis.isReconnect)
  // return
  this.callback_fun = fun;
  pocsdk.restoration(account);

  return;
  var lookup = new this.Uiact.Restoration();
  lookup.setAccount(account);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.Restoration", buffer);
};
//登陆
net.prototype.DisLogin = function (
  token,
  account,
  password,
  platformld,
  verifyCode,
  access_token,
  fun
) {
  this.loginNum = 0;
  this.callback_fun = fun;
  sessionStorage.setItem("sdk_cmcctobserver_token", token);
  var _this = this;
  // this.CmccTobServerLogin(token, account, password);
  this.web_dis_Login(
    account,
    password,
    platformld,
    verifyCode,
    access_token,
    function (msg) {
      _this.callback_fun(msg);

      if (msg.code == 200) {
        sessionStorage.setItem("sdk_web_token", msg.data.token);
        sessionStorage.setItem("sdk_web_phone", msg.data.account);
        _this.CmccTobServerLogin(token, msg.data.account, msg.data.token, 1);
      }
    }
  );
};

//登陆
net.prototype.SmsLogin = function (
  token,
  account,
  phone,
  smscode,
  platformId,
  fun
) {
  this.loginNum = 0;
  this.callback_fun = fun;
  sessionStorage.setItem("sdk_cmcctobserver_token", token);
  var _this = this;
  this.web_sms_Login(account, phone, smscode, platformId, function (msg) {
    if (msg.code == 200) {
      sessionStorage.setItem("sdk_web_token", msg.data.token);
      sessionStorage.setItem("sdk_web_phone", msg.data.account);
      _this.CmccTobServerLogin(token, msg.data.account, msg.data.token, 2);
    }
    _this.callback_fun(msg);
  });
};

import { initKey, encrypt } from "./base.js";
//web登陆
net.prototype.web_dis_Login = function (
  account,
  password,
  platformId,
  verifyCode,
  access_token,
  callback
) {
  var pwd = $.md5(password);
  // ////console.log(pwd,'--------md5')
  // ges加密密码
  // var keyl = initKey();
  // var pwd = encrypt(password, keyl);
  // ////console.log(keyl,'--------pwd')
  console.log(this.web_url, "--------this.web_url");
  var _this = this;
  sessionStorage.setItem("sdk_web_pid", platformId);
  $.ajax({
    type: "POST",
    url: this.web_url + "/user/login/disacct",
    data:
      "account=" +
      account +
      "&pwd=" +
      pwd +
      "&platformId=" +
      platformId +
      "&verifyCode=" +
      verifyCode +
      "&Access-Token=" +
      access_token,
    contentType: "application/x-www-form-urlencoded",
    //旧的
    //url : "https://"+this.web_url+":9010/tob-login/entry",
    //data : '{"code":"userLogin.phoneandpwdlogin","data":{"phone":"'+account+'","password": "'+pwd+'","platformId": "'+platformId+'","userType": "0"}}',
    //contentType : "application/json",
    //dataType: "json",
    success: function (msg) {
      callback(msg);
    },
    error: function (msg) {
      callback(msg);
    },
  });
};

//SMS登陆
net.prototype.web_sms_Login = function (
  account,
  phone,
  smscode,
  platformId,
  callback
) {
  /*  var pwd = this.$md5(password)*/
  var _this = this;
  ////console.log(smscode);
  $.ajax({
    type: "POST",
    url: this.web_url + "/user/login/sms/dissmslogin",
    data:
      "account=" +
      account +
      "&phone=" +
      phone +
      "&smsCode=" +
      smscode +
      "&platformId=" +
      platformId,
    contentType: "application/x-www-form-urlencoded",
    success: function (msg) {
      callback(msg);
    },
    error: function (msg) {
      callback(msg);
    },
  });
};

net.prototype.CmccTobServerLogin = function (sstoken, account, password, type) {
  pocsdk.CmccTobServerLogin(account, password, 3, 3);
  return;
  var lookup = new this.Uiact.Login();
  lookup.setToken(sstoken);
  lookup.setAccount(account);
  lookup.setPassword(password);
  lookup.setRole(3);
  lookup.setType(3);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.Login", buffer);
};

//查询记录  科达调用
net.prototype.HistorySpeech = function (gid, lastId, uid, pageSize, fun) {
  console.log("查询记录  科达调用", fun);
  this.all_callback_fun["HistorySpeech_callback"] = fun;
  pocsdk.HistorySpeech(gid, lastId, uid, pageSize);
  return;
  var token = sessionStorage.getItem("sdk_web_token");
  var pid = sessionStorage.getItem("sdk_web_pid");
  var lookup = new this.Uiact.TalkbackHistoryRecord();
  lookup.setGid(gid);
  lookup.setLastid(lastId);
  lookup.setUid(uid);
  lookup.setPagesize(pageSize);
  lookup.setToken(token);
  lookup.setPid(pid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.TalkbackHistoryRecord", buffer);
};

//查询记录 调度台使用
net.prototype.PlayHistory_Tob = function (sid, paytype, filepath, fun) {
  this.callback_fun = fun;
  let isplay = false;
  pocsdk.playHistory(sid, isplay);
  return;
  var token = sessionStorage.getItem("sdk_web_token");
  var pid = sessionStorage.getItem("sdk_web_pid");
  var lookup = new this.Uiact.PlayHistory();
  lookup.setSid(sid);
  lookup.setPaytype(paytype);
  lookup.setPid(pid);
  var web_token = sessionStorage.getItem("sdk_web_token");
  lookup.setToken(web_token);
  lookup.setFilepath(filepath);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.PlayHistory", buffer);
};

//查询记录 科达使用
net.prototype.PlayHistory = function (sid, paytype, filepath, fun) {
  console.log("调阅播放");
  this.callback_fun = fun;
  let isplay = true;
  pocsdk.playHistory(sid, isplay);
  return;
  var token = sessionStorage.getItem("sdk_web_token");
  var pid = sessionStorage.getItem("sdk_web_pid");
  var lookup = new this.Uiact.PlayHistory();
  lookup.setSid(sid);
  lookup.setPaytype(paytype);
  lookup.setPid(pid);
  var web_token = sessionStorage.getItem("sdk_web_token");
  lookup.setToken(web_token);
  lookup.setFilepath(filepath);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.PlayHistory", buffer);
};

// 下载对讲
net.prototype.DownLoadHistory = function (downloaddata, msg, fun) {
  console.log("下载对讲");
  pocsdk.DownLoadHistory(downloaddata);
  return;
  var lookup = new this.Uiact.DownLoadHistoryAudio();
  for (let n = 0; n < downloaddata.length; n++) {
    var data = new this.Uiact.HistoryAudioData();
    data.setSid(downloaddata[n]["sid"]);
    data.setFilepath(downloaddata[n]["filepath"]);
    data.setType(downloaddata[n]["type"]);
    lookup.addData(data, n);
  }
  var web_token = sessionStorage.getItem("sdk_web_token");
  var pid = sessionStorage.getItem("sdk_web_pid");
  lookup.setToken(web_token);
  lookup.setMsg(msg);
  lookup.setPid(pid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.DownLoadHistoryAudio", buffer);
};

//退出登陆
net.prototype.Logout = function () {
  pocsdk.Logout();
  return;
  var lookup = new this.Uiact.Logout();
  lookup.setToken("");
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.Logout", buffer);
};
//心跳包
net.prototype.HeartBeat = function () {
  this.sendmsg("ui.net.HeartBeat", null);
};
//获取当前用户信息
net.prototype.GetCurrentUser = function (fun) {
  console.log("GetCurrentUser");
  this.all_callback_fun["GetCurrentUserAck_callback"] = fun;
  setTimeout(() => {
    pocsdk.GetCurrentUser();
  }, 3000);
  return;
  var lookup = new this.Uiact.GetCurrentUser();
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.GetCurrentUser", buffer);
};
//获取当前用户在线信息   无调用
net.prototype.GetCurrentOnlineStatus = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.GetCurrentOnlineStatus", null);
};
//获取当前用户UDI 无调用
net.prototype.GetCurrentUid = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.GetCurrentUid", null);
};
//获取当前用户名  无调用
net.prototype.GetCurrentName = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.GetCurrentName", null);
};
//修改当前用户名 无调用
net.prototype.GetChangeName = function (names) {
  return;
  var lookup = new this.Uiact.GetChangeName();
  lookup.setNewname(names);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.GetChangeName", buffer);

  // this.pocsdk.GetChangeName(buffer)
};
// 已启用音频 无调用
net.prototype.HasAudioEnabled = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.HasAudioEnabled", null);
};
//修改当前用户密码 无调用
net.prototype.GetChangePassword = function (pwd, npwd) {
  return;
  var lookup = new this.Uiact.GetChangePassword();
  lookup.setOldpassword(pwd);
  lookup.setNewpassword(npwd);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.GetChangePassword", buffer);
};

//修改邮箱 无调用
net.prototype.ChangeCurrentEmail = function (email, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.GetChangePassword();
  lookup.setEmail(email);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.ChangeCurrentEmail", buffer);
};

//修改电话 无调用
net.prototype.ChangeCurrentPhone = function (phone, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.ChangeCurrentPhone();
  lookup.setPhone(phone);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.ChangeCurrentPhone", buffer);
};

//保存账号 无调用
net.prototype.SaveAccount = function (name, pwd, role, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.SaveAccount();
  lookup.setAccount(name);
  lookup.setPassword(pwd);
  lookup.setRole(role);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.SaveAccount", buffer);
};
//清空保存账号  无调用
net.prototype.ClearSavedAccount = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.ClearSavedAccount", null);
};
//是否已保存账号  无调用
net.prototype.HasSaveAccount = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.HasSaveAccount", null);
};
//提取已经保存账号
net.prototype.GetSaveAccount = function (fun) {
  this.callback_fun = fun;
  this.sendmsg("ui.act.GetSaveAccount", null);
};
//通过保存登陆
net.prototype.LoginBySave = function (fun) {
  this.callback_fun = fun;
  this.sendmsg("ui.act.LoginBySave", null);
};
//进入组
net.prototype.EnterGroup = function (gid) {
  console.log("请求加入群组-SDK", gid);
  pocsdk.do_join_group(gid);
  return;
  var lookup = new this.Uiact.EnterGroup();
  lookup.setGid(gid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.EnterGroup", buffer);
};
//离开组
net.prototype.LeaveGroup = function () {
  console.log("请求离开群组-SDK");
  pocsdk.do_leave_group();
  return;
  this.sendmsg("ui.act.LeaveGroup", null);
};
//设置群组通话时长  科达使用
net.prototype.SetGroupSpeakTime = function (gid, duration, fun) {
  this.callback_fun = fun;
  pocsdk.set_group_speakTime(gid, duration);

  return;
  var lookup = new this.Uiact.SetGroupSpeakTime();
  lookup.setGid(gid);
  lookup.setDuration(duration);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.SetGroupSpeakTime", buffer);
};
//设置群组优先级
net.prototype.SetGroupPriority = function (gid, priority, fun) {
  this.callback_fun = fun;
  pocsdk.SetGroupPriority(gid, priority);
  return;
  var lookup = new this.Uiact.SetGroupPriority();
  lookup.setGid(gid);
  lookup.setPriority(priority);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.SetGroupPriority", buffer);
};
//设置成员优先级
net.prototype.SetUsersPriority = function (gid, uid, priority, fun) {
  console.log("设置优先级", gid, uid, priority);
  this.callback_fun = fun;
  pocsdk.SetUsersPriority(gid, uid, priority);

  return;
  var lookup = new this.Uiact.SetUsersPriority();
  lookup.setGid(gid);
  lookup.setUid(uid);
  lookup.setPriority(priority);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.SetUsersPriority", buffer);
};
//设置群组名称
net.prototype.ChangeGroupName = function (gid, gname, fun) {
  //console.log('设置群组名称')
  this.callback_fun = fun;
  pocsdk.ChangeGroupName(gid, gname);
  return;
  var lookup = new this.Uiact.ChangeGroupName();
  lookup.setGid(gid);
  lookup.setGname(gname);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.ChangeGroupName", buffer);
};
// 创建会话
net.prototype.CreateGroup = function (
  name,
  accounts,
  size,
  type,
  startinvite,
  temp,
  fun
) {
  // console.log('创建会话', name, accounts, size, type, startinvite, temp)
  console.log("创建会话", name);

  this.all_callback_fun["creategroup_callback"] = fun;
  pocsdk.CreateGroup(name, accounts, size, type, startinvite, temp, "");
  return;
  var lookup = new this.Uiact.CreateGroup();
  lookup.setAccountsList(accounts);
  lookup.setSize(size);
  lookup.setName(name);
  lookup.setType(type);
  lookup.setStartinvite(startinvite);
  lookup.setTemp(temp);
  lookup.setDescribe("");
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.CreateGroup", buffer);
};
// 删除会话
net.prototype.DeleteSession = function (sid, fun) {
  console.log("删除会话");
  this.callback_fun = fun;
  pocsdk.DeleteSession(sid);
  return;
  var lookup = new this.Uiact.DeleteSession();
  lookup.setSid(sid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.DeleteSession", buffer);
};
// 开始会话
net.prototype.StartSession = function (sid, fun) {
  console.log("开始会话", sid);
  this.callback_fun = fun;
  pocsdk.startSession(sid);
  return;

  var lookup = new this.Uiact.StartSession();
  lookup.setSid(sid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.StartSession", buffer);
};
// 停止会话
net.prototype.StopSession = function (sid, reasons, fun) {
  console.log("停止会话", fun);
  this.callback_fun = fun;
  pocsdk.StopSession(sid, reasons);

  return;

  var lookup = new this.Uiact.StopSession();
  lookup.setSid(sid);
  lookup.setReason(reasons);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.StopSession", buffer);
};
//响应会话
net.prototype.ResponseSession = function (sid, accept, reasons, fun) {
  console.log("响应会话", sid, accept, reasons);
  this.callback_fun = fun;
  pocsdk.responseSession(sid, accept, reasons);
  return;
  var lookup = new this.Uiact.ResponseSession();
  lookup.setSid(sid);
  lookup.setAccept(accept);
  lookup.setReason(reasons);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.ResponseSession", buffer);
};
// 响应加入会话  无触发
net.prototype.ResponseJoinSession = function (sid, uid, accept, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.ResponseJoinSession();
  lookup.setUid(uid);
  lookup.setSid(sid);
  lookup.setAccept(accept);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.ResponseJoinSession", buffer);
};

//通过GID获得组信息
net.prototype.GetGroupByGid = function (gid, fun) {
  console.log("通过GID获得组信息", gid);
  this.callback_fun = fun;
  pocsdk.GetCurrentGroupGid(gid);
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.GetGroupByGid();
  lookup.setGid(gid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.GetGroupByGid", buffer);
};
//获取群组列表  无调用
net.prototype.GetGroupsListRefresh = function (n, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.GetGroupsListRefresh();
  lookup.setForce(n);
  var buffer = lookup.serializeBinary();

  this.sendmsg("ui.act.GetGroupsListRefresh", buffer);
};
//获得用户当前组ID
net.prototype.GetCurrentGroupGid = function (fun) {
  console.log("调用获得用户当前组ID");
  this.callback_GetCurrentGroupGid_fun = fun;
  pocsdk.GetWatchGroupId();
  return;
  this.sendmsg("ui.act.GetCurrentGroupGid", null);
};
//获取全部组  我参与的频道
net.prototype.GetGroupsList = function (fun) {
  //console.log('调用获取全部组')
  this.all_callback_fun["GetGroupsListAck"] = fun;
  pocsdk.GetGroupsListRefresh();
  return;
  this.sendmsg("ui.act.GetGroupsList", null);
};
//获得成员列表
net.prototype.GetGroupMembers = function (gid, refresh, fun) {
  console.log("调用获得成员列表", gid);
  this.callback_fun = fun;
  pocsdk.GetGroupMembers(gid);
  return;
  var lookup = new this.Uiact.GetCurrentGroupMembers();
  lookup.setGid(gid);
  lookup.setRefresh(refresh);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.GetCurrentGroupMembers", buffer);
};
//创建临时组   无调用
net.prototype.StartManyCall = function (uidarray) {
  return;
  var lookup = new this.Uiact.ManyCall();
  lookup.setUidList(uidarray);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.ManyCall", buffer);
};
//开始监听群组
net.prototype.StartWatchGroup = function (gid, fun) {
  //console.log('请求开始监听群组')
  this.callback_fun = fun;
  pocsdk.StartWatchGroup(gid);
  return;
  var lookup = new this.Uiact.StartWatchGroup();
  lookup.setGid(gid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.StartWatchGroup", buffer);
};
//结束监听群组
net.prototype.StopWatchGroup = function (gid, fun) {
  //console.log('请求结束监听群组')
  this.callback_fun = fun;
  pocsdk.StopWatchGroup(gid);
  return;
  var lookup = new this.Uiact.StopWatchGroup();
  lookup.setGid(gid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.StopWatchGroup", buffer);
};

//根据GID查询是否监听群组  无调用
net.prototype.IsWatchGroup = function (gid, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.IsWatchGroup();
  lookup.setGid(gid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.IsWatchGroup", buffer);
};

//获取监听群组个数  无调用
net.prototype.GetWatchGroupCount = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.GetWatchGroupCount", null);
};
//获取监听群组列表  无调用
net.prototype.GetWatchGrouplist = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.GetWatchGrouplist", null);
};
//获取监听群组列表  无调用
net.prototype.GetWatchGrouplist = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.GetWatchGrouplist", null);
};
// 无调用
net.prototype.QueryWatchListenGroup = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.QueryWatchListenGroup", null);
};

//开始对讲
net.prototype.StartSpeak = function () {
  console.log("开始对讲");
  pocsdk.do_start_speak();
  // this.sendmsg('ui.act.StartSpeak', null);
};
//结束对讲
net.prototype.StopSpeak = function () {
  pocsdk.do_stop_speak();
  console.log("结束对讲");

  // this.sendmsg('ui.act.StopSpeak', null);
};
//获取播放声音人信息  无调用
net.prototype.GetPlayingSoundUser = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.GetPlayingSoundUser", null);
};
//获取正在讲话的人的信息 无调用
net.prototype.GetCurrentSpeakingUser = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.GetCurrentSpeakingUser", null);
};
//自己当前是否正在讲话 无调用
net.prototype.IsSpeaking = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.IsSpeaking", null);
};
//自己当前是否正收听语音 无调用
net.prototype.IsListening = function (fun) {
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.IsListening", null);
};
//开始单呼 无调用
net.prototype.StartSingleCall = function (uid) {
  return;
  var lookup = new this.Uiact.StartSingleCall();
  lookup.setUid(uid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.StartSingleCall", buffer);
};
//结束单呼 无调用
net.prototype.StopSingleCall = function () {
  return;
  this.sendmsg("ui.act.StopSingleCall", null);
};
//指定用户加入临时组 无调用
net.prototype.TempEnterGroup = function (gid, arruid) {
  return;
  var lookup = new this.Uiact.TempEnterGroup();
  lookup.setGid(gid);
  lookup.setUidList(arruid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.TempEnterGroup", buffer);
};

//指定用户移出临时组 无调用
net.prototype.TempLeaveGroup = function (gid, arruid) {
  return;
  var lookup = new this.Uiact.TempLeaveGroup();
  lookup.setGid(gid);
  lookup.setUidList(arruid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.TempLeaveGroup", buffer);
};
//控制遥 无调用
net.prototype.Audioenable = function (arruid, n, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.Audioenable();
  lookup.setUidList(arruid);
  lookup.setAudioenabled(n);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.Audioenable", buffer);
};
//强啦 无调用
net.prototype.ForceDispatch = function (gid, arruid) {
  return;
  var lookup = new this.Uiact.ForceDispatch();
  lookup.setGid(gid);
  lookup.setUidList(arruid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.TempLeaveGroup", buffer);
};
//强拆 无调用
net.prototype.ForceDemolition = function (arruid) {
  return;
  var lookup = new this.Uiact.ForceDemolition();
  lookup.setUidList(arruid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.ForceDemolition", buffer);
};
//获取用户信息
net.prototype.GetQueryUid = function (uid, fun) {
  console.log("获取用户信息");
  this.callback_fun = fun;
  let real_uid = 0;
  if (uid.constructor === Array) {
    real_uid = uid[0];
  } else {
    real_uid = uid;
  }
  pocsdk.GetCurrentUserInfo(real_uid);

  return;
  var lookup = new this.Uiact.GetQueryUid();
  lookup.setUid(uid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.GetQueryUid", buffer);
};
//是否开启定位  无调用
net.prototype.SwitchLocation = function (arruid, islocation, period, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.SwitchLocation();
  lookup.setUidList(arruid);
  lookup.setIslocation(islocation);
  lookup.setPeriod(period);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.SwitchLocation", buffer);
};
//发送文字  无调用
net.prototype.SendTextBroadcast = function (text, arruid) {
  return;
  var lookup = new this.Uiact.SendTextBroadcast();
  lookup.setUidList(arruid);
  lookup.setText(text);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.SendTextBroadcast", buffer);
};
//发送广播  无调用
net.prototype.SendAudioBroadcast = function (arruid) {
  return;
  var lookup = new this.Uiact.SendAudioBroadcast();
  lookup.setUidList(arruid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.SendAudioBroadcast", buffer);
};

//开始录制语音广播
net.prototype.StartRecordBroadcastAudio = function (path, second, fun) {
  this.callback_fun = fun;
  console.log("开始录制语音广播");
  isRecordingSupported().then((res) => {
    console.log("isRecordingSupported", res);
    this.open = res;
    if (res) {
      let initialize = pocsdk.StartRecordAudio(path, second);
      pocsdk.StartRecordBroadcastAudio(res, initialize);
    } else {
      pocsdk.StartRecordBroadcastAudio(res);
    }
  });
  return;

  return;
  var lookup = new this.Uiact.StartRecordBroadcastAudio();
  lookup.setPath(path);
  lookup.setSecond(second);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.StartRecordBroadcastAudio", buffer);
};

// 检测设备是否支持录音
async function isRecordingSupported() {
  // 检查基本的 API 支持
  if (!("mediaDevices" in navigator)) {
    return false;
  }
  if (typeof navigator.mediaDevices.getUserMedia !== "function") {
    return false;
  }
  if (typeof window.MediaRecorder !== "function") {
    return false;
  }

  try {
    // 尝试获取音频设备
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // 释放流资源
    stream.getTracks().forEach((track) => track.stop());

    // 枚举设备，检查是否有可用的音频输入设备
    const devices = await navigator.mediaDevices.enumerateDevices();
    for (let i = 0; i < devices.length; i++) {
      if (devices[i].kind === "audioinput") {
        console.log("audioinput");
        return true;
      }
    }
  } catch (error) {
    // 如果因为没有可用设备而失败，返回 false
    if (
      error.name === "NotFoundError" ||
      error.name === "DevicesNotFoundError"
    ) {
      return false;
    }
    console.error("检测设备时出错:", error);
  }
  return false;
}

//停止录制广播语音
net.prototype.StopRecordBroadcastAudio = function (fun) {
  this.callback_fun = fun;
  console.log("停止录制广播语音");
  if (!this.open) return;
  pocsdk.StopRecordBroadcastAudio();
  pocsdk.StopRecordAudio();
  return;
  this.sendmsg("ui.act.StopRecordBroadcastAudio", null);
};

//播放广播语音
net.prototype.PlayRecordBroadcastAudio = function (
  path,
  progress,
  priority,
  fun
) {
  this.callback_fun = fun;

  console.log("调用播放广播语音pathSDK", path);
  console.log("调用播放广播语音pathSDK", progress);
  console.log("调用播放广播语音pathSDK", priority);

  if (path == "") {
    pocsdk.stopPlay(101, null, null, null, true);
    return;
  }

  let pathNow = path.slice(-23);
  let paytype = "BroadcastAudio";
  if (path.slice(-7) == "sid.amr") {
    path = "sid.amr";
  } else {
    // console.log('调用播放广播语音pathSDK', pathNme)
  }
  pocsdk.playAudioFile(paytype, path, 0, 0, 0, pathNow);
  return;
  var lookup = new this.Uiact.PlayRecordBroadcastAudio();
  lookup.setPath(path);
  lookup.setProgress(progress);
  lookup.setPriority(priority);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.PlayRecordBroadcastAudio", buffer);
};

//开始录音 无调用
net.prototype.StartRecordAudio = function (path) {
  return;
  var lookup = new this.Uiact.StartRecordAudio();
  lookup.setPath(path);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.StartRecordAudio", buffer);
};

//下载日志
net.prototype.logDownload = function (path) {
  logInfo.save();
};

//结束录制语音 无调用
net.prototype.StopRecordAudio = function (path) {
  return;
  var lookup = new this.Uiact.StopRecordAudio();
  lookup.setPath(path);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.StopRecordAudio", buffer);
};

//下载文件
net.prototype.DownLoadFile = function (downloaddata) {
  console.log("下载文件", downloaddata);
  pocsdk.DownLoadFile(downloaddata);
  return;
  var lookup = new this.Uiact.DownLoadFile();
  for (let n = 0; n < downloaddata.length; n++) {
    win.UploadFile(downloaddata[n]["url"], downloaddata[n]["msg"]);
    var data = new this.Uiact.DownLoadData();
    data.setUrl(downloaddata[n]["url"]);
    data.setFilepath(downloaddata[n]["filepath"]);
    data.setMsg(downloaddata[n]["msg"]);
    data.setType(downloaddata[n]["type"]);
    if (downloaddata[n].hasOwnProperty("isplay")) {
      data.setIsplay(downloaddata[n]["isplay"]);
    }
    lookup.addData(data, n);
  }
  return;
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.DownLoadFile", buffer);
};

//停止播放录音 无调用
net.prototype.StopPlayRecordOnLine = function () {
  return;
  this.sendmsg("ui.act.StopPlayRecordOnLine", null);
};
//播放录音  无调用
net.prototype.PlayLocalRecord = function (path) {
  return;
  var lookup = new this.Uiact.PlayLocalRecord();
  lookup.setPath(path);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.PlayLocalRecord", buffer);
};
//设置本地录音  无调用
net.prototype.EnableLocalRecord = function (path) {
  return;
  var lookup = new this.Uiact.PlayLocalRecord();
  lookup.setPath(path);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.EnableLocalRecord", buffer);
};
//获得版本号
net.prototype.GetVersion = function (fun) {
  this.callback_fun = fun;
  this.sendmsg("ui.act.GetVersion", null);
};
//获得临时会话群组
net.prototype.GrouplistSession = function (fun) {
  // this.callback_fun = fun;
  this.all_callback_fun["GrouplistSessionAck"] = fun;
  pocsdk.GrouplistSession();
  return;
  this.sendmsg("ui.act.GrouplistSession", null);
};
//遥毙 无调用
net.prototype.DisableUser = function (uid, reasons, expired, msg, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.DisableUser();
  lookup.setUid(uid);
  lookup.setReason(reasons);
  lookup.setExpired(expired);
  lookup.setMsg(msg);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.DisableUser", buffer);
};
// 无调用
net.prototype.EnbleUser = function (uid, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.EnableUser();
  lookup.setUid(uid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.EnableUser", buffer);
};

//设置群组备注
net.prototype.ChangeGroupDesc = function (gid, desc, fun) {
  this.callback_fun = fun;
  var lookup = new this.Uiact.ChangeGroupDesc();
  lookup.setGid(gid);
  lookup.setDesc(desc);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.ChangeGroupDesc", buffer);
};

//透传  无调用
net.prototype.DeliverMsg = function (sname, strdata, len, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.DeliverMsg();
  lookup.setName(sname);
  lookup.setData(strdata);
  lookup.setLen(len);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.DeliverMsg", buffer);
};

//查询组织群组
net.prototype.QueryEnterpriseGroup = function (did, range, fun) {
  this.callback_fun = fun;
  pocsdk.QueryEnterpriseGroup(did, range);

  return;
  var lookup = new this.Uiact.QueryEnterpriseGroup();
  lookup.setDid(did);
  lookup.setRange(range);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.QueryEnterpriseGroup", buffer);
};
//获取组织群组 其他频道 子调度员频道
net.prototype.QueryEnterpriseGroupList = function (fun) {
  this.QueryEnterpriseGroupList_fun = fun;
  ////console.log(fun,'---this.QueryEnterpriseGroupList_fu')
  pocsdk.GetEnterpriseGroupList();
  return;
  var lookup = new this.Uiact.QueryEnterpriseGroupList();
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.QueryEnterpriseGroupList", buffer);
};
//邀请成员加入  无调用
net.prototype.InviteSession = function (gid, accounts, count, msg, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.InviteSession();
  lookup.setGid(gid);
  lookup.setAccountsList(accounts);
  lookup.setCount(count);
  lookup.setMsg(msg);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.InviteSession", buffer);
};

//频道锁定
net.prototype.LockedGroup = function (gid, fun) {
  console.log("频道锁定", gid);
  this.callback_fun = fun;

  // localStorage.setItem("LockedGroupGid", gid);
  pocsdk.set_locked_group(gid);
  return;
  var lookup = new this.Uiact.SetLockedGroup();
  lookup.setGid(gid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.SetLockedGroup", buffer);
};

//获得频道锁定  无调用
net.prototype.GetLockedGroup = function (fun) {
  this.callback_fun = fun;
  pocsdk.get_locked_group();
  return;
  this.callback_fun = fun;
  this.sendmsg("ui.act.GetLockedGroup", null);
};

//查询子调度员群组成员 无调用
net.prototype.QueryMember = function (gid, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.QueryMember();
  lookup.setGid(gid);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.QueryMember", buffer);
};

//更新用户配信信息 无调用
net.prototype.UpdateUserConfigure = function (
  uid,
  location_period,
  locations,
  allow_invite,
  allow_invited,
  allow_send_broadcast,
  allow_view_video,
  auto_answer,
  audio_enabled,
  location_model,
  devinfo_enabled,
  fun
) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.UpdateUserConfigure();
  lookup.setUid(uid);
  lookup.setLocationperiod(location_period);
  lookup.setLocations(locations);
  lookup.setAllowinvite(allow_invite);
  lookup.setAllowinvited(allow_invited);
  lookup.setAllowsendbroadcast(allow_send_broadcast);
  lookup.setAllowviewvideo(allow_view_video);
  lookup.setAutoanswer(auto_answer);
  lookup.setAudioenabled(audio_enabled);
  lookup.setLocationmodel(location_model);
  lookup.setDevinfoenabled(devinfo_enabled);
  devinfoenabled;
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.UpdateUserConfigure", buffer);
};

//播放录音
net.prototype.PlayRecordAudio = function (type, filepath, sid, progress, fun) {
  // console.log('播放录音filepath:', filepath)
  this.PlayRecordAudiocallback_fun = fun;

  if (filepath == "" || filepath == undefined) filepath = null;
  pocsdk.playAudioFile(type, filepath, sid, progress, false, filepath);
  return;
  var lookup = new this.Uiact.PlayRecordAudio();
  lookup.setType(type);
  lookup.setFilepath(filepath);
  lookup.setSid(sid);
  lookup.setProgress(progress);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.PlayRecordAudio", buffer);
};

//创建文件夹
net.prototype.CreateMkdir = function (dir, fun) {
  this.callback_fun = fun;
  var lookup = new this.Uiact.CreateMkdir();
  lookup.setPath(dir);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.CreateMkdir", buffer);
};

net.prototype.UploadFile = function (
  gid,
  type,
  userId,
  userName,
  targets,
  titles,
  msg,
  msgParas,
  userParas,
  msgType,
  file,
  filename,
  fun
) {
  console.log("调用UploadFile", filename);
  this.callback_fun = fun;
  pocsdk.UploadFile(
    gid,
    type,
    userId,
    userName,
    targets,
    titles,
    msg,
    msgParas,
    userParas,
    msgType,
    file,
    filename
  );
  return;
  var lookup = new this.Uiact.UploadFile();
  lookup.setUid(userId);
  lookup.setUname(userName);
  lookup.setTargetList(targets);
  ////console.log(targets.length)
  lookup.setTargetcount(targets.length);
  lookup.setTitle(titles);
  lookup.setMsg(msg);
  lookup.setMsgparas(msgParas);
  lookup.setUserparas(userParas);
  lookup.setMsgtype(msgType);
  lookup.setFile(file);
  lookup.setType(type);
  lookup.setGid(gid);
  var web_token = sessionStorage.getItem("sdk_web_token");
  var pid = sessionStorage.getItem("sdk_web_pid");
  lookup.setToken(web_token);
  lookup.setPid(pid);
  lookup.setFilename(filename);
  var buffer = lookup.serializeBinary();
  ////console.log(buffer)
  this.sendmsg("ui.act.UploadFile", buffer);
};

net.prototype.CreateTxtFile = function (filepath, msg, fun) {
  console.log("下载文本");
  pocsdk.CreateTxtFile(filepath, msg);
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.CreateTxtFile();
  lookup.setFilepath(filepath);
  lookup.setMsgdata(msg);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.CreateTxtFile", buffer);
};

// 无调用
net.prototype.StartExe = function (filepath, fun) {
  return;
  this.callback_fun = fun;
  var lookup = new this.Uiact.StartExe();
  lookup.setFilepath(filepath);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.StartExe", buffer);
};

net.prototype.GetAllSession = function (fun) {
  this.all_callback_fun["GetAllSessionAck"] = fun;
  //console.log('获取全部会话')
  pocsdk.GetAllSession();
  return;
  this.sendmsg("ui.act.GetAllSession", null);
};

net.prototype.SetMemberTop = function (gid, uid, count, top, fun) {
  console.log("调用SetMemberTop", gid, uid, count, top);
  this.callback_fun = fun;
  pocsdk.SetMemberTop(gid, uid, count, top);

  return;
  var lookup = new this.Uiact.SetMemberTop();
  lookup.setGid(gid);
  lookup.setUidList(uid);
  lookup.setCount(count);
  lookup.setTop(top);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.SetMemberTop", buffer);
};
// 遥毙 启用
net.prototype.SetUserChatEnabled = function (uid, count, enabled, fun) {
  //console.log('调用遥毙',)
  this.callback_fun = fun;
  pocsdk.do_audio_enable(uid, enabled);
  return;
  var lookup = new this.Uiact.SetUserChatEnabled();
  lookup.setUidList(uid);
  lookup.setCount(count);
  lookup.setEnabled(enabled);
  var buffer = lookup.serializeBinary();
  this.sendmsg("ui.act.SetUserChatEnabled", buffer);
};

export default net;

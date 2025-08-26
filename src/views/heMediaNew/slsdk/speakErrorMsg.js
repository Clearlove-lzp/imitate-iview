/* eslint-disable */
import { Message } from "element-ui";
import store from "../../../store";
var msgerror = {};
var login_count = 0;
// 返回错误码
msgerror[1] = "帐号密码错误";
msgerror[2] = "帐号已欠费或已超出服务期";
msgerror[3] = "帐号不存在";
msgerror[4] = "无效的帐号登录权限";
msgerror[5] = "您的账号已被非法修改，请联系代理商";
msgerror[6] = "配置信息错误";
msgerror[10] = "帐号已在其他位置登录";
msgerror[11] = "帐号登录超时";
msgerror[12] = "公司被禁用";
msgerror[20] = "网络连接失败";
msgerror[21] = "网络正在重连";
msgerror[22] = "无法连接服务器";
msgerror[24] = "无网络信号";
msgerror[30] = "加入频道请求超时";
msgerror[31] = "加入频道失败[未知错误]";
msgerror[32] = "加入频道失败[鉴权错误]";
msgerror[33] = "加入频道失败[权限错误]";
msgerror[34] = "加入频道失败[不存在]";
msgerror[35] = "加入频道失败[过期]";
msgerror[36] = "加入频道失败[配额限制]";
msgerror[37] = "加入频道失败[有效的对象为空]";
msgerror[38] = "加入群组失败[群组锁定/禁用]";
msgerror[40] = "抢麦被拒绝";
msgerror[41] = "短暂时间内多次抢麦,不允许";
msgerror[42] = "遥闭状态抢麦,不允许";
msgerror[43] = "内部会话状态错误";
msgerror[44] = "抢麦时申请音频焦点失败";
msgerror[45] = "以较低的角色值抢麦";
msgerror[46] = "接收抢麦回应超时";
msgerror[47] = "讲话被抢";
msgerror[48] = "讲话超时";
msgerror[50] = "打开录音设备失败";
msgerror[60] = "账号被锁定，无法进行群组对讲，请十分钟后再试";
msgerror[61] = "终端被锁定";
msgerror[62] = "机卡被锁定";
msgerror[63] = "没有配置帐号信息";
/**
 * 关于会话通知里涉及到人员的结构体如下
 *
  message Member {
    optional User  user     = 1;
    optional bool  ingroup   = 2; //成员是否已经进入此组，在组状态
    optional string ingroupname =3;  //成员在频道的昵称
    optional MemberSession ms  =4;
  }
  message User {
     optional uint32 uid   = 1; //用户ID
      optional string name   = 2;
      optional uint32 online  = 3; //在线状态 3:在线 1：离线
      optional bool audioEnabled  = 4 [default=true];
      optional bool sleep   = 5 [default=false];
      optional bool dnd   = 6 [default=false];
      optional bool hasgid  = 7 [default=false];
      optional string gid  = 8 ; //所在组gid
      optional int32 role   = 9 [default=0];
      optional bool locOn   = 10;
      optional uint32 locPeriod  = 11;
      optional string account   = 12; //用户帐号
      optional string avatar   = 13; //头像
      optional int32 sex     = 14; //性别
      optional uint32 priority  = 15; //优先级
    }
  message MemberSession
  {
      optional uint32     response    =1; //0-未处理 1-接收 2-拒绝
      optional bool      confirmed    =2; //0-未被同意 1-被同意
      optional bool      deleted     =3; //0-未删除 1-删除会话
  }
  * */

// 异步通知回掉消息
export function message(name, msg) {
  // console.log('异步通知回掉消息名称', name)
  // console.log('异步通知回掉消息', msg)
  if (name == "ui.act.LoginAck") {
    if (msg.getResult() == -12) {
      console.info("请先点击链接");
    }
  }
  if (name == "ui.act.SetCustomAck") {
    if (msg.getResult() == 0) {
      console.info("修改配置成功");
    }
  }
  if (name == "ui.act.GetCustomAck") {
    if (msg.getResult() == 0) {
      console.info("DNS:" + msg["array"][1] + " context:" + msg["array"][2]);
    }
  }
  if (name == "ui.push.OnlineStatusChanged") {
    onOnlineStatusChangedX(msg.getStatus());
  }
  if (name == "ui.push.GroupListChanged") {
    var a = msg["array"][0];
    onGroupListX(JSON.stringify(a));
  }
  if (name == "ui.push.AudioEnableChanged") {
    onAudioEnableChangedX(msg.getIsaudioenable());
  }
  // if (name == 'ui.push.AudioEnableResult') {
  //   onAudioEnabledX(JSON.stringify(msg['array']))
  // }
  if (name == "ui.push.ChangeNameResult") {
    onChangeNameResultX(msg["array"][0]);
  }
  if (name == "ui.push.ChangePasswordResult") {
    onChangePasswordResultX(msg["array"][0]);
  }
  // if (name == 'ui.push.DispatchResult') {
  //   onDispatchedX(JSON.stringify(msg['array']))
  // }
  // if (name == 'ui.push.TakemicResult') {
  //   onTakeMicX(JSON.stringify(msg['array']))
  // }
  // if (name == 'ui.push.SwitchLocateResult') {
  //   onSwitchLocationX(JSON.stringify(msg))
  // }
  // if (name == 'ui.push.PostBroadcastResult') {
  //   onSendedX(msg['array'][0])
  // }
  if (name == "ui.push.CurrentGroupChanged") {
    onCurrentGroupX(msg["array"][0], msg["array"][1]);
  }
  if (name == "ui.push.UsersChanged") {
    onUserChangedX(msg["array"][0], msg["array"][1]);
  }
  if (name == "ui.push.UserStartSpeak") {
    onStartPlayingX(
      msg["array"][1],
      msg["array"][3],
      msg["array"][0],
      msg["array"][2]
    );
  }
  if (name == "ui.push.UserStopSpeak") {
    onStopPlayingX(
      msg["array"][1],
      msg["array"][3],
      msg["array"][0],
      msg["array"][2]
    );
  }
  if (name == "ui.push.MemberChanged") {
    onMemberChangedX(msg["array"]);
  }
  if (name == "ui.push.PlayAudioFileStatue") {
    onStopPalyRecordX(msg["array"][0]);
  }
  if (name == "ui.push.RecordStart") {
    onStartRecordX(JSON.stringify(msg["array"]));
  }
  if (name == "ui.push.RecordStop") {
    onStopRecordX(JSON.stringify(msg["array"]));
  }
  if (name == "ui.push.ErrorMessage") {
    onErrorX(msg["array"][0], msgerror[msg["array"][0]]);
  }
  if (name == "ui.push.QuerylistenGroupResult") {
    onQuerylistenGroupResult(msg["array"]);
  }
  if (name == "ui.push.SelfStartSpeak") {
    onStartSpeakX(msg["array"][0], msg["array"][2]);
  }
  if (name == "ui.push.SelfStopSpeak") {
    onStopSpeakX(msg["array"][0], msg["array"][2]);
  }
  // v1.7 临时会话新增
  if (name == "ui.push.GroupChanged") {
    onGroupChangedX(msg["array"][0]);
  }
  if (name == "ui.push.ResponseSessionAck") {
    onResponseSessionAck(msg["array"]);
  }
  if (name == "ui.push.DeleteSessionAck") {
    onDeleteSessionX(msg["array"]);
  }
  if (name == "ui.push.StopSessionAck") {
    onStopSessionX(msg["array"]);
  }
  if (name == "ui.push.StartSessionAck") {
    onStartSessionX(msg["array"]);
  }
  if (name == "ui.push.MemberListChanged") {
    onMemberListChangedX(msg["array"]);
  }
  if (name == "ui.push.DisableUserAck") {
    onDisableUserX(msg["array"]);
  }
  if (name == "ui.push.EnableUserAck") {
    onEnableUserX(msg["array"]);
  }
  if (name == "ui.push.PushDeliver") {
    if (msg["array"][2] == "media") {
      onImMsgX(msg["array"][3]);
    }
  }
  if (name == "ui.push.ResponseSessionResult") {
    onResponseSessionX(msg["array"]);
  }
  if (name == "ui.push.RequestJoinSession") {
    onResponseJoinSessionX(msg["array"]);
  }
  if (name == "ui.push.StopSessionResult") {
    onStopSessionResultX(msg["array"]);
  }
  if (name == "ui.act.StartSpeakAck") {
    if (msg["array"][0] === -1) {
      onStartSpeakAckX();
    }
  }
  if (name == "ui.push.LntercomInfo") {
    onSpeakInData();
  }
}

// 登录状态改变通知
function onOnlineStatusChangedX(msg) {
  console.info(
    "登录状态" + msg,
    msg == 2 ? "登录中" : msg == 3 ? "登录成功" : "登录失败"
  );
  if (msg == 3) {
    store.commit("SET_SPEAKNET_LOGIN_STATUS", 2);
  }
  if (msg == 2) {
    login_count++;
  }
  if (msg == 1) {
    // Message.error('登录失败')
    store.commit("SET_SPEAKNET_LOGIN_STATUS", 1);
  }
  if (login_count == 10) {
    // 此处要发出消息退出登录
    // Message.error('登录失败')
    store.commit("SET_SPEAKNET_LOGIN_STATUS", 1);
  }
}

// 异常信息提示
function onErrorX(msg, error) {
  console.error("onErrorX msg: " + msg + "error: " + error);
  let code = Number(msg);
  Message.warning(msg + " " + error || msgerror[code]);
  // 40-50的错误码是关于语音的
  if (code >= 40 && code <= 50) store.commit("SET_SPEAK_ERROR_MESSAG", error);
  if ((code >= 0 && code <= 24) || code >= 60) store.commit("SET_BLOCK", true);
}

// 讲话者开始讲话事件通知
function onStartPlayingX(uid, name, gid, gname) {
  store.commit("SET_NOW_SPEAKER", uid + "");
  console.info(
    "onStartPlayingX 正在讲话： " +
      "uid: " +
      uid +
      " " +
      "name: " +
      name +
      "gid: " +
      gid +
      " " +
      "groupname: " +
      gname
  );
}
// 讲话者停止讲话事件通知
function onStopPlayingX(uid, name, gid, groupid) {
  store.commit("SET_NOW_SPEAKER_OVER", uid + "");
  store.commit("SET_SPEAK_OVER_STATUS");
  console.info(
    "onStopPlayingX 停止讲话： " +
      "uid: " +
      uid +
      " " +
      "name: " +
      name +
      "gid: " +
      gid +
      " " +
      "groupname: " +
      groupid
  );
}

// 开始讲话事件通知
function onStartSpeakX(gid, groupname) {
  store.commit("SET_SELF_SPEAK_STATUS", true);
  console.info(
    "onStartSpeakX 本人开始讲话： " +
      "gid: " +
      gid +
      " " +
      "groupname: " +
      groupname
  );
}
// 停止讲话事件通知
function onStopSpeakX(gid, groupname) {
  store.commit("SET_SELF_SPEAK_STATUS", false);
  store.commit("SET_SPEAK_OVER_STATUS");
  console.info(
    "onStartSpeakX 本人停止讲话： " +
      "gid: " +
      gid +
      " " +
      "groupname: " +
      groupname
  );
}

// 停止讲话并且会话已经入库
function onSpeakInData() {
  store.commit("GET_SELF_SPEAK_IN_DATA", new Date().getTime());
  console.info("onStartSpeakX 本人停止讲话，会话已入库： ");
  // console.info('onStartSpeakX 本人停止讲话，会话已入库： ' + 'gid: ' + gid + ' ' + 'groupname: ' + groupname)
}

// 修改名字事件通知
function onChangeNameResultX(success) {
  if (success == 1) {
    console.info("onChangeNameResultX 修改名字成功！！");
  } else {
    console.info("onChangeNameResultX 修改名字失败！！");
  }
}
// 修改密码通知
function onChangePasswordResultX(success) {
  if (success == 1) {
    console.info("onChangePasswordResultX 修改密码成功！！");
  } else {
    console.info("onChangePasswordResultX 修改密码失败！！");
  }
}
// 当前用户遥开遥闭状态通知
function onAudioEnableChangedX(audio_enable) {
  if (audio_enable == 1) {
    console.info("onAudioEnableChangedX 你被遥开");
  } else {
    console.info("onAudioEnableChangedX 你被遥闭！！");
  }
}

// 用户状态变化通知
function onUserChangedX(count, usersListjson) {
  // console.info("onUserChangedX change count: " + count + "change data:  " + usersListjson);
}
// 当前所在频道变化通知
function onCurrentGroupX(gid, group_name) {
  // 离开频道是 0 不用通知
  if (gid !== "0") store.commit("ENTER_GROUP_STATUS");
}
/**
 *  频道成员发生变化通知
 *  memberchange[0] 频道id
 *  memberchange[1] 变化的数据
 *  memberchange[2] 进组的数据
 *  memberchange[3] 离组的数据
 *  只监听单个的变化
 * */
function onMemberChangedX(memberchange) {
  console.log("memberchange", memberchange[0], memberchange[1], memberchange);
  let sid = store.getters.beginSpeakSid;
  if (memberchange[0] + "" === sid) {
    let obj = {};
    obj.groupId = sid;
    obj.memberChange = true;
    if (memberchange[1].length === 1) {
      let arr = memberchange[1][0];
      obj.uid = arr[0][0];
      if (arr[3][0] === 1 || arr[3][1] === true) {
        store.commit("SET_ACCEPT_USER_INFO", obj);
      }
      if (arr[3][0] !== 1 || arr[3][1] === false) {
        store.commit("SET_REJECT_USER_INFO", obj);
      }
    } else {
      if (memberchange[2].length === 1) {
        let arr = memberchange[2][0];
        obj.uid = arr[0][0];
        store.commit("SET_ACCEPT_USER_INFO", obj);
      }
      if (memberchange[3].length === 1) {
        let arr = memberchange[3][0];
        obj.uid = arr[0][0];
        store.commit("SET_REJECT_USER_INFO", obj);
      }
    }
  }
}

// 频道列表发生变化通知
function onGroupListX(grouplistjosn) {
  store.commit("SET_GROUP_CHANGE_STATUS");
}
function onResponseSessionAck(msg) {
  if (msg[2] === 0) store.commit("SET_GROUP_CHANGE_STATUS");
}
// 调度员所在频道里，其他成员抢麦成功事件通知
function onUserStartSpeakX(uid, name, gid, group_name) {
  console.info(
    "onUserStartSpeakX : " + uid + " " + name + " " + gid + " " + group_name
  );
}

// 调度员所在频道里，其他成员放麦成功事件通知
function onUserStopSpeakX(uid, name, gid, group_name) {
  console.info(
    "onUserStopSpeakX : " + uid + " " + name + " " + gid + " " + group_name
  );
}

// 结束播放录音的通知事件
function onStopPalyRecordX(msg) {
  console.log("语音播放", msg == 1 ? "开始" : "结束");
  store.commit("SET_PLAY_VOICE_STATUS", msg);
}

// 监听频道关系结果
function onQuerylistenGroupResult(msg) {
  console.info("onQuerylistenGroupResult : " + msg);
}

// 频道变化通知
function onGroupChangedX(group_data) {
  console.log("频道变化通知", group_data);
  let uid = JSON.parse(sessionStorage.getItem("slsdk_userinfo")).uid;
  if (group_data[2] == 5 && group_data[15][0] == 1) {
    if (group_data[15][4] != uid) {
      store.commit("SET_GROUP_CHANGE_STATUS");
      store.commit("SET_ACCEPT_TEMP_SPEAK_INFO", group_data);
    } else {
      console.info("等待回应：gid=" + group_data[0]);
    }
  }
  if (
    group_data[2] == 5 &&
    (group_data[15][0] == 0 || group_data[15][0] == 3)
  ) {
    //0 3 表示会话结束
    console.info("频道变化通知-结束会话", group_data);
    store.commit("SET_END_SPEAK_SID", group_data[0] + "");
  }
  if (group_data[2] == 5 && group_data[15][0] == 2) {
    console.info("频道变化通知开始会话");
    store.commit("SET_BEGIN_SPEAK_SID", group_data[0] + "");
  }
}

// 回复邀请 (接受和被接受都会触发（待验证）)
function onResponseSessionX(msg) {
  console.log("回复邀请 (接受和被接受都会触发)", msg);
  let obj = {};
  obj.groupId = msg[1];
  obj.uid = msg[2];
  if (msg[3]) store.commit("SET_ACCEPT_USER_INFO", obj);
  if (!msg[3]) store.commit("SET_REJECT_USER_INFO", obj);
}
// 响应再次邀请
function onResponseJoinSessionX(msg) {
  let obj = {};
  obj.groupId = msg[0];
  obj.uid = msg[1];
  store.commit("SET_AGAIN_ENTER_SPEAK_INFO", obj);
}
// 人员已进入后退出会话通知
function onStopSessionResultX(msg) {
  console.log("人员已进入后退出会话通知", msg);
  let obj = {
    groupId: msg[1],
    uid: msg[2],
    accept: msg[3],
  };
  store.commit("SET_STOP_TEMP_SPEAK_INFO", obj);
}
// 删除会话
function onDeleteSessionX(msg) {
  store.commit("SET_DEL_TEMP_SPEAK_STATUS");
}
// 停止会话
function onStopSessionX(msg) {
  console.info("停止会话 : " + msg);
}
// 开始会话
function onStartSessionX(msg) {
  console.info("开始会话 : " + msg[1]);
  if (msg[0] === 0) store.commit("SET_START_IN_VITE_ID", msg[1] + "");
}
// 成员变动
function onMemberListChangedX(msg) {
  store.commit("MEMBER_LIST_CHANGE", { changeDate: new Date().getTime() });
}
// 遥毙
function onDisableUserX(msg) {
  console.info("onDisableUserX : " + msg);
}
// 复活
function onEnableUserX(msg) {
  console.info("onEnableUserX : " + msg);
}
// IM消息通知
function onImMsgX(msg) {
  console.log("IM消息通知触发", msg);
  // 解决 targetId 为数字 精度损失的问题
  msg = msg.replace(/\"targetId\":(\d+)/, '"targetId": "$1"');
  // console.info("IM多媒体消息推送", JSON.parse(msg))
  let obj = JSON.parse(msg);
  store.commit("SET_IM_MSG_TIP_STATUS", obj.data);
}

// 抢麦不成功的
function onStartSpeakAckX() {
  store.commit("SET_SELF_SPEAK_STATUS", false);
}

import Client from "./core/client.js";
import Win from "./hal/win.js";
import event_statused from "./common/event_status.js";
import hex_md5 from "./module/md5.js";
import Translator from "./core/translator.js";
import { findBySpeechId, getHistorySpeech } from "../api/api";
import { logInfo, warn, error } from "../js/core/log.js";
const EVENT_STATUS = event_statused.EVENT_STATUS,
  GROUP_TYPE = event_statused.GROUP_TYPE;
function show_result_info(e) {}
var Pocsdk = function () {
  this.client,
    this.win,
    (this.show_result_count = 0),
    (this.gid = 10),
    (this.ui_notify = null),
    (this.m_current_group_gid = ""),
    (this.m_current_group_status = ""),
    (this.m_group_name = null),
    (this.tmp_record_data = []),
    (this.record_audio_timer = null),
    (this.log = function (e, t, o) {
      switch (e) {
        case 1:
        default:
          logInfo("pocsdk", t, o);
          break;
        case 2:
          warn("pocsdk", t, o);
          break;
        case 3:
          error("pocsdk", t, o);
      }
    }),
    (this.log = this.log.bind(this)),
    (this.on_notify = function (e, t) {
      show_result_info(e);
      var o = "",
        s = null;
      if ((this.log(1, "pocsdk--status", e.code), null != t)) {
        var i = t.jmsg;
        switch (e.code) {
          case EVENT_STATUS.UI_SET_GROUP_PRIORITY_ACK.code:
            (s = new proto.ui.act.SetGroupPriorityAck()).setResult(0),
              (o = "ui.act.SetGroupPriorityAck");
            break;
          case EVENT_STATUS.UI_SET_GROUP_SPEAK_TIME_ACK.code:
            (s = new proto.ui.act.SetGroupSpeakTimeAck()).setResult(0),
              (o = "ui.act.SetGroupSpeakTimeAck");
            break;
          case EVENT_STATUS.RR_LIST_SESSION_ACK.code:
            (s = r = this.translator.listSessionAck(t)),
              (o = "ui.act.GrouplistSessionAck");
            break;
          case EVENT_STATUS.RR_HISTORY_ACK.code:
            (o = "ui.act.PlayHistoryAck"),
              (s = new proto.ui.act.PlayHistoryAck()).setResult(t.result),
              s.setPathfile(t.pathfile),
              s.setSid(t.sid),
              s.setPaytype(t.paytype);
            break;
          case EVENT_STATUS.RR_SET_MEMBER_TOP_ACK.code:
            (o = "ui.act.SetMemberTopAck"),
              (s = new proto.ui.act.SetMemberTopAck()).setResult(0);
            break;
          case EVENT_STATUS.RR_START_RECORD_BROADCAST_AUDIO_ACK.code:
            (o = "ui.act.PlayRecordBroadcastAudioAck"),
              (s = new proto.ui.act.PlayRecordBroadcastAudioAck()).setResult(0);
            break;
          case EVENT_STATUS.RR_UPLOAD_FILE.code:
            (o = "ui.act.UploadFileAck"),
              (s = new proto.ui.act.UploadFileAck()).setResult(t);
            break;
          case EVENT_STATUS.RR_UPLOAD_FILE_ACK.code:
            console.log(t, "RR_UPLOAD_FILE_ACK"),
              (o = "ui.act.DownLoadFileAck"),
              (s = new proto.ui.act.DownLoadFileAck()).setResult(0),
              s.setPath(t.url),
              "audio" == t.msg && (t.msg = "audio"),
              s.setMsg(t.msg);
            break;
          case EVENT_STATUS.RR_DOWN_LOAD_TXT.code:
            (o = "ui.act.CreateTxtFileAck"),
              (s = new proto.ui.act.CreateTxtFileAck()).setResult(0);
            break;
          case EVENT_STATUS.RR_DOWN_LOAD_HISTORY.code:
            (o = "ui.act.DownLoadHistoryAudioAck"),
              (s = new proto.ui.act.DownLoadHistoryAudioAck()).setResult(0);
            break;
          case EVENT_STATUS.RR_STOP_RECORD_BROADCAST_AUDIO.code:
            (o = "ui.act.StopRecordBroadcastAudioAck"),
              (s = new proto.ui.act.StopRecordBroadcastAudioAck()).setResult(0);
            break;
          case EVENT_STATUS.RR_START_RECORD_BROADCAST_AUDIO.code:
            (o = "ui.act.StartRecordBroadcastAudioAck"),
              (s = new proto.ui.act.StartRecordBroadcastAudioAck()).setResult(
                t.status
              );
            break;
          case EVENT_STATUS.RR_PLAY_RECORD_AUDIO_ACK.code:
            (o = "ui.act.PlayRecordAudioAck"),
              (s = new proto.ui.act.PlayRecordAudioAck()),
              0 == t.result ? s.setResult(0) : s.setResult(-1);
            break;
          case EVENT_STATUS.RR_SPEAK.code:
            (o = "ui.act.StartSpeakAck"),
              (s = new proto.ui.act.StartSpeakAck()).setResult(t);
            break;
          case EVENT_STATUS.RR_SPEAK_STOP.code:
            (o = "ui.act.StopSpeakAck"),
              (s = new proto.ui.act.StopSpeakAck()).setResult(t);
            break;
          case EVENT_STATUS.RR_RESTOR_GROUP_ID_ACK.code:
            (o = "ui.act.GetCurrentGroupGidAck"),
              (s = r = this.translator.getCurrentGroupGid_ack(t));
            break;
          case EVENT_STATUS.RR_RESTOR_ATION_ACK.code:
            (o = "ui.act.RestorationAck"),
              (s = new proto.ui.act.RestorationAck()).setResult(0);
            break;
          case EVENT_STATUS.WEBCONNECT_OPEN.code:
            console.log("链接成功123456"), (o = "webconn_open"), (s = t);
            break;
          case EVENT_STATUS.UI_START_SESSION_ACK.code:
            (o = "ui.act.StartSessionAck"),
              (s = new proto.ui.act.StartSessionAck()),
              0 == t.result ? s.setResult(0) : s.setResult(-1);
            break;
          case EVENT_STATUS.UI_DELETE_SESSION_ACK.code:
            (o = "ui.act.DeleteSessionAck"),
              (s = new proto.ui.act.DeleteSessionAck()),
              0 == t.result ? s.setResult(0) : s.setResult(-1);
            break;
          case EVENT_STATUS.UI_RESPONSE_SESSION_ACK.code:
            (o = "ui.act.ResponseSessionAck"),
              (s = new proto.ui.act.ResponseSessionAck()),
              0 == t.result ? s.setResult(0) : s.setResult(-1);
            break;
          case EVENT_STATUS.UI_STOP_SESSION_ACK.code:
            console.log("进入ui.act.StopSessionAck", t),
              (s = new proto.ui.act.StopSessionAck()),
              (o = "ui.act.StopSessionAck"),
              0 == t.result ? s.setResult(0) : s.setResult(-1),
              console.log("msg------", s);
            break;
          case EVENT_STATUS.UI_CREATE_GROUP_ACK.code:
            (o = "ui.act.CreateGroupAck"),
              (s = new proto.ui.act.CreateGroupAck()),
              0 == t.result ? s.setResult(0) : s.setResult(-1);
            break;
          case EVENT_STATUS.RR_CONFIGURE_QUERY_ENTERPRISE.code:
            (o = "ui.act.QueryEnterpriseGroupAck"),
              (s = new proto.ui.act.QueryEnterpriseGroupAck()).setResult(0);
            break;
          case EVENT_STATUS.RR_CONFIGURE_USER_PRECEDENCE_ACK.code:
            (o = "ui.act.SetUsersPriorityAck"),
              (s = r = this.translator.userPrecedence_ack(i));
            break;
          case EVENT_STATUS.UI_QueryEnterpriseGroupListAck.code:
            {
              let e = this.client.get_group_list(),
                t = this.client.get_enterprise_grouplist(),
                i = !0,
                n = [];
              if (0 == t.length) return;
              t = [...t[0].values()];
              for (let o = 0; o < t.length; ++o) {
                for (let s = 0; s < e.length; ++s)
                  (t[o].group.gid !== e[s].gid &&
                    "SESSION" != t[o].group.type) ||
                    (i = !1);
                i && n.push(t[o]), (i = !0);
              }
              console.log("其他频道", n),
                n.sort((e, t) => t.group.createTime - e.group.createTime),
                (o = "ui.act.QueryEnterpriseGroupListAck"),
                (s = r = this.translator.getenteriselist_ack(n));
            }
            break;
          case EVENT_STATUS.RR_GROUP_info_ACK.code:
            (o = "ui.act.GetGroupByGidAck"),
              (s = r = this.translator.groupInfo_ack(t));
            break;
          case EVENT_STATUS.RR_LEAVE_GROUP_ACK.code:
            (o = "ui.act.LeaveGroupAck"),
              (s = r = this.translator.leaveGroup_ack(i));
            break;
          case EVENT_STATUS.RR_LOGOUT_ACK.code:
            break;
          case EVENT_STATUS.UI_GET_GROUPLIST_ACK.code:
            (o = "ui.act.GetGroupsListAck"),
              (s = r = this.translator.GetGroupsList_ack(t));
            break;
          case EVENT_STATUS.RR_UPDATE_USER_CHAT_ENABLE_ACK.code:
            (s = new proto.ui.act.SetUserChatEnabledAck()).setResult(0),
              (o = "ui.act.SetUserChatEnabledAck");
            break;
          case EVENT_STATUS.RR_USER_INFO_ACK.code:
            (o = "ui.act.GetCurrentUserAck"),
              (s = r = this.translator.GetCurrentUser_ack(t)),
              console.log(r, "----d");
            break;
          case EVENT_STATUS.CONNECTED.code:
            console.log("链接成功123"), (o = "webconn_open");
            break;
          case EVENT_STATUS.DISCONNECT.code:
            o = "webconn_close";
            break;
          case EVENT_STATUS.CONNECT_ERROR.code:
            break;
          case EVENT_STATUS.PUSH_ON_USER_STATUS_CHANGED.code:
            if (
              (console.log("用户在线状态改变1", t), 0 == t.jmsg.onlines.length)
            )
              return;
            (o = "ui.push.OnlineStatusChanged"),
              (s = r = this.translator.user_status_changed(3));
            break;
          case EVENT_STATUS.RR_LOGIN_ACK.code:
            (o = "ui.act.LoginAck"),
              (s = r = this.translator.login_ack(i.result, i.self));
            break;
          case EVENT_STATUS.RR_JOIN_GROUP_ACK.code:
            (r = this.translator.enterGroup_ack(i)).setResult(0),
              (o = "ui.act.EnterGroupAck"),
              (s = r);
            break;
          case EVENT_STATUS.PUSH_CURRENT_GROUP.code:
            (o = "ui.act.GetCurrentGroupGidAck"),
              (s = r = this.translator.current_group_ack(i));
            break;
          case EVENT_STATUS.ERROR_LOGIN_PRIVILEGE.code:
            console.log("退出登录1 其他用户登录", t),
              this.log(2, "ERROR_LOGIN_PRIVILEGE-pocsdk", t.reason),
              (s = new proto.ui.push.ErrorMessage()).setError(10),
              s.setReason(t.reason),
              s.setWhat(""),
              null != t.what && s.setWhat(t.what),
              (o = "ui.push.ErrorMessage");
            break;
          case EVENT_STATUS.EN_ERROR_NOTIFY.code:
            console.log("退出登录2 其他用户登录"),
              this.log(2, "EN_ERROR_NOTIFY-pocsdk", t),
              (s = new proto.ui.push.ErrorMessage()).setError(t.error),
              s.setReason(t.reason),
              s.setWhat(""),
              null != t.what && s.setWhat(t.what),
              (o = "ui.push.ErrorMessage");
            break;
          case EVENT_STATUS.EN_ERROR.code:
            break;
          case EVENT_STATUS.EN_NETWORK_STATUS.code:
            console.log("用户在线状态改变2"),
              (s = new proto.ui.push.OnlineStatusChanged()).setStatus(t.param1),
              (o = "ui.push.OnlineStatusChanged");
            break;
          case EVENT_STATUS.EN_ONLINE_STATUS_CHANGED.code:
            console.log("用户在线状态改变3"),
              (s = new proto.ui.push.OnlineStatusChanged()).setStatus(t.param1),
              (o = "ui.push.OnlineStatusChanged");
            break;
          case EVENT_STATUS.EN_LISTEN_GROUPLIST_CHANGED.code:
            (s = new proto.ui.push.QuerylistenGroupChanged()).setMsgstate(
              t.param1
            ),
              (o = "ui.push.QuerylistenGroupChanged");
            break;
          case EVENT_STATUS.EN_QueryListenGroupAck.code:
            (s = new proto.ui.push.QuerylistenGroupResult()),
              (o = "ui.push.QuerylistenGroupResult");
            break;
          case EVENT_STATUS.EN_RR_RESULT.code:
            s = new proto.ui.push.RRResuntAck();
            break;
          case EVENT_STATUS.EN_QuitGroup.code:
            s = new proto.ui.push.QuitGrouResult();
            break;
          case EVENT_STATUS.EN_RequestJoinSession.code:
            s = new proto.ui.push.RequestJoinSession();
            break;
          case EVENT_STATUS.EN_DeleteSessionAck.code:
            (o = "ui.push.DeleteSessionAck"),
              (s = new proto.ui.push.DeleteSessionAck()).setMsgstate(0),
              s.setSid(t.gid);
            break;
          case EVENT_STATUS.EN_StartSessionAck.code:
            (o = "ui.push.StartSessionAck"),
              (s = new proto.ui.push.StartSessionAck()).setMsgstate(0),
              s.setSid(t.gid),
              s.setReason(t.reason);
            break;
          case EVENT_STATUS.EN_ResponseSession.code:
            (o = "ui.push.ResponseSessionResult"),
              (s = new proto.ui.push.ResponseSessionResult()).setMsgstate(0),
              s.setGid(t.gid),
              s.setUid(t.uid),
              s.setAccept(t.accept),
              s.setReason(t.reason);
            break;
          case EVENT_STATUS.EN_StopSessionAck.code:
            console.log("进入ui.push.StopSessionAck", t),
              (o = "ui.push.StopSessionAck"),
              (s = new proto.ui.push.StopSessionAck()).setMsgstate(0),
              s.setSid(t.gid);
            break;
          case EVENT_STATUS.EN_SetGroupMaxSpeechTimeAck.code:
            s = new proto.ui.push.SetGroupMaxSpeechTimeAck();
            break;
          case EVENT_STATUS.EN_StopSession.code:
            s = new proto.ui.push.StopSessionResult();
            break;
          case EVENT_STATUS.EN_ResponseSessionAck.code:
            (o = "ui.push.ResponseSessionAck"),
              (s = new proto.ui.push.ResponseSessionAck()).setMsgstate(0),
              s.setSid(t.gid),
              1 == t.accept ? (t.accept = 1) : (t.accept = 0),
              s.setAccept(t.accept);
            break;
          case EVENT_STATUS.EN_ResponseJoinSessionAck.code:
            s = new proto.ui.push.ResponseJoinSessionAck();
            break;
          case EVENT_STATUS.EN_CHANGE_NAME_RESULT.code:
            s = new proto.ui.push.ChangeNameResult();
            break;
          case EVENT_STATUS.EN_CHANGE_PASSWORD_RESULT.code:
            s = new proto.ui.push.ChangePasswordResult();
            break;
          case EVENT_STATUS.EN_PLAY_AUDIO_FILE_STATUS.code:
            console.log("pocsdkui.push.PlayAudioFileStatue"),
              (s = new proto.ui.push.PlayAudioFileStatue()).setMsgstate(
                t.state
              ),
              s.setSid(t.sid),
              (o = "ui.push.PlayAudioFileStatue");
            break;
          case EVENT_STATUS.EN_RECORD_START.code:
            if (
              (console.log(t, "---param"),
              (o = "ui.push.RecordStart"),
              (s = new proto.ui.push.RecordStart()).setGid("0"),
              s.setUid(0),
              null != t)
            ) {
              let e = new proto.ui.push.RecordEvent();
              e.setRecordname(""),
                e.setTimenow(t.timenow),
                e.setSuccess(t.success),
                e.setSpeechid("0"),
                s.setRecorde(e);
            }
            break;
          case EVENT_STATUS.EN_RECORD_STOP.code:
            if (
              (console.log(t, "---param"),
              (o = "ui.push.RecordStop"),
              (s = new proto.ui.push.RecordStop()).setGid("0"),
              s.setUid(0),
              null != t)
            ) {
              let e = new proto.ui.push.RecordEvent();
              e.setRecordname(t.Recordname),
                e.setTimenow(t.timenow),
                e.setSuccess(t.success),
                e.setSpeechid(t.speech_id),
                s.setRecorde(e);
            }
            console.log("tmp_record_data", t.record_buff),
              5 == this.tmp_record_data.length &&
                this.tmp_record_data.splice(0, 3),
              this.tmp_record_data.push({
                path: t.Recordname,
                pathBuff: t.record_buff,
              });
            break;
          case EVENT_STATUS.EN_GROUPLIST_CHANGED.code:
            if (
              ((s = new proto.ui.push.GroupListChanged()),
              (o = "ui.push.GroupListChanged"),
              null === t)
            ) {
              let e = [],
                t = this.client.get_group_list();
              for (let o = 0; o < t.length; o++) {
                let s = this.translator.group_list(t[o]);
                e.push(s);
              }
              s.setUpdatesList(e),
                s.setCount(t.length),
                s.setUpdatecount(t.length),
                s.setRemovecount(0);
              break;
            }
            {
              (t = t.changed_info),
                s.setCount(t.count),
                s.setUpdatecount(t.updated_count);
              let e = [];
              for (let o = 0; o < t.updated_count; o++) {
                let s = this.client.get_group_by_gid(t.updated[o]),
                  i = this.translator.group_list(s);
                e.push(i);
              }
              s.setUpdatesList(e), s.setRemovecount(t.removed_count);
              let o = [];
              for (let e = 0; e < t.removed_count; e++) o.push(t.removed[e]);
              s.setRemovesList(o);
              break;
            }
          case EVENT_STATUS.EN_GROUP_CHANGED.code:
            {
              (s = new proto.ui.push.GroupChanged()),
                (o = "ui.push.GroupChanged"),
                this.log("1", "pocsdk", "param.gid :" + t.gid);
              let e = {};
              if (
                ((e = this.client.get_group_by_gid(t.gid)),
                console.log(e, "---param"),
                t.gid > 0)
              ) {
                if (null === e) break;
                let o = this.client.get_myself(),
                  i = this.client.get_member_by_uid(t.gid, o.uid);
                i && s.setResponse(i.ms.response),
                  (e.session.status = t.session_status),
                  (e.type = t.type),
                  console.log(e, "---group");
                let r = this.translator.group_list(e);
                s.setGroups(r);
              }
              if ("SESSION" === t.type) {
                if (
                  this.m_current_group_gid == t.gid &&
                  this.m_group_name != e.name
                ) {
                  this.m_group_name = e.name;
                  let o = "ui.push.ChangeGroupNameResult",
                    s = new proto.ui.push.ChangeGroupNameResult();
                  s.setMsgstate(1), s.setGid(t.gid), this.ui_notify(o, s);
                }
                if (
                  this.m_current_group_gid == t.gid &&
                  this.m_current_group_status == t.session_status
                )
                  return void console.log("进入了这里");
              }
              (this.m_current_group_gid = t.gid),
                (this.m_current_group_status = t.session_status);
            }
            break;
          case EVENT_STATUS.EN_CURRENT_GROUP_CHANGED.code:
            (o = "ui.push.CurrentGroupChanged"),
              (s = r = this.translator.current_group_changed(t)),
              console.log("群组变更通知", r);
            break;
          case EVENT_STATUS.EN_MEMBERS_CHANGED.code:
            if (null === t.changed_info) {
              (o = "ui.push.MemberListChanged"),
                (s = new proto.ui.push.MemberListChanged()).setGid(t.gid);
              let e = [],
                i = this.client.get_member_list(t.gid);
              if (null == i) return;
              for (let t = 0; t < i.length; t++) {
                let o = this.translator.member(i[t]);
                e.push(o);
              }
              s.setMmsList(e);
            } else
              (s = this.translator.transfer_members_changed(t.changed_info)),
                (o = "ui.push.MemberChanged");
            break;
          case EVENT_STATUS.EN_CHANGE_GROUP_NAME_RESULT.code:
            (o = "ui.push.ChangeGroupNameResult"),
              (s = new proto.ui.push.ChangeGroupNameResult()).setMsgstate(
                t.result
              ),
              s.setGid(t.gid);
            break;
          case EVENT_STATUS.EN_CHANGE_SESSION_NAME_RESULT.code:
            (o = "ui.act.ChangeGroupNameAck"),
              (s = new proto.ui.act.ChangeGroupNameAck()).setResult(0);
            break;
          case EVENT_STATUS.EN_USER_CHANGED.code:
            (o = "ui.push.UsersChanged"),
              (s = new proto.ui.push.UsersChanged()).setUsercount(
                t.uids.length
              ),
              s.setUidList(t.uids);
            break;
          case EVENT_STATUS.RR_MSG_CONTENT_ACK.code:
            (o = "ui.act.SetLockedGroupAck"),
              (s = new proto.ui.act.SetLockedGroupAck()).setResult(0);
            break;
          case EVENT_STATUS.EN_SELF_SPEAKING_START.code:
            (o = "ui.push.SelfStartSpeak"),
              (s = new proto.ui.push.SelfStartSpeak()).setGid(t.gid),
              t.gname && s.setGname(t.gname),
              s.setUid(t.uid);
            break;
          case EVENT_STATUS.EN_SELF_SPEAKING_STOP.code:
            (o = "ui.push.SelfStopSpeak"),
              (s = new proto.ui.push.SelfStopSpeak()).setGid(t.gid),
              null === t.gname ? s.setGname("") : s.setGname(t.gname),
              s.setUid(t.uid),
              s.setAudiotime(t.audiotime);
            break;
          case EVENT_STATUS.EN_MEMBER_SPEAKING_START.code:
            (o = "ui.push.UserStartSpeak"),
              (s = new proto.ui.push.UserStartSpeak()).setGid(t.gid),
              s.setUid(t.uid),
              t.gname && s.setGname(t.gname),
              t.uname && s.setUname(t.uname);
            break;
          case EVENT_STATUS.EN_MEMBER_GET_MIC.code: {
            (o = "ui.push.MemberGetMic"),
              (s = new proto.ui.push.MemberGetMic()).setGid(t.gid),
              s.setUid(t.uid),
              s.setSid(t.sid),
              t.gname && s.setGname(t.gname),
              t.uname && s.setUname(t.uname),
              s.setConnecttime(t.connecttime);
            let e = this.client.get_group_session_by_gid(t.gid);
            e
              ? s.setType(this.translator.trans_group_type(e.type))
              : s.setType(
                  this.translator.trans_group_type(GROUP_TYPE.GROUP_STATIC)
                );
            break;
          }
          case EVENT_STATUS.EN_MEMBER_LOST_MIC.code:
            (o = "ui.push.MemberLostMic"),
              (s = new proto.ui.push.MemberLostMic()).setGid(t.gid),
              s.setUid(t.uid),
              s.setSid(t.sid),
              t.gname && s.setGname(t.gname),
              t.uname && s.setUname(t.uname),
              s.setElapsedms(t.elapsedms),
              s.setSize(t.size),
              s.setType(this.translator.trans_group_type(t.type));
            break;
          case EVENT_STATUS.EN_MEMBER_SPEAKING_STOP.code:
            (o = "ui.push.UserStopSpeak"),
              (s = new proto.ui.push.UserStopSpeak()).setGid(t.gid),
              s.setUid(t.uid),
              s.setSid(t.sid),
              t.gname && s.setGname(t.gname),
              t.uname && s.setUname(t.uname);
            break;
          case EVENT_STATUS.EN_RecvFirstAudioPack.code:
            s = new proto.ui.push.RecvFirstPack();
            break;
          case EVENT_STATUS.EN_DisableUserAck.code:
            s = new proto.ui.push.DisableUserAck();
            break;
          case EVENT_STATUS.EN_USER_STATUS_CHANGED.code:
            console.log("用户上下限通知", t),
              (s = this.translator.UserStatusChanged(t)),
              (o = "ui.push.UserStatusChanged");
            break;
          case EVENT_STATUS.EN_EnableUserAck.code:
            (s = new proto.ui.push.EnableUserAck()).setMsgstate(0),
              s.setUid(),
              (o = "ui.push.EnableUserAck");
            break;
          case EVENT_STATUS.EN_PLAY_PROGRESS.code:
            (s = new proto.ui.push.PlayProgressAck()).setMsgstate(0),
              s.setProgress(t.progress),
              s.setPackageindex(t.current_needle),
              (o = "ui.push.PlayProgressAck");
            break;
          case EVENT_STATUS.EN_DELIVER.code:
            if ("jsdk-speechinfo" == i.msgName) {
              (i.msg = i.msg.replace(
                /\\\\\\\"gid\\\\\\":(\d+)/g,
                '\\\\\\"gid\\\\\\":\\\\\\"$1\\\\\\"'
              )),
                (i.msg = i.msg.replace(
                  /\\\\\\\"sid\\\\\\":(\d+)/g,
                  '\\\\\\"sid\\\\\\":\\\\\\"$1\\\\\\"'
                )),
                (i.msg = i.msg.replace(
                  /\\\\\\\"stopTime\\\\\\":(\d+)/g,
                  '\\\\\\"stopTime\\\\\\":\\\\\\"$1\\\\\\"'
                )),
                (i.msg = i.msg.replace(
                  /\\\"id\\":(\d+)/g,
                  '\\"id\\":\\"$1\\"'
                )),
                (i.msg = JSON.parse(i.msg)),
                (i.msg.desc = JSON.parse(i.msg.desc)),
                (i.msg.desc.body = JSON.parse(i.msg.desc.body)),
                (o = "ui.push.LntercomInfo"),
                (s = new proto.ui.push.LntercomInfo());
              let e = this.client.get_user(i.msg.desc.body.uid);
              s.setGid(i.msg.desc.body.gid),
                s.setUid(i.msg.desc.body.uid),
                s.setGname(""),
                s.setUname(e.name),
                s.setSid(i.msg.desc.body.sid),
                s.setAudiotime(i.msg.desc.body.duration),
                s.setSize(0),
                s.setId(i.msg.desc.id),
                s.setEndaudiotime(i.msg.desc.body.stopTime);
            } else
              "SessionGroupPing" != i.msgName
                ? ((s = new proto.ui.push.PushDeliver()).setSender(i.sender),
                  s.setTimestamp(i.timestamp),
                  s.setMsgname(i.msgName),
                  s.setData(i.msg),
                  s.setLen(i.msg.length),
                  (o = "ui.push.PushDeliver"))
                : "SessionGroupPing" == i.msgName &&
                  ((s = new proto.ui.push.PushDeliver()).setSender(i.sender),
                  s.setTimestamp(i.timestamp),
                  s.setMsgname(i.msgName),
                  (o = "ui.push.PushDeliver"));
            break;
          case EVENT_STATUS.EN_PING.code:
            break;
          case EVENT_STATUS.UI_GET_MEMBERS_ACK.code:
            null == (r = this.translator.GetGroupMembers_ack(t.gid))
              ? console.log("群组成员列表回应", r)
              : ((o = "ui.act.GetCurrentGroupMembersAck"), (s = r));
            break;
          case EVENT_STATUS.RR_PUSH_ALL_SESSION_LIST_ACK.code:
            if (
              ((o = "ui.act.GetAllSessionAck"),
              (s = r = this.translator.GetAllSession_ack()),
              "undefined" == r)
            )
              return;
            break;
          case EVENT_STATUS.UI_GET_QUERY_UID_ACK.code:
            var r = this.translator.GetQueryUid_Ack(t);
            console.log(t, "---GetQueryUid_Ack"),
              (o = "ui.act.GetQueryUidAck"),
              (s = r);
            break;
          case EVENT_STATUS.UI_START_WATCH_GROUP_ACK.code:
            (s = new proto.ui.act.StartWatchGroupAck()),
              0 == t.result ? s.setResult(0) : s.setResult(-1),
              (o = "ui.act.StartWatchGroupAck");
            break;
          case EVENT_STATUS.UI_STOP_WATCH_GROUP_ACK.code:
            (s = new proto.ui.act.StopWatchGroupAck()).setResult(0),
              (o = "ui.act.StopWatchGroupAck");
            break;
          case EVENT_STATUS.UI_GET_LOCKED_GROUP_ACK.code:
            (s = new proto.ui.act.GetLockedGroupAck()).setResult(t.result),
              s.setGid(t.gid),
              (o = "ui.act.GetLockedGroupAck");
            break;
          case EVENT_STATUS.UI_GET_HISTORY_SPEECH_ACK.code:
            (o = "ui.act.TalkbackHistoryRecordAck"),
              (s = r = this.translator.HistorySpeech_ack(t)),
              console.log("---msg", s);
        }
        "" !== o && null != t && this.ui_notify(o, s);
      }
    }),
    (this.on_notify = this.on_notify.bind(this)),
    (this.translator = new Translator(this)),
    (this.client = new Client(this.on_notify)),
    (this.win = new Win(this.on_notify));
};
async function isRecordingSupported() {
  if (!("mediaDevices" in navigator)) return !1;
  if ("function" != typeof navigator.mediaDevices.getUserMedia) return !1;
  if ("function" != typeof window.MediaRecorder) return !1;
  try {
    (await navigator.mediaDevices.getUserMedia({ audio: !0 }))
      .getTracks()
      .forEach((e) => e.stop());
    const e = await navigator.mediaDevices.enumerateDevices();
    for (let t = 0; t < e.length; t++)
      if ("audioinput" === e[t].kind) return console.log("audioinput"), !0;
  } catch (e) {
    if ("NotFoundError" === e.name || "DevicesNotFoundError" === e.name)
      return !1;
    console.error("检测设备时出错:", e);
  }
  return !1;
}
(Pocsdk.prototype.do_init = function (e) {
  this.ui_notify = e;
}),
  (Pocsdk.prototype.do_connect = function () {
    this.client.connect();
  }),
  (Pocsdk.prototype.GetCurrentUserInfo = function (e) {
    let t = new Object();
    (t.uid = e), this.on_notify(EVENT_STATUS.UI_GET_QUERY_UID_ACK, t);
  }),
  (Pocsdk.prototype.CmccTobServerLogin = function (e, t, o, s) {
    this.log(1, "PocWeb login account:", e),
      this.log(1, "password:", hex_md5(t)),
      this.log(1, "base64:", btoa(hex_md5(t))),
      this.log(1, "role:", o),
      this.client.login(e, btoa(hex_md5(t)), o, s);
  }),
  (Pocsdk.prototype.Logout = function () {
    console.log("PocWeb logout"),
      this.log(1, "PocWeb logout"),
      this.client.logout();
  }),
  (Pocsdk.prototype.do_start_speak = function () {
    let e = { error: 50 };
    isRecordingSupported().then((t) => {
      console.log("isRecordingSupported", t),
        t
          ? this.client.start_speak()
          : (this.on_notify(EVENT_STATUS.RR_SPEAK, -1),
            this.on_notify(EVENT_STATUS.EN_ERROR_NOTIFY, e));
    });
  }),
  (Pocsdk.prototype.do_stop_speak = function () {
    this.client.client_play_audio_file(101, null, null, null, !0),
      this.client.stop_speak();
  }),
  (Pocsdk.prototype.GetWatchGroupId = function () {
    let e = this.client.get_current_group();
    console.log("查看当前组id", e);
    let t = new Object();
    (t.gid = e), this.on_notify(EVENT_STATUS.RR_RESTOR_GROUP_ID_ACK, t);
  }),
  (Pocsdk.prototype.GetCurrentUser = function () {
    let e = JSON.parse(sessionStorage.getItem("slsdk_userinfo"));
    this.log(1, "PocWeb get myself", e),
      this.on_notify(EVENT_STATUS.RR_USER_INFO_ACK, e);
  }),
  (Pocsdk.prototype.do_join_group = function (e) {
    this.log(1, "PocWeb join group by gid:", e), this.client.join_group(e);
  }),
  (Pocsdk.prototype.do_leave_group = function () {
    this.log(1, "PocWeb join group by gid:"),
      this.client.client_play_audio_file(101, null, null, null, !0),
      this.client.leave_group();
  }),
  (Pocsdk.prototype.stopPlay = async function () {
    await this.on_notify(EVENT_STATUS.RR_START_RECORD_BROADCAST_AUDIO_ACK, {}),
      this.client.client_play_audio_file(101, null, null, null, !0);
  }),
  (Pocsdk.prototype.CreateGroup = function (e, t, o, s, i, r, n) {
    let c = this.client.client_create_group(e, t, o, s, i, r, n),
      a = new Object();
    (a.result = c), this.on_notify(EVENT_STATUS.UI_CREATE_GROUP_ACK, a);
  }),
  (Pocsdk.prototype.DeleteSession = function (e) {
    let t = this.client.delete_session(e),
      o = new Object();
    (o.result = t), this.on_notify(EVENT_STATUS.UI_DELETE_SESSION_ACK, o);
  }),
  (Pocsdk.prototype.startSession = function (e) {
    let t = this.client.start_session(e),
      o = new Object();
    (o.result = t), this.on_notify(EVENT_STATUS.UI_START_SESSION_ACK, o);
  }),
  (Pocsdk.prototype.StopSession = function (e, t) {
    this.client.client_play_audio_file(101, null, null, null, !1);
    let o = this.client.stop_session(e, t);
    console.log(o, "---ret");
    let s = new Object();
    (s.result = o), this.on_notify(EVENT_STATUS.UI_STOP_SESSION_ACK, s);
  }),
  (Pocsdk.prototype.responseSession = function (e, t, o) {
    let s = this.client.response_sesssion(e, t, o),
      i = new Object();
    (i.result = s), this.on_notify(EVENT_STATUS.UI_RESPONSE_SESSION_ACK, i);
  }),
  (Pocsdk.prototype.set_group_speakTime = function (e, t) {
    this.client.client_group_speakTime(e, t);
    let o = new Object();
    (o.gid = e),
      (o.duration = t),
      this.on_notify(EVENT_STATUS.UI_SET_GROUP_SPEAK_TIME_ACK, o);
  }),
  (Pocsdk.prototype.playAudioFile = async function (e, t, o, s, i, r) {
    let n = null,
      c = this;
    if ("BroadcastAudio" == e) {
      if (
        (this.tmp_record_data.length > 0 &&
          this.tmp_record_data.forEach((e) => {
            e.path.slice(-23) == r && (n = e.pathBuff);
          }),
        null == t)
      )
        return (
          this.log("1", "playAudioFile  file_array == null"),
          void this.client.client_play_audio_file(101, null, 0, s, !1)
        );
      if (null != n && "sid.amr" == t)
        return (
          this.log("1", "playAudioFile tmp_record_arr != null"),
          await c.on_notify(
            EVENT_STATUS.RR_START_RECORD_BROADCAST_AUDIO_ACK,
            {}
          ),
          void c.client.client_play_audio_file(101, n, 0, s, !0)
        );
      console.log("tmp_record_arr", n),
        fetch(t, { responseType: "blob" })
          .then((e) => e.blob())
          .then((e) => {
            const t = e,
              o = new FileReader();
            o.readAsArrayBuffer(t),
              (o.onload = function (e) {
                c.log("1", "playAudioFile reader.onload");
                let t = e.target.result;
                console.log("播放广播语音arrayBuffer", t),
                  c.on_notify(
                    EVENT_STATUS.RR_START_RECORD_BROADCAST_AUDIO_ACK,
                    {}
                  ),
                  c.client.client_play_audio_file(101, t, 0, s, !0);
              }),
              (o.onerror = function (e) {});
          })
          .catch((e) => {
            console.error("获取文件出错:", e);
          });
    } else {
      this.tmp_record_data.length > 0 &&
        this.tmp_record_data.forEach((e) => {
          e.path == r && (n = e.pathBuff);
        });
      let e = {},
        o = -1;
      if (null == t)
        return (
          await this.on_notify(EVENT_STATUS.RR_PLAY_RECORD_AUDIO_ACK, e),
          (o = this.client.client_play_audio_file(101, null, 0, s, !1)),
          void (e.result = 0 == o ? 0 : -1)
        );
      if (null != n)
        return (
          (o = c.client.client_play_audio_file(101, n, 0, s, !1)),
          (e.result = 0 == o ? 0 : -1),
          void c.on_notify(EVENT_STATUS.RR_PLAY_RECORD_AUDIO_ACK, e)
        );
      fetch(t, { responseType: "blob" })
        .then((e) => e.blob())
        .then((t) => {
          const i = t,
            r = new FileReader();
          r.readAsArrayBuffer(i),
            (r.onload = function (t) {
              let i = t.target.result;
              console.log("播放广播语音arrayBuffer", i),
                (o = c.client.client_play_audio_file(101, i, 0, s, !1)),
                console.log("---ret", o),
                (e.result = 0 == o ? 0 : -1),
                c.on_notify(EVENT_STATUS.RR_PLAY_RECORD_AUDIO_ACK, e);
            }),
            (r.onerror = function (e) {});
        })
        .catch((e) => {
          console.error("获取文件出错:", e);
        });
    }
  }),
  (Pocsdk.prototype.StartRecordAudio = function (e, t) {
    console.log("StartRecordAudio, path:", e, ",second:", t),
      this.log(1, "StartRecordAudio", "path:" + e + ",second:" + t);
    let o = this;
    o.record_audio_timer &&
      (clearTimeout(o.record_audio_timer), (o.record_audio_timer = null));
    let s = o.client.client_recorder_start();
    return (
      o.log(1, "StartRecordAudio", "client_recorder_start ret:" + s),
      0 == s &&
        (o.record_audio_timer = setTimeout(() => {
          o.recorder_timer();
        }, 1e3 * t)),
      s
    );
  }),
  (Pocsdk.prototype.recorder_timer = function () {
    console.log("recorder_timer"),
      this.StopRecordAudio(),
      this.StopRecordBroadcastAudio();
  }),
  (Pocsdk.prototype.StopRecordAudio = function () {
    return (
      this.record_audio_timer &&
        (clearTimeout(this.record_audio_timer),
        (this.record_audio_timer = null)),
      this.client.client_recorder_stop()
    );
  }),
  (Pocsdk.prototype.do_single_call = function (e, t) {
    this.log(1, "PocWeb single call uid:", e),
      this.log(1, "full_duplex:", t),
      this.client.single_call(e, t);
  }),
  (Pocsdk.prototype.do_call = function (e) {
    this.log(1, "PocWeb call uids:", e), this.client.call(e);
  }),
  (Pocsdk.prototype.do_single_call_invite = function (e, t) {
    this.log(1, "PocWeb single call invite uid:", e),
      this.log(1, "full_duplex:", t),
      this.client.single_call_invite(e, t);
  }),
  (Pocsdk.prototype.UploadFile = function (e, t, o, s, i, r, n, c, a, _, u, l) {
    console.log("执行了pocsdk", l);
    let p = 0,
      d = null;
    this.tmp_record_data.length > 0 &&
      this.tmp_record_data.forEach((e) => {
        e.path == l && (d = e.pathBuff);
      }),
      null == d
        ? ((p = -1),
          window.setTimeout(() => {
            this.on_notify(EVENT_STATUS.RR_UPLOAD_FILE, p);
          }, 1e3),
          (this.tmp_record_data = []))
        : (this.win.UploadFiles(e, t, o, s, i, r, n, c, a, _, d, l),
          this.on_notify(EVENT_STATUS.RR_UPLOAD_FILE, p),
          (this.tmp_record_data = []));
  }),
  (Pocsdk.prototype.StartWatchGroup = function (e) {
    this.log(1, "PocWeb watch group gids:", e);
    let t = new Object();
    (t.result = -1),
      this.client.is_listen_group(e)
        ? (t.result = -1)
        : (this.client.client_listen_group(e), (t.result = 0)),
      this.on_notify(EVENT_STATUS.UI_START_WATCH_GROUP_ACK, t);
  }),
  (Pocsdk.prototype.StopWatchGroup = function (e) {
    this.log(1, "PocWeb remove watch group gids:", e),
      this.client.client_unlisten_group(e),
      this.on_notify(EVENT_STATUS.UI_STOP_WATCH_GROUP_ACK, {});
  }),
  (Pocsdk.prototype.do_dispatch = function (e, t) {
    this.log(1, "PocWeb dispatch uids:", t),
      this.log(1, "to gid:", e),
      this.client.dispatch(e, t);
  }),
  (Pocsdk.prototype.do_take_mic = function (e) {
    this.log(1, "PocWeb take mic uids:", e), this.client.take_mic(e);
  }),
  (Pocsdk.prototype.do_audio_enable = function (e, t) {
    this.log(1, "PocWeb audio enable uids:", e),
      this.log(1, "enable:", t),
      this.client.audio_enable(e, t);
  }),
  (Pocsdk.prototype.do_switch_location = function (e, t, o) {
    this.log(1, "PocWeb switch location uids:", e),
      this.log(1, "enable:", t),
      this.log(1, "period:", o),
      this.client.switch_location(e, t, o);
  }),
  (Pocsdk.prototype.SetMemberTop = function (e, t, o, s) {
    this.log(1, "PocWeb switch SetMemberTop gid:", e),
      this.log(1, "PocWeb switch SetMemberTop uid:", t),
      this.log(1, "PocWeb switch SetMemberTop count:", o),
      this.log(1, "PocWeb switch SetMemberTop top:", s),
      "" != this.client.get_current_group() &&
        (e = this.client.get_current_group()),
      this.client.set_member_top(e, t, o, s);
  }),
  (Pocsdk.prototype.set_locked_group = function (e) {
    this.client.set_locked_group(e);
  }),
  (Pocsdk.prototype.get_locked_group = function () {
    let e = this.client.get_locked_group(),
      t = new Object();
    "0" != e ? ((t.result = 0), (t.gid = e)) : ((t.result = -1), (t.gid = "0")),
      this.on_notify(EVENT_STATUS.UI_GET_LOCKED_GROUP_ACK, t);
  }),
  (Pocsdk.prototype.GetGroupsListRefresh = function () {
    var e = this.client.get_group_list();
    this.on_notify(EVENT_STATUS.UI_GET_GROUPLIST_ACK, e);
  }),
  (Pocsdk.prototype.GrouplistSession = function () {
    var e = this.client.get_temporary_group_list();
    console.log("PocWeb get group list", e),
      this.log(1, "PocWeb get group list", e),
      this.on_notify(EVENT_STATUS.RR_LIST_SESSION_ACK, e);
  }),
  (Pocsdk.prototype.GetCurrentGroupGid = function (e) {
    console.log("PocWeb get group by gid:", e),
      this.log(1, "PocWeb get group by gid:", e);
    var t = this.client.get_group_by_gid(e);
    console.log("group---:", t),
      0 != t.online.memberIngroup ||
        "CALLING" == t.session.status ||
        (t.session.status = "IDLE");
    let o = new Object();
    null != t
      ? ((o.group = t),
        (o.result = 0),
        this.on_notify(EVENT_STATUS.RR_GROUP_info_ACK, o))
      : ((o.group = null),
        (o.result = -1),
        this.on_notify(EVENT_STATUS.RR_GROUP_info_ACK, o));
  }),
  (Pocsdk.prototype.GetGroupMembers = function (e) {
    this.log(1, "PocWeb get member list by gid:", e);
    let t = {};
    (t.gid = e), this.on_notify(EVENT_STATUS.UI_GET_MEMBERS_ACK, t);
  }),
  (Pocsdk.prototype.GetAllSession = function () {
    this.on_notify(EVENT_STATUS.RR_PUSH_ALL_SESSION_LIST_ACK, {});
  }),
  (Pocsdk.prototype.restoration = function (e) {
    this.on_notify(EVENT_STATUS.RR_RESTOR_ATION_ACK, {}),
      this.client.restoration(e);
  }),
  (Pocsdk.prototype.do_get_member_by_uid = function (e, t) {
    this.log(1, "PocWeb get member list by gid:", e),
      this.log(1, "uid:", t),
      show_result_info(this.client.get_member_by_uid(e, t));
  }),
  (Pocsdk.prototype.GetWatchGrouplist = function () {
    this.log(1, "PocWeb get watch group list"),
      show_result_info(this.client.get_watch_group_list());
  }),
  (Pocsdk.prototype.GetChangeName = function (e) {
    e && this.client.user_name(e);
  }),
  (Pocsdk.prototype.GetChangePassword = function (e) {
    e && this.client.user_password(e);
  }),
  (Pocsdk.prototype.StartRecordBroadcastAudio = function (e, t) {
    let o = {};
    (o = e ? (0 == t ? { status: 0 } : { status: -2 }) : { status: -1 }),
      this.on_notify(EVENT_STATUS.RR_START_RECORD_BROADCAST_AUDIO, o);
  }),
  (Pocsdk.prototype.StopRecordBroadcastAudio = function () {
    this.on_notify(EVENT_STATUS.RR_STOP_RECORD_BROADCAST_AUDIO, {});
  }),
  (Pocsdk.prototype.ChangeCurrentEmail = function (e) {
    this.log(1, "修改邮箱", e), e && this.client.user_mailbox(e);
  }),
  (Pocsdk.prototype.SetGroupSpeakTime = function (e, t) {
    this.log(1, "设置群组通话时长 gid", e),
      this.log(1, "设置群组通话时长 time", t),
      t && this.client.group_duration(e, t);
  }),
  (Pocsdk.prototype.SetGroupPriority = function (e, t) {
    t && this.client.group_precedence(e, t);
  }),
  (Pocsdk.prototype.SetUsersPriority = function (e, t, o) {
    this.client.do_cancel_user_precedence(e, t, o);
  }),
  (Pocsdk.prototype.ChangeGroupName = function (e, t) {
    t && this.client.do_cancel_group_name(e, t);
  }),
  (Pocsdk.prototype.ChangeGroupDesc = function (e, t) {
    t && this.client.group_remark(e, t);
  }),
  (Pocsdk.prototype.QueryEnterpriseGroup = function (e, t) {
    this.client.Query_Enterprise_Group(e, t);
  }),
  (Pocsdk.prototype.GetEnterpriseGroupList = function () {
    this.on_notify(EVENT_STATUS.UI_QueryEnterpriseGroupListAck, {});
  }),
  (Pocsdk.prototype.playHistory = function (sid, isplay) {
    let that = this;
    //  this.win.play_history(sid)
    findBySpeechId(sid).then((res) => {
      console.log("play_history res", res);
      let param = {
        result: 0,
        pathfile: res.config.baseURL + res.config.url,
        sid: sid,
        paytype: 0,
      };
      const blob = new Blob([res.data], { type: "application/octet-stream" });
      // console.log('blob', blob)
      const file = blob;
      // 创建 FileReader 对象
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = function (event) {
        let arrayBuffer = event.target.result;
        // console.log('播放广播语音arrayBuffer', arrayBuffer)
        that.tmp_record_data.push({
          path: res.config.baseURL + res.config.url,
          pathBuff: arrayBuffer,
        });
        if (isplay) {
          let status = that.client.client_play_audio_file(
            101,
            arrayBuffer,
            0,
            0,
            false
          );
          if (status == -1) {
            param.result = -1;
          }
          that.on_notify(EVENT_STATUS.RR_HISTORY_ACK, param);
        } else {
          that.on_notify(EVENT_STATUS.RR_HISTORY_ACK, param);
        }
      };
      reader.onerror = function (event) {};
    });
  }),
  (Pocsdk.prototype.HistorySpeech = function (gid, lastId, uid, pageSize) {
    let that = this;
    getHistorySpeech({
      gid: gid,
      lastId: lastId,
      uid: uid,
      pageSize: pageSize,
    }).then((res) => {
      let jmsg = { param: res };
      console.log("res--", res);
      that.on_notify(EVENT_STATUS.UI_GET_HISTORY_SPEECH_ACK, jmsg);
    });
  }),
  (Pocsdk.prototype.DownLoadHistory = function (e) {
    this.win.download_history(e),
      setTimeout(this.on_notify(EVENT_STATUS.RR_DOWN_LOAD_HISTORY, {}), 2e3);
  }),
  (Pocsdk.prototype.CreateTxtFile = function (e, t) {
    this.win.CreateTxtFile(e, t),
      setTimeout(this.on_notify(EVENT_STATUS.RR_DOWN_LOAD_TXT, {}), 1e3);
  }),
  (Pocsdk.prototype.DownLoadFile = function (e) {
    this.win.UploadFile(e);
    for (let t = 0; t < e.length; t++)
      setTimeout(this.on_notify(EVENT_STATUS.RR_UPLOAD_FILE_ACK, e[t]), 2e3);
  });
export default Pocsdk;

import * as types from "../mutation_type";
export default {
  // 存储对讲登录状态
  [types.SET_SPEAKNET_LOGIN_STATUS](state, payload) {
    state.speakNetLoginStatus = payload;
  },
  [types.SET_SPEAKNET_MODEL](state, payload) {
    state.speakNet = payload;
  },
  // 频道人员发生变化（如：新建频道触发消息会走这里）
  [types.MEMBER_LIST_CHANGE](state, payload) {
    state.memberListChangedDate = payload.changeDate;
  },
  // 频道变化通知状态,改变就说明有变化
  [types.SET_GROUP_CHANGE_STATUS](state) {
    state.groupChangeStatus = !state.groupChangeStatus;
  },
  // 进去频道通知
  [types.ENTER_GROUP_STATUS](state) {
    state.enterGroupStatus = !state.enterGroupStatus;
  },
  // 自动开始会话的id
  [types.SET_START_IN_VITE_ID](state, id) {
    state.startInViteId = id;
  },
  // 存储善理用户信息
  [types.SET_SPEAKNET_USER](state, payload) {
    state.slUser = payload;
  },
  // 回应拒绝会话邀请的用户
  [types.SET_REJECT_USER_INFO](state, info) {
    state.rejectUserInfo = info;
  },
  // 设置开始会话的频道id
  [types.SET_BEGIN_SPEAK_SID](state, id) {
    state.beginSpeakSid = id;
  },
  // 设置结束会话的频道id
  [types.SET_END_SPEAK_SID](state, id) {
    state.endSpeakSid = id;
  },
  // 回应接受会话邀请的用户
  [types.SET_ACCEPT_USER_INFO](state, info) {
    state.acceptUserInfo = info;
  },
  // 本人讲话状态，true 开始 false 结束
  [types.SET_SELF_SPEAK_STATUS](state, status) {
    state.selfSpeakStatus = status;
  },
  // 本人讲话结束且数据已入库
  [types.GET_SELF_SPEAK_IN_DATA](state, payload) {
    state.selfSpeakTimeStamp = payload;
  },
  // 对讲说话是否完毕
  [types.SET_SPEAK_OVER_STATUS](state) {
    state.speakOver = !state.speakOver;
  },
  // 录音播放状态
  [types.SET_PLAY_VOICE_STATUS](state, payload) {
    state.voiceStatus = payload;
  },
  // 受邀请的频道id
  [types.SET_ACCEPT_TEMP_SPEAK_INFO](state, info) {
    state.acceptTempSpeakInfo = info;
  },
  // IM推送消息提示
  [types.SET_IM_MSG_TIP_STATUS](state, data) {
    state.ImMsgTip = data;
  },
  [types.SET_CHANNEL_AVAILABLE](state, payload) {
    state.channelAvailable = payload;
  },
};

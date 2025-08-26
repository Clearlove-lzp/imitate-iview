import actions from "./actions";
import mutations from "./mutations";

const state = {
  /** *************善理对讲相关**************/
  // 对讲实列
  speakNet: undefined,
  // 平台对讲登录状态 0 未登录 1 登录失败 2 登录成功
  speakNetLoginStatus: 0,
  // 聊天记录录音播放状态 1 正在播放 0 播放完毕
  voiceStatus: 0,
  // 本人讲话状态，true 开始 false 结束
  selfSpeakStatus: false,
  // 本人讲话时间戳
  selfSpeakTimeStamp: "",
  // 调度台和终端对讲说话是否完毕(状态改变就说明讲话完毕)
  speakOver: false,
  // IM推送消息提示(状态改变就说明有新消息)
  ImMsgTip: false,
  // 当前讲话的人（频道中其他人）
  nowSpeaker: undefined,
  // 当前讲话完毕的人（频道中其他人）
  nowSpeakerOver: undefined,
  // 频道进去通知
  enterGroupStatus: false,
  // 地图窗口视图坐标
  mapWindowCoordinate: {},
  // 是否移动完毕，移动完毕状态会改变
  mapMoveEnd: false,
  // 是否在会话页面，在的话可以框选创建会话
  isInSpeakPage: false,
  // 创建会话数据，改变就创建会话
  createdTempSpeakData: [],
  // 删除会话的状态，改变就说明有会话被删除
  delTempSpeakStatus: false,
  // 受邀请的频道id
  acceptTempSpeakInfo: "",
  // 回应接受会话邀请的用户信息
  acceptUserInfo: "",
  // 回应拒绝会话邀请的用户信息
  rejectUserInfo: "",
  // 开始会话的频道id
  beginSpeakSid: "",
  // 结束会话的频道id
  endSpeakSid: "",
  // 频道变化通知状态,改变就说明有变化
  groupChangeStatus: false,
  // 自动开始会话的id
  startInViteId: "",
  // 人员已进入后退出会话通知信息
  stopTempSpeakInfo: {},
  // 拒绝后再进会话的信息，需要在组人员同意
  againEnterSpeakInfo: {},
  // 是否正在刻画轨迹
  isDrawTrack: false,
  // 是否在刻画历史轨迹，新增的历史轨迹的特殊性，所以此处要特殊处理
  historyTrackStatus: false,
  // 频道展开的id集合
  groupExpandIds: [],
  // 会话展开的id集合
  speakExpandIds: [],
  // 是否被摇毙
  isBlock: false,
  // 对讲失败错误消息
  speakErrMsg: "",
  // 频道成员发生变化发生的时间
  memberListChangedDate: "",
  // 善理存储的用户信息
  slUser: null,
  channelAvailable: false,
};

export default {
  state,
  actions,
  mutations,
};

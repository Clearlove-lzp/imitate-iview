import Vue from "vue";
import Vuex from "vuex";
import slm from "./modules/slm/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { slm },
  getters: {
    speakNet: (state) => {
      return state.slm.speakNet;
    },
    speakNetLoginStatus: (state) => {
      return state.slm.speakNetLoginStatus;
    },
    isBlock: (state) => {
      return state.slm.isBlock;
    },
    slUser: (state) => {
      return state.slm.slUser;
    },
    enterGroupStatus: (state) => {
      return state.slm.enterGroupStatus;
    },
    selfSpeakStatus: (state) => {
      return state.slm.selfSpeakStatus;
    },
    selfSpeakTimeStamp: (state) => {
      return state.slm.selfSpeakTimeStamp;
    },
    acceptTempSpeakInfo: (state) => {
      return state.slm.acceptTempSpeakInfo;
    },
    ImMsgTip: (state) => {
      return state.slm.ImMsgTip;
    },
    channelAvailable: (state) => {
      return state.slm.channelAvailable;
    },
    acceptUserInfo: (state) => {
      return state.slm.acceptUserInfo;
    },
  },
});

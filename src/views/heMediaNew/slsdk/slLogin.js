import { Message } from "element-ui";
import store from "../../../store";
import { message } from "./speakErrorMsg";

class SlLogin {
  constructor({ plat_form_id, username, password, vm }) {
    this.loginInfo = {
      token: "",
    };
    this.loginInfo.platformld = plat_form_id;
    this.loginInfo.account = username;
    this.loginInfo.accountPassword = password;
    this.speakNet = null;
    this.vm = vm;
    this.loading = false;
    if (plat_form_id && username && password) {
      this.initSpeak();
    }
  }
  loginSpeak() {
    const _this = this;
    store.commit("SET_SPEAKNET_LOGIN_STATUS", 0);
    let loginInfo = this.loginInfo;
    this.speakNet.DisLogin(
      loginInfo.token,
      loginInfo.account,
      loginInfo.accountPassword,
      loginInfo.platformld,
      "",
      "",
      async (res) => {
        if (res.code !== 200) {
          Message.error(`和对讲SDK：${res.responseJSON.message}`);
        } else {
          store.commit("SET_SPEAKNET_LOGIN_STATUS", 2);
          loginInfo.token = res.data.token;
          const userinfo = await _this.getUserInfo();
          console.log(
            "🚀 ~ SlLogin ~ this.speakNet.DisLogin ~ userinfo:",
            userinfo
          );
          _this.loading = false;
        }
      }
    );
  }
  initSpeak() {
    const _this = this;
    this.loading = true;
    this.speakNet = new window.net(
      "ws://127.0.0.1:16668",
      true,
      (state) => {
        if (state === "open") {
          _this.speakNet.Restoration(
            _this.loginInfo.account + _this.loginInfo.platformld,
            async (res) => {
              _this.speakNet.CallMessage(message);
              if (
                res.array[0] == 0 &&
                sessionStorage.getItem("sdk_web_token")
              ) {
                store.commit("SET_SPEAKNET_LOGIN_STATUS", 2);
                const userinfo = await _this.getUserInfo();
                console.log(
                  "🚀 ~ SlLogin ~ _this.speakNet.Restoration ~ userinfo:",
                  userinfo
                );
                _this.loading = false;
              } else {
                _this.loginSpeak();
              }
            }
          );
        }
        if (state === "error") {
          Message.error("连接异常");
        }
      },
      proto
    );
    store.commit("SET_SPEAKNET_MODEL", this.speakNet);
  }
  getUserInfo() {
    // 用户信息只获取一次
    return new Promise((resolve, reject) => {
      this.speakNet.GetCurrentUser((res) => {
        let arr = res["array"];
        if (arr[0] === 0) {
          let info = arr[1];
          let keys = [
            "uid",
            "name",
            "online",
            "audioEnabled",
            "sleep",
            "dnd",
            "has_gid",
            "gid",
            "role",
            "locOn",
            "locPeriod",
            "account",
            "avatar",
            "sex",
          ];
          keys.forEach((key, i) => {
            this.vm.$set(this.vm.$userInfo, key, info[i]);
            this.vm.$set(this.vm.$userInfo, key, info[i]);
          });
          sessionStorage.setItem("sl_user", JSON.stringify(this.vm.$userInfo));
          store.commit("SET_SPEAKNET_USER", this.vm.$userInfo);
          setTimeout(() => {
            store.commit("SET_CHANNEL_AVAILABLE", true);
          }, 2000);
          resolve(this.vm.$userInfo);
        } else {
          this.$message.error("获取用户信息失败,请稍后再试（SHANLI-SDK）");
          reject({ code: "-1" });
        }
      });
    });
  }
  login() {
    this.initSpeak();
  }
  logoutSpeak() {
    if (!this.speakNet) return;
    if (this.speakNet && this.speakNet.Logout) this.speakNet.Logout();
    if (this.speakNet && this.speakNet.DisNetConnect)
      this.speakNet.DisNetConnect(this.loginInfo.token);
    this.speakNet = null;
    store.commit("SET_SPEAKNET_MODEL", this.speakNet); // 实列清空
    store.commit("SET_SPEAKNET_LOGIN_STATUS", 0); // 设置登录状态为0
    sessionStorage.clear();
  }
}
export default SlLogin;

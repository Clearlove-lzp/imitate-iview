import axios from "axios";
import { Message } from "element-ui";
const service = axios.create({
  timeout: 3000000,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

service.interceptors.request.use(
  (config) => {
    config.headers["cm-auth-token"] = sessionStorage.getItem("sdk_web_token");
    config.withCredentials = false;
    if (config.method === "delete" || config.method === "get") {
      config.params = config.data;
    }
    updateConfigByInterface(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  ajax(url, method, params) {
    return new Promise((resolve, reject) => {
      service({
        url: window.SL_WEB_URL + url,
        method: method,
        data: params,
      })
        .then((response) => {
          let res = response.data; // response.data可能是对象也可能是数据流，是对象就把对象返回，是数据流就返回response
          if (res.code === 200) {
            resolve(res.data);
          } else if (res.message) {
            // 错误信息如何存放善理目前未考虑，先按我们的方法写，后面善理完善了再改
            Message.error(res.message || "操作失败");
            reject();
          } else {
            resolve(response);
          }
        })
        .catch((error) => {
          Message.error("操作失败");
          reject(error);
        });
    });
  },
};

function updateConfigByInterface(config) {
  if (config.url.includes("findBySpeechId")) {
    config["responseType"] = "arraybuffer";
  }
}

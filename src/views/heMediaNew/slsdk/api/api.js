import SLAPI from "../../common/sl-ajax.js";
export function findBySpeechId(params) {
  return SLAPI.ajax(`/speech-store/findBySpeechId?speechId=${params}`, "post");
}

// 这个接口的返回值需要以txt形式被处理，不能用axios
export function getHistorySpeech(params) {
  return fetch(
    `${window.SL_WEB_URL}/speech-store/record/getHistorySpeech?gid=${params.gid}&lastId=${params.lastId}&uid=${params.uid}&pageSize=${params.pageSize}`,
    {
      method: "post",
      headers: {
        "cm-auth-token": sessionStorage.getItem("sdk_web_token"),
      },
    }
  ).then((res) => res.text());
}

export function getHistorySpeechJson(params) {
  return SLAPI.ajax("/speech-store/record/getHistorySpeech", "get", params);
}

export function sendfile(params) {
  return SLAPI.ajax(
    `/media/console/message/broadcast/sendfile`,
    "post",
    params
  );
}

export function sendfileOffline(params) {
  return SLAPI.ajax(`/media/group/message/sendfile`, "post", params);
}

export function sendTextMsgApi(params) {
  return SLAPI.ajax(`/media/group/message/send`, "post", params);
}

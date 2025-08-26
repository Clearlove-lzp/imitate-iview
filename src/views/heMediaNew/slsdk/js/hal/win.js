import { findBySpeechId, sendfile, sendfileOffline } from "../../api/api";
import Client from "../core/client.js";
import AMR from "../module/amrnb.js";
let client = new Client();
var win = function (e) {};
async function downloadHistoryStream(e, o) {
  fetch(e, { responseType: "blob" })
    .then((e) => e.blob())
    .then((e) => {
      console.log("下载进度---1");
      const o = new File([e], "yino.amr", { type: "audio/amr" }),
        t = new FileReader();
      t.readAsArrayBuffer(o),
        (t.onload = function (e) {
          let o = e.target.result;
          console.log("下载进度---2"), AudioCodedToWav(o);
        }),
        (t.onerror = function (e) {});
    })
    .catch((e) => {});
}
function UploadFileAudio(e) {
  if ("newBroadcast" == e.msg) return;
  if ("audio" == e.msg) return;
  if ("recording" == e.msg) return;
  let o = e.url.toString();
  console.log("下载音频 修改前1", o);
  let t = "https://" + window.location.host,
    n = o.slice(43);
  (o = t + "/eos/" + n),
    console.log(o, "---result2"),
    console.log("下载音频 修改后2", o),
    fetch(o, { responseType: "blob" })
      .then((e) => e.blob())
      .then((e) => {
        const o = new File([e], "yino.amr", { type: "audio/amr" }),
          t = new FileReader();
        t.readAsArrayBuffer(o),
          (t.onload = function (e) {
            AudioCodedToWav(e.target.result);
          }),
          (t.onerror = function (e) {});
      })
      .catch((e) => {
        console.error("获取文件出错:", e);
      });
}
async function downloadFileImg(e, o) {
  let t = e.url.toString();
  console.log("uploadFile", t);
  let n = "https://" + window.location.host,
    l = "";
  if (t.includes("http://api.map.baidu.com"))
    (t = t.slice(24)), (l = n + "/baidu/" + t);
  else if (
    t.includes("http://tob2-test.obs.dualstack.cidc-rp-12.joint.cmecloud.cn")
  ) {
    let e = t.slice(60);
    (t = n + "/obs/" + e), console.log(t, "---result2");
  } else if (
    t.includes("https://tob2-test.obs.dualstack.cidc-rp-12.joint.cmecloud.cn")
  ) {
    let e = t.slice(61);
    (t = n + "/obs/" + e), console.log(t, "---result2");
  } else if (t.includes("http://tob2-file.eos-zhuzhou-1.cmecloud.cn")) {
    let e = t.slice(43);
    (t = n + "/eos/" + e), console.log(t, "---result2");
  } else if (t.includes("http://tob2-file.obs.cidc-rp-12.joint.cmecloud.cn")) {
    t.slice(50);
  } else if (t.includes("https://tob2-file.obs.cidc-rp-12.joint.cmecloud.cn")) {
    t.slice(51);
  }
  "" == l && (l = t);
  try {
    const e = await fetch(l);
    if (!e.ok) throw new Error("请求失败");
    const t = await e.blob(),
      n = URL.createObjectURL(t),
      i = document.createElement("a");
    (i.href = n),
      (i.download = o),
      (i.style.display = "none"),
      document.body.appendChild(i),
      i.click(),
      document.body.removeChild(i),
      URL.revokeObjectURL(n);
  } catch (e) {
    console.error("下载图片失败:", e);
  }
}
async function downloadFileVideo(e, o) {
  let t = e.url.toString(),
    n = "https://" + window.location.host;
  if (
    t.includes("http://tob2-test.obs.dualstack.cidc-rp-12.joint.cmecloud.cn")
  ) {
    let e = t.slice(60);
    (t = n + "/obs/" + e), console.log(t, "---result2");
  }
  if (t.includes("http://tob2-file.eos-zhuzhou-1.cmecloud.cn")) {
    let e = t.slice(43);
    (t = n + "/eos/" + e), console.log(t, "---result2");
  }
  if (t.includes("https://tob2-file.obs.cidc-rp-12.joint.cmecloud.cn")) {
    t.slice(51);
    console.log(t, "---result2");
  }
  if (t.includes("http://tob2-file.obs.cidc-rp-12.joint.cmecloud.cn")) {
    t.slice(50);
    console.log(t, "---result2");
  }
  try {
    const e = await fetch(t),
      n = await e.blob(),
      l = document.createElement("a");
    (l.href = URL.createObjectURL(n)),
      (l.download = o),
      document.body.appendChild(l),
      l.click(),
      document.body.removeChild(l),
      URL.revokeObjectURL(l.href);
  } catch (e) {
    console.error("文件下载失败:", e);
  }
}
async function downloadFileHandbook(e) {
  try {
    let o = e.url.toString();
    const t = await fetch(o),
      n = await t.blob(),
      l = document.createElement("a");
    (l.href = URL.createObjectURL(n)),
      (l.download = "和对讲CS调度台使用手册20210128.pdf"),
      document.body.appendChild(l),
      l.click(),
      document.body.removeChild(l),
      URL.revokeObjectURL(l.href);
  } catch (e) {
    console.error("文件下载失败:", e);
  }
}
function AudioCodedToWav(e) {
  console.log("下载进度---3");
  let o = client_audio_coded_to_pcm(e);
  console.log("下载进度---4");
  let t = new Uint16Array(o),
    n = audio_get_wav_head(t, 8e3, 1, 16);
  console.log("下载进度---5");
  let l = new Uint16Array(n.byteLength + t.length);
  l.set(new Uint16Array(n), 0),
    l.set(t, n.byteLength),
    save_wav_to_file("test-wav.wav", l);
}
function audio_get_wav_head(e, o, t, n) {
  function l(e, o, t) {
    for (let n = 0; n < t.length; n++) e.setUint8(o + n, t.charCodeAt(n));
  }
  let i = e.length,
    c = new ArrayBuffer(44),
    r = new DataView(c);
  return (
    l(r, 0, "RIFF"),
    r.setUint32(4, 36 + i * t * (n / 8), !0),
    l(r, 8, "WAVE"),
    l(r, 12, "fmt "),
    r.setUint32(16, 16, !0),
    r.setUint16(20, 1, !0),
    r.setUint16(22, t, !0),
    r.setUint32(24, o, !0),
    r.setUint32(28, o * t * (n / 8), !0),
    r.setUint16(32, t * (n / 8), !0),
    r.setUint16(34, n, !0),
    l(r, 36, "data"),
    r.setUint32(40, i * t * (n / 8), !0),
    c
  );
}
function save_wav_to_file(e, o) {
  if (o.length > 0) {
    const t = new Blob([o], { type: "audio/wav" }),
      n = URL.createObjectURL(t),
      l = document.createElement("a");
    (l.href = n),
      (l.download = e),
      document.body.appendChild(l),
      l.click(),
      document.body.removeChild(l),
      URL.revokeObjectURL(n);
  }
}
function decode_amr_frame(e, o) {
  var t = new Uint8Array(o),
    n = new Uint8Array(6 + t.length);
  (n[0] = 35), (n[1] = 33), (n[2] = 65), (n[3] = 77), (n[4] = 82), (n[5] = 10);
  for (var l = 0; l < t.length; l++) n[l + 6] = t[l];
  return AMR.decode_run(e, n);
}
function parse_amr_frame(e, o) {
  let t = o,
    n = null,
    l = 10,
    i = [];
  if (null == e || 0 == o) return -1;
  n = e;
  do {
    if (((l = DecoderAmrGetFrameSize(n[0])), 0 == l)) break;
    let e = [];
    for (let o = 0; o < l; o++) e.push(n.shift());
    i.push(e), (t -= l);
  } while (t > 0);
  return i;
}
(win.prototype.UploadFiles = function (e, o, t, n, l, i, c, r, a, d, s, u) {
  console.log("执行了UploadFile", o);
  let f = new Uint8Array(s),
    p = new Blob([f], { type: "audio/amr" }),
    h = new File([p], "ces.amr", { type: "audio/amr" });
  const m = new FormData();
  m.append("userId", t),
    m.append("userName", n),
    m.append("groupId", e),
    m.append("title", i),
    m.append("userParas", a),
    m.append("msg", c),
    m.append("msgType", d),
    m.append("msgParas", r),
    m.append("target", l),
    m.append("filename", u),
    h.raw ? m.append("file", h.raw) : m.append("file", h),
    1 == o
      ? sendfile(m).then((e) => {
          client.client_send_file(e);
        })
      : sendfileOffline(m).then((e) => {
          client.client_send_file(e);
        });
}),
  (win.prototype.download_history = function (e) {
    console.log(e, "---sid");
    for (let o = 0; o < e.length; o++)
      findBySpeechId(e[o].sid).then((t) => {
        let n = t.config.baseURL + t.config.url;
        console.log("play_history res", n),
          downloadHistoryStream(n, e[o].filepath, "audio/amv");
      });
  }),
  (win.prototype.play_history = function (e) {
    console.log("play_history sid:", e),
      findBySpeechId(e).then(
        (e) => (
          console.log("play_history res", e), e.config.baseURL + e.config.url
        )
      );
  }),
  (win.prototype.UploadFile = function (e) {
    for (let o = 0; o < e.length; o++)
      console.log("属性type", e[o]),
        console.log("属性type", e[o].filepath.slice(-4)),
        "amr" == e[o].filepath.slice(-3)
          ? UploadFileAudio(e[o])
          : ".pdf" == e[o].filepath.slice(-4)
          ? downloadFileHandbook(e[o])
          : ".mp4" == e[o].filepath.slice(-4)
          ? downloadFileVideo(e[o], e[o].filepath)
          : downloadFileImg(e[o], e[o].filepath);
  }),
  (win.prototype.CreateTxtFile = function (e, o) {
    let t = document.createElement("a");
    (t.href = "data:text/plain;charset=utf-8," + o),
      (t.download = e),
      document.body.appendChild(t),
      t.click(),
      document.body.removeChild(t);
  });
var s_frame_size = [13, 14, 16, 18, 20, 21, 27, 32, 6, 0, 0, 0, 0, 0, 0, 1],
  DecoderAmrGetFrameSize = function (e) {
    return s_frame_size[(e >> 3) & 15];
  };
function client_audio_coded_to_pcm(e) {
  let o = AMR.decode_init();
  console.log("时效---1");
  let t = new Uint8Array(e);
  console.log("时效---2");
  let n = Array.from(t);
  console.log("时效---3");
  let l = parse_amr_frame(n, n.length);
  console.log("时效---4");
  let i = l.length,
    c = [];
  for (let e = 0; e < i; e++) {
    let e = decode_amr_frame(o, l.shift());
    if (e) for (let o = 0; o < e.length; o++) c.push(e[o]);
  }
  return console.log("时效---5"), AMR.decode_deinit(o), c;
}
export default win;

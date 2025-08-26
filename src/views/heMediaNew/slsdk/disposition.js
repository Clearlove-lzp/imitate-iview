import { openLog, closeLog, saveLog } from "./js/core/log.js";

// log.js

// 日志大小
export function logSize() {
  return 2000;
}
// 开启日志
export function logsEnabled() {
  openLog();
}
// 关闭日志
export function logsClosed() {
  closeLog();
}
// 下载日志
export function DownloadLogs() {
  saveLog();
}

// config.js
export function dns() {
  // 科达测试环境地址redirector-keda-test.cmpoc.top:9086
  // 后续科达方可根据自己的当前环境配置相对的服务侧地址
  return window.SL_DNS;
}
// 服务侧是否开启加密
export function encrypt() {
  return true;
}

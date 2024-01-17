/**
 * websocket工厂
 * @param wsUrl
 * @param receiveMessage
 * @param option
 */

/**
 * option
 * @param onError
 * @param onOpen
 * @param onClose
 * @param msgTimeOutDelay
 * @param msgTimerOutTimer
 */

export const webSocketFactory = (wsUrl, receiveMessage, option) => {
  let webSock;
  let reconnectTimer;
  let lockReconnect = false; // 是否是重连中
  let reconnectCount = 0; // 重连次数
  let pingTimer; // 心跳延时器
  let msgTimerOutTimer;

  const { msgTimeOutDelay, heartbeatIncoming } = {
    msgTimeOutDelay: 120000,
    heartbeatIncoming: 10000,
    ...option,
  };

  /**
   * 初始化
   */
  const init = () => {
    // 建立连接
    // 初始化weosocket
    // const wsuri = "ws://sms.填写您的地址.com/websocket/" + charId; //ws地址
    // const wsuri = "ws://198.103.124.112:8080/ws";
    // 建立连接
    webSock = new WebSocket(wsUrl);
    // 连接成功
    webSock.onopen = onOpenHandle;
    // 连接错误
    webSock.onerror = onErrorHandle;
    // 接收信息
    webSock.onmessage = onMessageHandle;
    // 连接关闭
    webSock.onclose = onCloseHandle;
  };

  /**
   * 连接失败尝试重连，5s尝试一次
   */
  const reconnect = () => {
    destroy();
    // 重新连接
    console.info("重连锁", lockReconnect);
    if (lockReconnect) {
      return;
    }
    console.info("重连次数", reconnectCount);
    if (reconnectCount > 5) {
      if (option.onError != null) {
        option.onError();
      }
      return;
    }
    lockReconnect = true;
    // 没连接上会一直重连，设置延迟避免请求过多
    clearTimeout(reconnectTimer);

    reconnectTimer = window.setTimeout(() => {
      reconnectCount++;
      lockReconnect = false;
      // 新连接
      init();
    }, 5000);
  };

  /**
   * websocket连接成功
   */
  const onOpenHandle = () => {
    // 连接成功事件 （清除可能存在的重连定时器）
    clearTimeout(reconnectTimer);
    // 提示成功
    console.info("连接成功");
    lockReconnect = false;
    reconnectCount = 0;
    // 开启心跳
    pingTimer = window.setInterval(() => {
      let mag = {
        messageType: 3,
      };
      webSock.send(JSON.stringify(mag));
    }, heartbeatIncoming);

    // 检测是否长时间未收到消息
    msgTimerOutTimer = window.setTimeout(() => {
      reconnect();
    }, msgTimeOutDelay);

    if (option.onOpen != null) {
      option.onOpen();
    }
  };

  const onErrorHandle = () => {
    // 连接失败事件
    // 错误
    console.error("WebSocket连接发生错误");
    // 错误提示
    // 重连
    reconnect();
  };

  const onCloseHandle = (e) => {
    if (option.onClose != null) {
      option.onClose();
    }
    // 连接关闭事件
    // 关闭
    console.error(`connection closed ${e.code}`);
    // 提示关闭
    // 重连
    reconnect();
  };

  /**
   * 接收到消息
   * @param event
   */
  const onMessageHandle = (event) => {
    receiveMessage(event.data);
    // 开始超时检测
    clearTimeout(msgTimerOutTimer);
    msgTimerOutTimer = window.setTimeout(() => {
      reconnect();
    }, msgTimeOutDelay);
  };

  /**
   * 销毁
   */
  const destroy = () => {
    clearInterval(pingTimer);
    clearTimeout(reconnectTimer);
    clearTimeout(msgTimerOutTimer);
    webSock.onopen = null;
    webSock.onerror = null;
    webSock.onmessage = null;
    webSock.onclose = null;
    webSock.close();
  };

  /**
   * 发送消息
   * @param msg
   */
  const sendMsg = (msg) => {
    // 向服务器发送信息
    if (webSock && webSock.readyState === WebSocket.OPEN) {
      webSock.send(msg);
    }
  };

  return {
    init,
    sendMsg,
    destroy,
  };
};

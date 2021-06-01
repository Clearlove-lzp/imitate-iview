const websoctekFactory = (wsurl, fn) => {
  let websock = null;
  let lockReconnect = false;
  let timeout = 10 * 1000;
  let timeoutObj = null;
  let serverTimeoutObj = null;
  let timeoutnum = null;
  let reconnectCount = 0;
  let wsuri = wsurl;

  const initWebSocket = () => {
    //建立连接
    //初始化weosocket
    //const wsuri = "ws://sms.填写您的地址.com/websocket/" + charId; //ws地址
    // const wsuri = "ws://198.103.124.112:8080/ws";
    //建立连接
    websock = new WebSocket(wsuri);
    // eslint-disable-next-line no-console
    //连接成功
    websock.onopen = websocketonopen;
    //连接错误
    websock.onerror = websocketonerror;
    //接收信息
    websock.onmessage = websocketonmessage;
    //连接关闭
    websock.onclose = websocketclose;
  }

  const reconnect = () => {
    //重新连接
    // eslint-disable-next-line no-console
    console.log('重连锁', lockReconnect)
    if (lockReconnect) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log("重连次数" ,reconnectCount)
    if(reconnectCount > 5) {
      return;
    }
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    timeoutnum && clearTimeout(timeoutnum);
    timeoutnum = setTimeout(function() {
      //新连接
      initWebSocket();
      reconnectCount ++;
      lockReconnect = false;
    }, 5000);
  }

  const reset = () => {
    //重置心跳
    //清除时间
    clearTimeout(timeoutObj);
    clearTimeout(serverTimeoutObj);
    //重启心跳
    start();
  }

  const start = () => {
    // eslint-disable-next-line no-console
    //开启心跳
    timeoutObj && clearTimeout(timeoutObj);
    serverTimeoutObj && clearTimeout(serverTimeoutObj);

    timeoutObj = setTimeout(() => {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      if (websock.readyState == 1) {
        // eslint-disable-next-line no-console
        console.log('正常');
        //如果连接正常,发送心跳，如果发送成功，将会执行websocketonopen
        // eslint-disable-next-line no-unused-vars
        let msg = {FG: 'HB', userName: '刘志鹏'};
        // self.websock.send("heartCheck");
        websock.send(JSON.stringify(msg));
      } else {
        //否则重连
        reconnect();
      }
      // 发送心跳后开始计时
      serverTimeoutObj = setTimeout(function() {
        //超时关闭
        websock.close();
      }, timeout);
    }, timeout)
  }

  const websocketonopen = () => {
    //连接成功事件
    //提示成功
    // eslint-disable-next-line no-unused-vars
    let msg = {
      FG: "REG",
      token: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDkiLCJpYXQiOjE1ODcwMjcyOTgsInN1YiI6Imx6cHMiLCJleHAiOjE1ODcxMTM2OTh9.LdtsG6SRMBDIiC9jFqy8wwd1ALvxpgpfVxNQjZifOVM",
      userId: "209",
    }
    websocketsend(JSON.stringify(msg))
    // eslint-disable-next-line no-console
    console.log('连接成功')
    reconnectCount = 0;
    //开启心跳
    start();
  }

  const websocketonerror = () => {
    //连接失败事件
    //错误
    // eslint-disable-next-line no-console
    console.log("WebSocket连接发生错误");
    //错误提示
    //重连
    reconnect();
  }

  const websocketclose = (e) => {
    //连接关闭事件
    //关闭
    if(e.code) {
      // eslint-disable-next-line no-console
      console.log("connection closed (" + e.code + ")");
    }
    //提示关闭
    //重连
    reconnect();
  }

  const websocketonmessage = (event) => {
    //接收服务器推送的信息
    //打印收到服务器的内容
    // eslint-disable-next-line no-console
    console.log(event.data);
    fn && fn(event)
    //收到服务器信息，心跳重置
    reset();
    //播放声音
  }

  const websocketsend = (msg) => {
    //向服务器发送信息
    //数据发送
    websock.send(msg);
  }

  initWebSocket()
}

export default websoctekFactory
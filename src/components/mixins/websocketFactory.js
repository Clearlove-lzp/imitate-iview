export const websocketFactory = {
  data() {
    return {
      websock: null, //建立的连接
      lockReconnect: false, //是否真正建立连接
      timeout: 10 * 1000, //5秒一次心跳
      timeoutObj: null, //心跳心跳倒计时
      serverTimeoutObj: null, //心跳倒计时
      timeoutnum: null, //断开 重连倒计时
      reconnectCount: 0,
      wsuri: "ws://198.103.124.112:8080/ws",
    };
  },
  methods: {
    initWebSocket() {
      //建立连接
      //初始化weosocket
      //const wsuri = "ws://sms.填写您的地址.com/websocket/" + this.charId; //ws地址
      // const wsuri = "ws://198.103.124.112:8080/ws";
      //建立连接
      this.websock = new WebSocket(this.wsuri);
      // eslint-disable-next-line no-console
      //连接成功
      this.websock.onopen = this.websocketonopen;
      //连接错误
      this.websock.onerror = this.websocketonerror;
      //接收信息
      this.websock.onmessage = this.websocketonmessage;
      //连接关闭
      this.websock.onclose = this.websocketclose;
    },
    reconnect() {
      //重新连接
      // eslint-disable-next-line no-console
      console.log("重连锁", this.lockReconnect);
      if (this.lockReconnect) {
        return;
      }
      // eslint-disable-next-line no-console
      console.log("重连次数", this.reconnectCount);
      if (this.reconnectCount > 5) {
        return;
      }
      this.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      this.timeoutnum && clearTimeout(this.timeoutnum);
      this.timeoutnum = setTimeout(() => {
        //新连接
        this.initWebSocket();
        this.reconnectCount++;
        this.lockReconnect = false;
      }, 5000);
    },
    reset() {
      //重置心跳
      //清除时间
      clearTimeout(this.timeoutObj);
      clearTimeout(this.serverTimeoutObj);
      //重启心跳
      this.start();
    },
    start() {
      // eslint-disable-next-line no-console
      //开启心跳
      this.timeoutObj && clearTimeout(this.timeoutObj);
      this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);

      this.timeoutObj = setTimeout(() => {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (this.websock.readyState == 1) {
          // eslint-disable-next-line no-console
          console.log("正常");
          //如果连接正常,发送心跳，如果发送成功，将会执行websocketonopen
          // eslint-disable-next-line no-unused-vars
          let msg = { FG: "HB", userName: "刘志鹏" };
          // self.websock.send("heartCheck");
          this.websock.send(JSON.stringify(msg));
        } else {
          //否则重连
          this.reconnect();
        }
        // 发送心跳后开始计时
        this.serverTimeoutObj = setTimeout(() => {
          //超时关闭
          this.websock.close();
        }, this.timeout);
      }, this.timeout);
    },
    websocketonopen() {
      //连接成功事件
      //提示成功
      // eslint-disable-next-line no-unused-vars
      let msg = {
        FG: "REG",
        token:
          "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDkiLCJpYXQiOjE1ODcwMjcyOTgsInN1YiI6Imx6cHMiLCJleHAiOjE1ODcxMTM2OTh9.LdtsG6SRMBDIiC9jFqy8wwd1ALvxpgpfVxNQjZifOVM",
        userId: "209",
      };
      this.websocketsend(JSON.stringify(msg));
      // eslint-disable-next-line no-console
      console.log("连接成功");
      this.reconnectCount = 0;

      //开启心跳
      this.start();
    },
    websocketonerror() {
      //连接失败事件
      //错误
      // eslint-disable-next-line no-console
      console.log("WebSocket连接发生错误");
      //错误提示
      //重连
      this.reconnect();
    },
    websocketclose(e) {
      //连接关闭事件
      //关闭
      if (e.code) {
        // eslint-disable-next-line no-console
        console.log("connection closed (" + e.code + ")");
      }
      //提示关闭
      //重连
      this.reconnect();
    },
    websocketonmessage(event) {
      //接收服务器推送的信息
      //打印收到服务器的内容
      // eslint-disable-next-line no-console
      console.log(event.data);
      //收到服务器信息，心跳重置
      this.reset();
      //播放声音
    },
    websocketsend(msg) {
      //向服务器发送信息
      //数据发送
      this.websock.send(msg);
    },
  },
  created() {},
  destroyed() {
    this.lockReconnect = true;
    this.timeoutnum && clearTimeout(this.timeoutnum);
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    //页面销毁时关闭长连接
    this.websock.close();
  },
  mounted() {
    //页面刚进入时开启长连接
    this.initWebSocket();
  },
};

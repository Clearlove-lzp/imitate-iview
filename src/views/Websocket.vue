<!-- websocket封装 -->
<template>
  <div>websocket封装</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import { websocketFactory } from "@/components/mixins/websocketFactory.js";
import { webSocketFactory } from "@/utils/websocket.js";
// import io from "socket.io-client";

export default {
  props: {},
  // mixins: [websocketFactory],
  data() {
    return {
      // wsuri: "ws://10.8.133.213:8989/chatroom", // 替换mixin里面的wsuri
    };
  },
  components: {},
  computed: {},
  methods: {
    receiveMessage(msg) {
      console.log(msg);
    },
    onOpenHandle() {
      console.log(111);
    },
  },
  watch: {},
  mounted() {
    // eslint-disable-next-line no-console
    // websocketFactory
    // const socket = io("ws://10.8.133.213:8989");
    // // // // 监听服务器发送的消息
    // socket.on("message", (data) => {
    //   console.log("Received message:", data);
    // });

    // // 发送消息到服务器
    // socket.emit("sendMessage", { content: "Hello, server!" });

    const { init, sendMsg, destroy } = webSocketFactory(
      `ws://10.8.133.213:8989/chatroom?token=111`,
      this.receiveMessage,
      {
        onOpen: this.onOpenHandle,
      }
    );
    init();
  },
  created() {},
};
</script>

<style scoped>
</style>
<!-- websocket封装 -->
<template>
  <div class="chart">
    <div class="chart-list-wrap">
      <div class="link" ref="wrap-container">
        <div class="wrap">
          <div>
            <div class="voice-info">
              <div class="left">
                <img src="@/assets/gis/ic-head.png" alt="" />
              </div>
              <div class="right">
                <div class="info">
                  <span class="name">364246</span>
                  <span class="date">2023/05/30 15:03</span>
                </div>
                <div class="voice-animation" @click="audioPlayFunc">
                  <div class="wifi-symbol-wrap">
                    <div class="wifi-symbol">
                      <div class="wifi-circle first"></div>
                      <div
                        class="wifi-circle second"
                        :class="{ 'second-play': isAudioPlay }"
                      ></div>
                      <div
                        class="wifi-circle third"
                        :class="{ 'third-play': isAudioPlay }"
                      ></div>
                    </div>
                    <div class="time">1 ”</div>
                  </div>
                  <div class="ptt">PTT</div>
                </div>
                <Icon type="ios-alert" class="msg-error" color="red" />
              </div>
            </div>
          </div>
        </div>
        <div class="wrap">
          <div>
            <div class="im-template">
              <div class="left">
                <img src="@/assets/gis/ic-head.png" alt="" />
              </div>
              <div class="right">
                <div class="info">
                  <span class="name">投标演示1</span>
                  <span class="date">2023/05/30 15:10</span>
                </div>
                <div class="content">
                  <div class="content-text" title="测试">
                    <span class="inner-content">测试</span>
                  </div>
                  <div class="content-file"></div>
                </div>
                <Icon type="ios-loading" class="msg-loading" />
              </div>
            </div>
          </div>
        </div>
        <div class="wrap self-wrap">
          <div>
            <div class="im-template self-im-template">
              <div class="left">
                <img src="@/assets/gis/ic-head.png" alt="" />
              </div>
              <div class="right">
                <div class="info">
                  <span class="date">2023/05/30 15:11</span>
                  <span class="name">我</span>
                </div>
                <div class="content self-content">
                  <div class="content-file" @click="handleView">
                    <img
                      src="@/assets/gis/ic-head.png"
                      alt="图片加载失败"
                      title="点击查看大图"
                      class="content-file-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap self-wrap">
          <div>
            <div class="voice-info self-voice-info">
              <div class="left">
                <img src="@/assets/gis/ic-head.png" alt="" />
              </div>
              <div class="right">
                <div class="info">
                  <span class="date">2023/08/07 15:46</span>
                  <span class="name">我</span>
                </div>
                <div class="voice-animation">
                  <div class="wifi-symbol-wrap">
                    <div class="wifi-symbol">
                      <div class="wifi-circle first"></div>
                      <div class="wifi-circle second"></div>
                      <div class="wifi-circle third"></div>
                    </div>
                    <div class="time">1 ”</div>
                  </div>
                  <div class="ptt">PTT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-for="x in datalist"
          :key="x.messageId"
          class="wrap"
          :class="{ 'self-wrap': x.fromUserId === '1575001072192' }"
        >
          <div v-if="x.messageType === 1">
            <div
              class="im-template"
              :class="{ 'self-im-template': x.fromUserId === '1575001072192' }"
            >
              <div class="left">
                <img src="@/assets/gis/ic-head.png" alt="" />
              </div>
              <div class="right">
                <div class="info" v-if="x.fromUserId === '1575001072192'">
                  <span class="date">{{ x.messageSendTime }}</span>
                  <span class="name">我</span>
                </div>
                <div class="info" v-else>
                  <span class="name">{{ x.fromUserName }}</span>
                  <span class="date">{{ x.messageSendTime }}</span>
                </div>
                <div
                  class="content"
                  :class="{ 'self-content': x.fromUserId === '1575001072192' }"
                >
                  <div class="content-text" :title="x.messageContent">
                    <span class="inner-content">{{ x.messageContent }}</span>
                  </div>
                  <div class="content-file"></div>
                </div>
                <Icon
                  type="ios-alert"
                  class="msg-error"
                  color="red"
                  v-if="!x.status && !x.loading"
                  :class="{
                    'self-msg-error': x.fromUserId === '1575001072192',
                  }"
                  @click="reSendFunc(x)"
                />
                <Icon
                  type="ios-loading"
                  class="msg-loading"
                  v-if="x.loading"
                  :class="{
                    'self-msg-loading': x.fromUserId === '1575001072192',
                  }"
                />
              </div>
            </div>
          </div>
          <div v-if="x.messageType === 5">
            <div
              class="im-template"
              :class="{ 'self-im-template': x.fromUserId === '1575001072192' }"
            >
              <div class="left">
                <img src="@/assets/gis/ic-head.png" alt="" />
              </div>
              <div class="right">
                <div class="info" v-if="x.fromUserId === '1575001072192'">
                  <span class="date">{{ x.messageSendTime }}</span>
                  <span class="name">我</span>
                </div>
                <div class="info" v-else>
                  <span class="name">{{ x.fromUserName }}</span>
                  <span class="date">{{ x.messageSendTime }}</span>
                </div>
                <div
                  class="content"
                  :class="{ 'self-content': x.fromUserId === '1575001072192' }"
                >
                  <div class="content-file" @click="handleView">
                    <img
                      :src="isHttps ? x.fileViewUrlHttps : x.fileViewUrl"
                      alt="图片加载失败"
                      title="点击查看大图"
                      class="content-file-img"
                    />
                  </div>
                </div>
                <Icon
                  type="ios-alert"
                  class="msg-error"
                  color="red"
                  v-if="!x.status && !x.loading"
                  :class="{
                    'self-msg-error': x.fromUserId === '1575001072192',
                  }"
                  @click="reSendFunc(x)"
                />
                <Icon
                  type="ios-loading"
                  class="msg-loading"
                  v-if="x.loading"
                  :class="{
                    'self-msg-loading': x.fromUserId === '1575001072192',
                  }"
                />
              </div>
            </div>
          </div>
          <div v-if="x.messageType === 7">
            <div
              class="im-template"
              :class="{ 'self-im-template': x.fromUserId === '1575001072192' }"
            >
              <div class="left">
                <img src="@/assets/gis/ic-head.png" alt="" />
              </div>
              <div class="right">
                <div class="info" v-if="x.fromUserId === '1575001072192'">
                  <span class="date">{{ x.messageSendTime }}</span>
                  <span class="name">我</span>
                </div>
                <div class="info" v-else>
                  <span class="name">{{ x.fromUserName }}</span>
                  <span class="date">{{ x.messageSendTime }}</span>
                </div>
                <div class="file-container">
                  <div class="flie-name">
                    <Icon type="ios-document" size="14" />
                    <span>{{ x.fileName }}</span>
                  </div>
                  <div
                    class="flie-download"
                    @click="downloadFile(x)"
                    v-if="x.fileDownloadUrl"
                  >
                    <Icon type="md-download" size="18" color="#fca802" />
                  </div>
                </div>
                <Icon
                  type="ios-alert"
                  class="msg-error"
                  color="red"
                  v-if="!x.status && !x.loading"
                  :class="{
                    'self-msg-error': x.fromUserId === '1575001072192',
                  }"
                  @click="reSendFunc(x)"
                />
                <Icon
                  type="ios-loading"
                  class="msg-loading"
                  v-if="x.loading"
                  :class="{
                    'self-msg-loading': x.fromUserId === '1575001072192',
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="liveVideo">
      <div class="enter">
        <div class="file-wrap" v-if="fileList.length">
          <span>
            <Icon type="ios-document" size="14" />
            <span>{{ fileList[0].name }}</span>
            <Icon type="ios-checkmark-circle" class="success" size="14" />
            <Icon
              type="md-close"
              class="close"
              size="14"
              @click="fileList = []"
            />
          </span>
        </div>
        <Input
          :class="{ 'file-input': fileList.length }"
          type="textarea"
          placeholder="请输入"
          maxlength="1024"
          v-model="message"
        ></Input>
      </div>
      <div class="footer">
        <div class="footer-left">
          <Upload
            :before-upload="handleUpload"
            action="//jsonplaceholder.typicode.com/posts/"
          >
            <Icon type="ios-folder-outline" />
          </Upload>
        </div>
        <div class="footer-right">
          <Button
            class="star-speak"
            @click="createMedia"
            v-if="!isRecording"
            :loading="recordLoading"
            >点击对讲</Button
          >
          <Button type="warning" @click="stopMedia" v-if="isRecording"
            >再次点击发送</Button
          >
          <Button
            type="warning"
            :class="{ 'is-disabled': !message && !fileList.length }"
            @click="sendFunc"
            >发送</Button
          >
        </div>
      </div>
    </div>
    <audio id="audioPlayer" controls ref="audioPlayer" class="audioPlayer">
      <source src="@/assets/audio.mp3" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import { websocketFactory } from "@/components/mixins/websocketFactory.js";
import { webSocketFactory } from "@/utils/websocket.js";
// import io from "socket.io-client";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export default {
  props: {},
  // mixins: [websocketFactory],
  data() {
    return {
      // wsuri: "ws://10.8.133.213:8989/chatroom", // 替换mixin里面的wsuri
      message: "",
      communicateShow: false,
      fullscreen: false,
      channelInfo: {},
      fileList: [],
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
      recordLoading: false,
      isAudioPlay: false,
      isWsOpen: false,
      datalist: [],
    };
  },
  components: {},
  computed: {
    isHttps() {
      return window.location.protocol.indexOf("https") > -1;
    },
  },
  methods: {
    sendFunc() {
      // messageType
      // 0: 异常登录
      // 1: 文本消息(发送自己/接收他人)
      // 2: 文本消息(响应自己)
      // 3: Ping消息(发送自己)
      // 4: Ping消息(响应自己)
      // 5: 图片消息(发送自己/接收他人)
      // 6: 图片消息(响应自己)
      // 7: 文件消息(发送自己/接收他人)
      // 8: 文件消息(响应自己)

      if (this.message) {
        let msg = {
          messageType: 1,
          toGroupId: "2955206e9abb6abfb14955c9fa7b068b",
          messageContent: this.message,
          fromUserId: "1575001072192",
          fromUserName: "system",
          messageSendTime: moment().format("YYYY-MM-DDD HH:mm"),
          messageId: uuidv4().split("-").join(""),
        };
        this.sendMsgHandle(JSON.stringify(msg));
        let info = {
          ...msg,
          status: false,
          loading: true,
          timerOut: this.setDelay(() => {
            info.status = false;
            info.loading = false;
          }),
        };
        this.datalist.push(info);
        this.message = "";
      }
      if (this.fileList.length) {
        if (this.fileList[0].type.indexOf("image") > -1) {
          let msg = {
            messageType: 5,
            toGroupId: "2955206e9abb6abfb14955c9fa7b068b",
            fromUserId: "1575001072192",
            fromUserName: "system",
            messageSendTime: moment().format("YYYY-MM-DDD HH:mm"),
            messageId: uuidv4().split("-").join(""),
            fileId: "bd42a1d9c2b44fa69df5dfd0255ca091",
          };
          this.sendMsgHandle(JSON.stringify(msg));
          let info = {
            ...msg,
            status: false,
            loading: true,
            fileViewUrl: "",
            fileViewUrlHttps: "",
            timerOut: this.setDelay(() => {
              info.status = false;
              info.loading = false;
            }),
            file: this.fileList[0],
          };
          // 使用FileReader来读取文件并生成URL
          let reader = new FileReader();
          // 读取文件内容并触发onload事件
          reader.readAsDataURL(this.fileList[0]);
          reader.onload = (e) => {
            // 将生成的URL设置为预览图片的src属性
            info.fileViewUrlHttps = e.target.result;
            info.fileViewUrl = e.target.result;
            this.datalist.push(info);
          };
          this.fileList = [];
        } else {
          let msg = {
            messageType: 7,
            toGroupId: "2955206e9abb6abfb14955c9fa7b068b",
            fromUserId: "1575001072192",
            fromUserName: "system",
            messageSendTime: moment().format("YYYY-MM-DDD HH:mm"),
            messageId: uuidv4().split("-").join(""),
            fileId: "bd42a1d9c2b44fa69df5dfd0255ca091",
            timerOut: this.setDelay(() => {
              info.status = false;
              info.loading = false;
            }),
            file: this.fileList[0],
          };
          this.sendMsgHandle(JSON.stringify(msg));
          let info = {
            ...msg,
            fileDownloadUrl: "",
            fileDownloadUrlHttps: "",
            fileName: this.fileList[0].name,
            status: false,
            loading: true,
          };
          this.datalist.push(info);
          this.fileList = [];
        }
      }
    },
    receiveMessage(msg) {
      // messageType
      // 0: 异常登录
      // 1: 文本消息(发送自己/接收他人)
      // 2: 文本消息(响应自己)
      // 3: Ping消息(发送自己)
      // 4: Ping消息(响应自己)
      // 5: 图片消息(发送自己/接收他人)
      // 6: 图片消息(响应自己)
      // 7: 文件消息(发送自己/接收他人)
      // 8: 文件消息(响应自己)
      let info = JSON.parse(msg);
      if (info.successMark) {
        switch (info.messageType) {
          case 1:
          case 5:
          case 7:
            let result = {
              ...info.result,
              status: true,
              loading: false,
            };
            if (result.fileViewUrl) {
              result.fileViewUrl += `&token=26f9170b-1225-4d3b-9905-ac883ea14f76`;
            }
            if (result.fileViewUrlHttps) {
              result.fileViewUrlHttps += `&token=26f9170b-1225-4d3b-9905-ac883ea14f76`;
            }
            if (result.fileDownloadUrl) {
              result.fileDownloadUrl += `&token=26f9170b-1225-4d3b-9905-ac883ea14f76`;
            }
            if (result.fileDownloadUrlHttps) {
              result.fileDownloadUrlHttps += `&token=26f9170b-1225-4d3b-9905-ac883ea14f76`;
            }
            this.datalist.push(result);
            break;
          case 2:
          case 6:
          case 8:
            let idx = this.datalist.findIndex(
              (x) => x.messageId === info.requestMessageId
            );
            if (idx > -1) {
              this.datalist[idx].status = true;
              this.datalist[idx].loading = false;
            }
            if (info.result.fileDownloadUrl) {
              this.datalist[idx].fileDownloadUrl =
                info.result.fileDownloadUrl +
                `&token=26f9170b-1225-4d3b-9905-ac883ea14f76`;
            }
            if (info.result.fileDownloadUrlHttps) {
              this.datalist[idx].fileDownloadUrlHttps =
                info.result.fileDownloadUrlHttps +
                `&token=26f9170b-1225-4d3b-9905-ac883ea14f76`;
            }
            clearTimeout(this.datalist[idx].timerOut);
            break;
        }
      } else {
        switch (info.messageType) {
          case 0:
            this.$Message.error(info.msg);
            this.isWsOpen = false;
            this.destroyHandle();
            break;
          case 2:
          case 6:
          case 8:
            let idx = this.datalist.findIndex(
              (x) => x.messageId === info.requestMessageId
            );
            if (idx > -1) {
              this.datalist[idx].status = false;
              this.datalist[idx].loading = false;
            }
            clearTimeout(this.datalist[idx].timerOut);
            break;
        }
      }
    },
    onOpen(data) {
      this.communicateShow = true;
      this.channelInfo = data;
    },
    realVideoShowFunc() {
      if (this.channelInfo.children) {
        let recodeNodes = this.channelInfo.children.filter(
          (x) => x.dataType === "device"
        );
        this.$emit("realVideoShowFunc", recodeNodes);
      }
    },
    handleUpload(file) {
      this.fileList = [file];
      return false;
    },
    createMedia() {
      this.recordLoading = true;
      this.audioChunks = [];
      // 保存本地流到全局
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream) => {
          this.recordLoading = false;
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              this.audioChunks.push(event.data);
            }
          };
          this.mediaRecorder.onstop = () => {
            stream.getAudioTracks()[0].stop();
            const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
            this.sendAudioToServer(audioBlob);
          };
          this.mediaRecorder.start();
          this.isRecording = true;
          this.$Message.success("正在录音。。");
        })
        .catch((error) => {
          this.recordLoading = false;
          this.$Message.error("访问麦克风时出错。。");
        });
    },
    stopMedia() {
      if (this.isRecording) {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
    },
    sendAudioToServer(audioBlob) {
      console.log(audioBlob);
    },
    handleView() {
      this.$viewerApi({
        options: {
          initialViewIndex: 0,
          url: "url",
        },
        images: [
          {
            name: "11",
            url: require("@/assets/gis/ic-head.png"),
          },
        ],
      });
    },
    audioPlayFunc() {
      if (!this.isAudioPlay) {
        this.$refs.audioPlayer.play();
        this.isAudioPlay = true;
      } else {
        this.$refs.audioPlayer.pause();
        // 重置播放位置
        this.$refs.audioPlayer.currentTime = 0;
        this.isAudioPlay = false;
      }
    },
    downloadFile(data) {
      window.open(
        this.isHttps ? data.fileDownloadUrlHttps : data.fileDownloadUrl
      );
    },
    setDelay(calback) {
      return setTimeout(() => {
        calback && calback();
      }, 2 * 1000);
    },
    reSendFunc(data) {
      if (data.messageType === 1) {
        this.message = data.messageContent;
      } else if (data.messageType === 5 || data.messageType === 7) {
        this.fileList = [data.file];
      }
      let idx = this.datalist.findIndex((x) => {
        return data.messageId === x.messageId;
      });
      if (idx > -1) {
        this.datalist.splice(idx, 1);
      }
      this.sendFunc();
    },
  },
  watch: {
    datalist() {
      this.$nextTick(() => {
        if (this.$refs["wrap-container"]) {
          this.$refs["wrap-container"].scrollTop =
            this.$refs["wrap-container"].scrollHeight;
        }
      });
    },
  },
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

    this.$refs.audioPlayer.addEventListener("ended", () => {
      this.isAudioPlay = false;
    });

    const { init, sendMsg, destroy } = webSocketFactory(
      `ws://10.8.133.213:8989/chatroom?token=26f9170b-1225-4d3b-9905-ac883ea14f76&warRoomId=2955206e9abb6abfb14955c9fa7b068b`,
      this.receiveMessage,
      {
        onOpen: () => {
          this.isWsOpen = true;
        },
        onClose: () => {
          this.isWsOpen = false;
        },
      }
    );
    this.destroyHandle = destroy;
    this.sendMsgHandle = sendMsg;
    init();
  },
  created() {},
  destroyed() {
    this.destroyHandle();
  },
};
</script>

<style scoped lang="less">
@keyframes fadeInOut {
  0% {
    opacity: 0;
    /*初始状态 透明度为0*/
  }
  100% {
    opacity: 1;
    /*结尾状态 透明度为1*/
  }
}

@keyframes ani-load-loop {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.chart {
  position: relative;
  width: calc(100% - 285px);
  height: 600px;
  border-right: 1px solid #edeff4;
  .chart-list-wrap {
    width: 100%;
    height: 75%;
    border-bottom: 1px solid #e5e8ed;
    .link {
      overflow: auto;
      padding: 5px 15px;
      width: 100%;
      height: 100%;
      .wrap {
        width: 100%;
        display: flex;
        align-items: center;
        div {
          box-sizing: border-box;
          .voice-info {
            height: 90px;
            width: 300px;
            padding-top: 15px;
          }
          .im-template {
            height: 100%;
            width: 300px;
            padding: 15px 0px;
          }
          .left {
            display: inline-block;
            width: 50px;
            vertical-align: top;
            img {
              height: 48px;
              width: 48px;
              position: relative;
              top: -15px;
            }
          }
          .right {
            width: 245px;
            display: inline-block;
            position: relative;
            .info {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
              .name {
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #666666;
                letter-spacing: 0;
              }
              .date {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #888888;
                letter-spacing: 0;
              }
            }
            .voice-animation {
              width: 245px;
              height: 40px;
              box-sizing: border-box;
              background: #f6f6f6;
              border: 1px solid #e3e3e3;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 15px;
              cursor: pointer;
              .wifi-symbol-wrap {
                display: flex;
                align-items: center;
                .wifi-symbol {
                  position: relative;
                  width: 20px;
                  height: 20px;
                  box-sizing: border-box;
                  overflow: hidden;
                  transform: rotate(135deg);
                  .wifi-circle {
                    border: 2px solid #fca802;
                    border-radius: 50%;
                    position: absolute;
                  }
                  .first {
                    width: 2px;
                    height: 2px;
                    background: #cccccc;
                    top: 15px;
                    left: 15px;
                  }
                  .second {
                    width: 15px;
                    height: 15px;
                    top: 10px;
                    left: 10px;
                  }
                  .third {
                    width: 25px;
                    height: 25px;
                    top: 5px;
                    left: 5px;
                  }
                  .time {
                    font-size: 10px;
                    margin-left: 5px;
                  }
                  .second-play {
                    animation: fadeInOut 1s infinite 0.2s;
                  }
                  .third-play {
                    animation: fadeInOut 1s infinite 0.4s;
                  }
                }
              }
              .ptt {
                width: 45px;
                height: 20px;
                line-height: 20px;
                border-radius: 10px;
                color: #ffffff;
                font-family: PingFangSC-Medium;
                font-size: 12px;
                background: #fca802;
                text-align: center;
              }
            }
            .file-container {
              width: 245px;
              box-sizing: border-box;
              background: #f6f6f6;
              border: 1px solid #e3e3e3;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 6px 15px;
              min-height: 40px;
              .flie-name {
                width: 185px;
                word-break: break-all;
              }
              .flie-download {
                cursor: pointer;
              }
            }
            .msg-error {
              position: absolute;
              right: -30px;
              top: 42px;
              cursor: pointer;
            }
            .msg-loading {
              position: absolute;
              right: -30px;
              top: 42px;
              animation: ani-load-loop 1s linear infinite;
            }
            .content {
              padding: 6px 10px 6px 10px;
              box-sizing: border-box;
              background: #f6f6f6;
              border: 1px solid #e3e3e3;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              .content-text {
                .inner-content {
                  white-space: pre-wrap;
                  font-family: PingFangSC-Medium;
                  font-size: 14px;
                  color: #333333;
                }
              }
              .content-file {
                width: 100%;
                .content-file-img {
                  max-width: 100%;
                  max-height: 120px;
                  object-fit: contain;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .self-wrap {
        justify-content: flex-end;
        .self-im-template {
          height: 100%;
          width: 300px;
          padding: 15px 0px;
          .left {
            float: right;
          }
          .right {
            .self-content {
              // .content-file {
              //   width: 100%;
              //   .content-file-img {
              //     max-width: 100%;
              //     max-height: 120px;
              //     object-fit: contain;
              //     cursor: pointer;
              //   }
              // }
            }
            .self-msg-error,
            .self-msg-loading {
              right: auto;
              left: -30px;
            }
          }
        }
        .self-voice-info {
          .left {
            float: right;
          }
        }
      }
    }
  }
  .liveVideo {
    position: relative;
    width: 100%;
    height: 25%;
    .enter {
      width: 100%;
      height: calc(100% - 50px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      .file-wrap {
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding-left: 15px;
        span {
          font-size: 12px;
          .success {
            display: inline-block;
            margin-left: 50px;
            color: #67c23a;
            cursor: pointer;
          }
          .close {
            display: none;
            margin-left: 50px;
            cursor: pointer;
          }
        }
        &:hover {
          span {
            .success {
              display: none;
            }
            .close {
              display: inline-block;
            }
          }
        }
      }
      /deep/.ivu-input-type-textarea {
        width: 100%;
        height: 100%;
        .ivu-input {
          width: 100%;
          height: 100% !important;
          overflow: auto;
          outline: none;
          border: none;
          resize: none;
          padding: 5px 15px;
        }
      }
      .file-input {
        height: calc(100% - 30px);
      }
    }
    .footer {
      width: 100%;
      height: 50px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .footer-left {
        display: flex;
        .ivu-icon-ios-folder-outline {
          font-size: 20px;
          cursor: pointer;
          margin-right: 10px;
        }
      }
      .footer-right {
        .star-speak {
          color: #fff;
          background: #4d4d4d;
          border-color: #4d4d4d;
        }
        .is-disabled {
          color: #fff;
          background-color: #d1d1d1;
          border-color: #d1d1d1;
        }
      }
    }
  }
}

.audioPlayer {
  display: none;
}
</style>
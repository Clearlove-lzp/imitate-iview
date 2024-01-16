<!-- websocket封装 -->
<template>
  <div class="chart">
    <div class="chart-list-wrap">
      <div class="link">
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
            :format="['jpg', 'jpeg', 'png']"
            accept=".jpg,.jpeg,.png"
            :on-format-error="handleFormatError"
          >
            <Icon
              type="ios-folder-outline"
              title="支持图片(jpg，jpeg，png)，且小于10MB！"
            />
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
            :class="{ 'is-disabled': !message }"
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
    };
  },
  components: {},
  computed: {},
  methods: {
    sendFunc() {
      let msg = {
        messageType: 1,
        toGroupId: "4ddafb1665d2b737eda4b5af5c303dec",
        messageContent: this.message,
        fromUserId: "1575001072192",
        fromUserName: "system",
        messageSendTime: moment().format("YYYY-MM-DDD HH:mm:ss"),
      };
      this.sendMsgHandle(JSON.stringify(msg));
    },
    receiveMessage(msg) {
      // messageType
      // 1: 发送文本消息
      // 2: 接收文本消息
      // 3: 发送Ping消息
      // 4: 接收Ping消息
      let info = JSON.parse(msg);
      if (info.successMark) {
        switch (info.result.messageType) {
          case 2:
            break;
        }
      }
    },
    onOpenHandle() {
      this.$Message.success("初始化成功");
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
    handleFormatError(file) {
      this.$Message.warning("请上传格式为jpg、png、jpeg格式的图片");
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

    this.$refs.audioPlayer.addEventListener("ended", () => {
      this.isAudioPlay = false;
    });

    const { init, sendMsg, destroy } = webSocketFactory(
      `ws://10.8.133.213:8989/chatroom?token=5d878432-30e7-43ab-9959-3887a9aafbad&warRoomId=4ddafb1665d2b737eda4b5af5c303dec`,
      this.receiveMessage,
      {
        onOpen: this.onOpenHandle,
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
            .msg-error {
              position: absolute;
              right: -30px;
              top: 42px;
              cursor: pointer;
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
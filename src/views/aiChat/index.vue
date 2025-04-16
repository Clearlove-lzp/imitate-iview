<!-- ai聊天室 -->
<template>
  <div class="ai-chat">
    <div class="history-list">
      <div class="new-item" @click="onIframe">
        <Icon type="md-add" />
        <div class="text">打开嵌套页面</div>
      </div>
      <div class="new-item">
        <Icon type="md-add" />
        <div class="text">新会话</div>
      </div>
      <div class="history-item">
        <div class="text">机器狗语音设置机器狗语音设置机器狗语音设置</div>
        <div class="icon-box">
          <Dropdown trigger="click" transfer>
            <Icon type="ios-more" />
            <DropdownMenu slot="list">
              <DropdownItem>重命名</DropdownItem>
              <DropdownItem>删除</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div class="history-item">
        <div class="text">机器狗语音设置</div>
        <div class="icon-box">
          <Dropdown trigger="click" transfer>
            <Icon type="ios-more" />
            <DropdownMenu slot="list">
              <DropdownItem>重命名</DropdownItem>
              <DropdownItem>删除</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="smsChart" :style="{ backgroundColor: styleSheet.otherBgSun }">
      <div class="chat-area">
        <div class="message-wrapper">
          <div class="profile-picture">
            <img src="@/assets/5.jpg" alt="" />
          </div>
          <div class="message-content">
            <p class="name" :style="{ color: styleSheet.messageSun }">ai</p>
            <div
              class="message"
              :style="{
                color: styleSheet.messageSun,
                backgroundColor: styleSheet.messageBgSun,
              }"
            >
              <div v-for="message in messages" :key="message.id">
                <Markdown :content="message.content" />
              </div>
            </div>
          </div>
        </div>
        <div class="message-wrapper">
          <div class="profile-picture">
            <img src="@/assets/5.jpg" alt="" />
          </div>
          <div class="message-content">
            <p class="name" :style="{ color: styleSheet.messageSun }">ai</p>
            <div
              class="message"
              :style="{
                color: styleSheet.messageSun,
                backgroundColor: styleSheet.messageBgSun,
              }"
            >
              Helloo team!说的是但是 实打实Helloo team!说的是但是 实打实Helloo
              team!说的是但是 实打实Helloo team!说的是但是 实打实Helloo
              team!说的是但是 实打实
            </div>
          </div>
        </div>
        <div class="message-wrapper">
          <div class="profile-picture">
            <img src="@/assets/5.jpg" alt="" />
          </div>
          <div class="message-content">
            <p class="name" :style="{ color: styleSheet.messageSun }">ai</p>
            <div
              class="message"
              :style="{
                color: styleSheet.messageSun,
                backgroundColor: styleSheet.messageBgSun,
              }"
            >
              Helloo team!说的是但是 实打实
            </div>
          </div>
        </div>
        <div class="message-wrapper reverse">
          <div class="profile-picture">
            <img src="@/assets/5.jpg" alt="" />
          </div>
          <div class="message-content">
            <p class="name" :style="{ color: styleSheet.messageSun }">我</p>
            <div
              class="message"
              :style="{
                color: styleSheet.messageSun,
                backgroundColor: styleSheet.messageBgSun,
              }"
            >
              Helloo team!😍
            </div>
          </div>
        </div>
        <div class="message-wrapper reverse">
          <div class="profile-picture">
            <img src="@/assets/5.jpg" alt="" />
          </div>
          <div class="message-content">
            <p class="name" :style="{ color: styleSheet.messageSun }">我</p>
            <div
              class="message"
              :style="{
                color: styleSheet.messageSun,
                backgroundColor: styleSheet.messageBgSun,
              }"
            >
              Helloo team!😍
            </div>
          </div>
        </div>
      </div>
      <div class="chat-typing-area-wrapper">
        <div
          class="chat-typing-area"
          :style="{ backgroundColor: styleSheet.messageBgSun }"
        >
          <textarea
            :style="{ color: styleSheet.messageSun }"
            placeholder="Type your meesage..."
            class="chat-input"
          ></textarea>
          <button class="send-button">
            <svg
              t="1622710301680"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="47677"
              width="20"
              height="20"
            >
              <path
                d="M818.473 130.602a59.233 59.233 0 0 1 37.462 0c29.842 9.947 46.497 41.344 38.537 71.335l-1.074 3.59-222.927 668.78a59.233 59.233 0 0 1-29.703 34.248c-28.135 14.068-62.113 3.643-77.69-23.191l-1.78-3.299-139.815-279.569-279.548-139.794a59.235 59.235 0 0 1-26.442-26.392l-1.767-3.858-1.495-3.998c-9.947-29.842 5.177-62.004 33.946-73.63l3.516-1.295 668.78-222.927zM795.81 273.44L489.57 579.68l122.505 245.024L795.81 273.44z m-45.205-45.312l-551.33 183.776L444.3 534.41l306.304-306.282z"
                p-id="47678"
                fill="#ffffff"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <Modal v-model="visible" footer-hide width="1250">
      <iframe
        src="http://localhost:5173/aiChat"
        frameborder="0"
        style="width: 1200px; height: 700px"
        ref="iframeRef"
      ></iframe>
    </Modal>
  </div>
</template>

<script>
import Markdown from "./Markdown.vue"; // 引入刚刚创建的Markdown组件
export default {
  props: {},
  data() {
    return {
      styleSheet: {
        homeBgSun: "#eaebf5",
        otherBgSun: "#fff",
        messageSun: "#323640",
        messageBgSun: "#f3f4f9",
      },
      messages: [
        {
          id: 1,
          content:
            "**欢迎来到聊天室！**\n\n这是一个支持 `Markdown` 语法的聊天框。\n\n- 你可以使用 **加粗** 文字。\n- 也可以使用 *斜体* 文字。\n- 甚至可以添加 [超链接](https://www.example.com)。\n\n```js\nconsole.log('Hello, Markdown!');\n```\n\n> 这是一个引用块，适用于引用消息。\n\n🌟 试试看，发送带有 Markdown 语法的消息吧！",
        },
        {
          id: 2,
          content:
            "## 这是一个二级标题\n你还可以使用标题语法来分隔聊天内容。\n\n---\n\n**Markdown 还支持分割线，让聊天内容更清晰！**",
        },
        {
          id: 3,
          content:
            "- [x] 任务 1：学习 Markdown\n- [ ] 任务 2：在聊天中尝试使用它\n\n`任务列表` 也可以很好地展示 TODO 事项！",
        },
      ],
      visible: false,
    };
  },
  components: {
    Markdown,
  },
  computed: {},
  methods: {
    onIframe() {
      this.visible = true;
      const iframeWindow = this.$refs.iframeRef?.contentWindow;
      if (iframeWindow) {
        console.info(iframeWindow);
        iframeWindow.postMessage({ token: "0" }, "*");
      }
    },
  },
  watch: {},
  mounted() {},
  created() {},
};
</script>

<style scoped lang="less">
.ai-chat {
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.2s;
  display: flex;
  .history-list {
    width: 240px;
    height: 100%;
    background-color: #f3f4f6;
    overflow: auto;
    border-radius: 10px;
    padding: 10px;
    .new-item {
      color: #0057ff;
      cursor: pointer;
      padding: 8px 30px 8px 8px;
      border: 1px solid rgba(0, 102, 255, 0.15);
      background-color: rgba(0, 87, 255, 0.06);
      border-radius: 10px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      font-weight: bold;
      .text {
        margin-left: 10px;
      }
      &:hover {
        background-color: rgba(0, 87, 255, 0.1);
      }
    }
    .history-item {
      padding: 8px 30px 8px 8px;
      cursor: pointer;
      position: relative;
      border-radius: 10px;
      margin-bottom: 5px;
      .text {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
      }
      .icon-box {
        position: absolute;
        width: 30px;
        height: 100%;
        right: 0;
        top: 0px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        display: none;
      }
      &:hover {
        background-color: #eee;
        .icon-box {
          display: block;
        }
      }
    }
  }
}

.smsChart {
  width: calc(100% - 240px);
  border-radius: 20px;
  .chat-area {
    height: calc(100% - 80px);
    width: 100%;
    overflow: auto;
    padding: 16px;
    .message-wrapper {
      display: flex;
      padding: 20px 20px;
      width: 70%;
      margin: 0 auto;
      .profile-picture {
        border-radius: 8px;
        width: 32px;
        height: 32px;
        overflow: hidden;
        margin-right: 12px;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .message-content {
        .name {
          margin: 0;
          line-height: 16px;
          font-size: 18px;
          font-weight: 700;
          text-align: left;
        }
        .message {
          margin-top: 8px;
          padding: 8px 16px;
          border-radius: 0 12px 12px 12px;
          line-height: 16px;
          text-align: left;
          // color: var(--message-text);
        }
      }
    }
    .reverse {
      flex-direction: row-reverse;
      .profile-picture {
        margin-right: 0px;
        margin-left: 12px;
      }
      .message-content {
        .name {
          text-align: right;
        }
        .message {
          margin-left: auto;
          border-radius: 16px 0px 16px 16px;
        }
      }
    }
  }
  .chat-typing-area-wrapper {
    padding: 16px;
    width: 70%;
    margin: 0 auto;
    .chat-typing-area {
      display: flex;
      border-radius: 10px;
      padding: 8px;
      .chat-input {
        border: none;
        font-size: 16px;
        outline: none;
        flex: 1;
        background-color: transparent;
      }
      .send-button {
        color: #fff;
        background-color: #3d42df;
        border-radius: 8px;
        border: none;
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

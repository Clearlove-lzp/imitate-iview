<!-- 和对讲去插件 -->
<template>
  <div>
    <h1>和对讲去插件</h1>
    <div v-if="!speakNetLoginStatus === 0">未登录</div>
    <div v-if="!speakNetLoginStatus === 1">登录失败</div>
    <div v-if="speakNetLoginStatus === 2">登录成功</div>
    <div v-if="speakNetLoginStatus === 2">
      <Button type="error" @click="hangoutHandle">退出登录</Button>
    </div>
    <div v-if="speakNetLoginStatus === 2">
      <p>
        请输入频道id
        <Input v-model="gid"></Input>
        <Button type="primary" @click="intoRoom">进入聊天室</Button>
      </p>
    </div>
  </div>
</template>

<script>
import SlLogin from "./slsdk/slLogin";
export default {
  props: {},
  data() {
    return {
      sllogin: null,
      gid: "1258339094289711228",
    };
  },
  components: {},
  computed: {
    speakNetLoginStatus() {
      return this.$store.getters.speakNetLoginStatus;
    },
    speakNet() {
      return this.$store.getters.speakNet;
    },
  },
  watch: {},
  mounted() {
    this.sllogin = new SlLogin({
      plat_form_id: this.sl.SL_PLATFORM_ID,
      username: this.sl.SL_USERNAME,
      password: this.sl.SL_PASSWORD,
      vm: this,
    });
  },
  created() {},
  methods: {
    intoRoom() {
      if (!this.gid) {
        this.$Message.warning("请输入频道id");
        return;
      }
      this.speakNet.EnterGroup(this.gid);
    },
    hangoutHandle() {
      this.sllogin.logoutSpeak();
    },
  },
};
</script>

<style scoped></style>

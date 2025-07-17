<template>
  <div class="amr-player">
    前缀：data:audio/amr;base64,
    <Input
      type="text"
      v-model="base64Str"
      placeholder="输入或粘贴 base64 字符串"
      style="width: 300px"
    />
    <Button @click="togglePlay" type="primary">
      {{ isPlaying ? "暂停" : "播放" }}
    </Button>
    <!-- <Button @click="downloadAMR" type="primary">下载</Button> -->
    <div class="progress-bar" v-if="duration > 0">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script>
import BenzAMRRecorder from "benz-amr-recorder";

export default {
  data() {
    return {
      amr: null,
      isPlaying: false,
      duration: 0,
      progress: 0,
      fileName: "audio",
      base64Str: "",
    };
  },
  methods: {
    async initPlayer() {
      this.amr = new BenzAMRRecorder();
      const blob = this.base64ToBlob(this.base64Str, "audio/amr");
      await this.amr.initWithBlob(blob);
      this.duration = this.amr.getDuration();
      console.info(this.duration);
      this.amr.onEnded(() => {
        this.isPlaying = false;
        this.progress = 0;
      });
    },
    base64ToBlob(base64String, contentType = "application/octet-stream") {
      // 如果包含 data URL 头部，自动去掉
      const parts = base64String.split(",");
      const base64 = parts.length > 1 ? parts[1] : parts[0];
      const byteCharacters = atob(base64); // 解码 base64
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      // 如果有 mime type，则从 data URL 中提取
      if (!contentType && parts[0].startsWith("data:")) {
        const match = parts[0].match(/data:(.*?);base64/);
        if (match) {
          contentType = match[1];
        }
      }

      return new Blob(byteArrays, { type: contentType });
    },
    togglePlay() {
      if (!this.base64Str) {
        return alert("请先设置 base64 字符串");
      }
      if (!this.amr) {
        this.initPlayer().then(() => this.playAudio());
      } else if (this.isPlaying) {
        this.amr.stop();
        this.isPlaying = false;
      } else {
        this.initPlayer().then(() => this.playAudio());
      }
    },
    playAudio() {
      this.amr.play();
      this.isPlaying = true;
      this.updateProgress();
    },
    updateProgress() {
      const interval = setInterval(() => {
        if (!this.isPlaying) {
          clearInterval(interval);
          return;
        }
        this.progress = (this.amr.getCurrentPosition() / this.duration) * 100;
      }, 200);
    },
    downloadAMR() {
      if (!this.base64Str) {
        return alert("请先设置 base64 字符串");
      }
      const blob = this.base64ToBlob(this.base64Str, "audio/amr");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${this.fileName}.amr`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    },
  },
  beforeUnmount() {
    if (this.amr) {
      this.amr.stop();
    }
  },
};
</script>

<style scoped>
.amr-player {
  display: flex;
  align-items: center;
  gap: 10px;
}
.progress-bar {
  flex-grow: 1;
  height: 4px;
  background: #eee;
}
.progress {
  height: 100%;
  background: #42b983;
  transition: width 0.2s;
}
</style>

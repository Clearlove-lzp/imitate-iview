<!--  -->
<template>
  <div>
    <h2>如果需要播放 HLS 流，需要安装 videojs-contrib-hls 插件
如果需要播放 RTMP 流，需要安装 videojs-flash 插件
如果两个流都需要播放，flash 插件需要安装到 hls 插件之前
安装vue-video-player插件一定要用npm安装，不可使用cnpm安装，否则会报“The "flash" tech is undefined. Skipped browser support check for that tech”
在chome上播放时，视频窗口小于400*300 不会自动播放 在options里加上    flash: {swf: 'static/video-js.swf' // 引入静态文件swf},  下载video-js.swf</h2>
    <p>rtmp流视频</p>
    <videoPlayer class="video-player vjs-custom-skin"
    style="width: 800px;height: 400px"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
      customEventName="changed"></videoPlayer>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash';
import videoJsSwf from 'videojs-swf/dist/video-js.swf';

export default {
  props: {},
  data () {
    return {
      // 视频播放
      playerOptions : {
        // width: 800,
        // height: 400,
        language: 'zh-CN',
        techOrder: ['flash', 'html5'],      // 兼容顺序
        // techOrder: ['flash'],      // 兼容顺序
        muted: true, // 默认情况下将会消除任何音频。
        autoplay: false, //如果true,浏览器准备好时开始回放。
        // controls: true,
        loop: false, // 导致视频一结束就重新开始。
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        // fluid: true, // 当true时，Video.js Player将拥有流体大小，他将按比例缩放适应其容器
        flash: {
          hls: { withCredentials: false },
          swf: videoJsSwf // 引入静态文件swf
        },
        html5: { hls: { withCredentials: false } },
        sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
          type: 'rtmp/mp4',
          src: 'rtmp://10.217.53.128:1935/vod/01.mp4?token=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzMDMzMDQyNSIsImlhdCI6MTY2MDk3NTk5Miwic3ViIjoi5YiY5b-X6bmPIiwiZXhwIjoxNjYxMDYyMzkyfQ.2GpFJsA2KGMEqChDFlSZY0_7G8ItgdMHOgkXe-IN_Rc'
        }],
        poster: "", //你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        // controlBar: {
        //   timeDivider: true, // 是否显示当前时间和持续时间的分隔符
        //   durationDisplay: true, // 是否显示持续时间
        //   remainingTimeDisplay: false, // 是否显示剩余时间
        //   fullscreenToggle: true  //全屏按钮
        // }
      }
    };
  },
  components: {
    videoPlayer
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
  created() {},
}
</script>

<style scoped>
</style>
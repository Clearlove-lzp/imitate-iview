<!-- 录屏功能 -->
<template>
  <div>
    <h1><u style='color:#fc5c65'>在线屏幕录制</u><br>支持 :新版本 Chrome,Edge,Firefox 桌面浏览器  <br></h1>
    <video ref="video" autoplay='true' id='video' controls='true' controlsList='nodownload'></video>
    <button ref="recordBtn" class='btn' id='record' @click='record()'>录制</button>
    <button ref="stopBtn" style='display: none' class='btn' id='stop' @click='stop()'>停止</button>
    <button ref="downloadBtn" disabled='true' class='btn' id='download' @click='download()'>下载</button>
    <div class='created'></div>
  </div>
</template>

<script>
let recorder
export default {
  props: {},
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {
    async record() {
        // 开始录屏
      let captureStream

      try{
        captureStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,   //not support
          cursor: 'always'
        })
      }catch(e){
          // 取消录屏或者报错
        alert("Could not get stream")
        return
      }
      this.$refs.downloadBtn.disabled = true
      this.$refs.recordBtn.style = 'display: none'
      this.$refs.stopBtn.style = 'display: inline'
        
      // 删除之前的 Blob
      window.URL.revokeObjectURL(this.$refs.video.src)

      this.$refs.video.autoplay = true
        
      // 实时的播放录屏
      this.$refs.video.srcObject = captureStream
        
      // new 一个媒体记录
      recorder = new MediaRecorder(captureStream, { audioBitsPerSecond : 128000, videoBitsPerSecond : 2500000, mimeType: "video/webm" })
      recorder.start()
        
      captureStream.getVideoTracks()[0].onended = () => {
          // 录屏结束完成
        recorder.stop()
      }

      recorder.addEventListener("dataavailable", event => {
          // 录屏结束，并且数据可用
        console.log("dataavailable------------")
        console.log(event.data)
        let videoUrl = URL.createObjectURL(event.data, {type: 'video/webm'})

        this.$refs.video.srcObject = null
        this.$refs.video.src = videoUrl
        this.$refs.video.autoplay = false

        this.$refs.downloadBtn.disabled = false
        this.$refs.recordBtn.style = 'display: inline'
        this.$refs.stopBtn.style = 'display: none'
      })
    },
    download(){
        // 下载
      const url = this.$refs.video.src
      const name = new Date().toISOString().slice(0, 19).replace('T',' ').replace(" ","_").replace(/:/g,"-")
      const a = document.createElement('a')
  
      a.style = 'display: none'
      a.download = `${name}.webm`
      a.href = url
  
      document.body.appendChild(a)
  
      a.click()
      window.URL.revokeObjectURL(this.$refs.video.src);
      document.body.removeChild(a)
    },
    // 停止
    stop(){
      let tracks = this.$refs.video.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      recorder.stop()
    }
  },
  watch: {},
  mounted() {},
  created() {},
}
</script>

<style scoped>
#controls{
  text-align: center;
}
.btn{
  margin: 10px 5px;
  padding: 15px;
  background-color: #2bcbba;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  outline: none;
  font-size: 1.2em;
  width: 120px;
  height: 50px;
}
.btn:hover{
  background-color: #26de81;
  cursor: hand;
}
.btn:disabled{
  background-color: #2bcbba80;
}
#stop{
  background-color: #fc5c65;
}
#video{
  margin-top: 10px;
  margin-bottom: 20px;
  border: 12px solid #a5adb0 ;
  border-radius: 15px;
  outline: none;
  width: 100%;
  height: 400px;
  background-color: black;
}
h1{
  color: #2bcbba;
  letter-spacing:-2.5px;
  line-height: 30px;
}
.created{
  color: lightgrey;
  letter-spacing: -0.7px;
  font-size: 1em;
  margin-top: 40px;
}
.created > a{
  color: #4b7bec;
  text-decoration: none;
}
</style>
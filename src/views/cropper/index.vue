<template>
  <div class="cropper-wrapper">
    <div class="img-box">
      <img class="cropper-image" :id="imgId" alt="">
    </div>
    <div class="right-con">
      <div v-if="preview" class="preview-box" :id="previewId"></div>
      <div class="button-box">
        <slot>
          <Upload action="image/upload" :before-upload="beforeUpload">
            <Button style="width: 150px;" type="primary">上传图片</Button>
          </Upload>
        </slot>
        <div v-show="insideSrc">
          <Button type="primary" @click="rotate">
            <Icon type="md-refresh" :size="18"/>
          </Button>
          <Button type="primary" @click="shrink">
            <Icon type="md-remove" :size="18"/>
          </Button>
          <Button type="primary" @click="magnify">
            <Icon type="md-add" :size="18"/>
          </Button>
          <Button type="primary" @click="scale('X')">
            <Icon custom="iconfont icon-shuipingfanzhuan" :size="18"/>
            左/右
          </Button>
          <Button type="primary" @click="scale('Y')">
            <Icon custom="iconfont icon-chuizhifanzhuan" :size="18"/>
            上/下
          </Button>
          <Button type="primary" @click="move(0, -moveStep)">
            <Icon type="md-arrow-round-up" :size="18"/>
          </Button>
          <Button type="primary" @click="move(-moveStep, 0)">
            <Icon type="md-arrow-round-back" :size="18"/>
          </Button>
          <Button type="primary" @click="move(0, moveStep)">
            <Icon type="md-arrow-round-down" :size="18"/>
          </Button>
          <Button type="primary" @click="move(moveStep, 0)">
            <Icon type="md-arrow-round-forward" :size="18"/>
          </Button>
          <Button style="width: 150px;margin-top: 10px;" type="primary" @click="crop">{{ cropButtonText }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
export default {
  name: 'Cropper',
  props: {
    imgSrc: {
      type: String,
      default: ''
    },
    preview: {
      type: Boolean,
      default: true
    },
    moveStep: {
      type: Number,
      default: 4
    },
    cropButtonText: {
      type: String,
      default: '裁剪'
    }
  },
  data () {
    return {
      cropper: null,
      insideSrc: ''
    }
  },
  computed: {
    imgId () {
      return `cropper${this._uid}`
    },
    previewId () {
      return `cropper_preview${this._uid}`
    }
  },
  watch: {
    imgSrc (src) {
      this.replace(src)
    },
    insideSrc (src) {
      this.replace(src)
    }
  },
  methods: {
    beforeUpload (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        debugger
        this.insideSrc = event.srcElement.result
      }
      return false
    },
    replace (src) {
      this.cropper.replace(src)
      this.insideSrc = src
    },
    rotate () {
      this.cropper.rotate(90)
    },
    shrink () {
      this.cropper.zoom(-0.1)
    },
    magnify () {
      this.cropper.zoom(0.1)
    },
    scale (d) {
      this.cropper[`scale${d}`](-this.cropper.getData()[`scale${d}`])
    },
    move (...argu) {
      this.cropper.move(...argu)
    },
    crop () {
      this.cropper.getCroppedCanvas().toBlob(blob => { // getCroppedCanvas方法不兼容ie9及一下
        this.$emit('on-crop', blob)
        if (window.navigator.msSaveOrOpenBlob) {  //兼容性处理
          navigator.msSaveBlob(blob, "裁剪图片");
        }else{
          let aEle = document.createElement("a");// 创建a标签
          document.body.appendChild(aEle);
          aEle.download = "裁剪图片";// 设置下载文件的文件名
          aEle.href = window.URL.createObjectURL(blob);
          aEle.style.display = 'none';
          aEle.click()
          document.body.removeChild(aEle);
          window.URL.revokeObjectURL(window.URL.createObjectURL(blob))
        }
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      let dom = document.getElementById(this.imgId)
      this.cropper = new Cropper(dom, {
        preview: `#${this.previewId}`,
        checkCrossOrigin: true
      })
      setTimeout(() => {
        this.insideSrc = require("@/assets/miao.png");
      }, 1000)
    })

  }
}
</script>

<style src="./index.stylus" lang="stylus">
</style>

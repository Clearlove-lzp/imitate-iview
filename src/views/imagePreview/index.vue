<!-- 图片预览 -->
<template>
  <div style="height:50px; overflow:auto">
    <div v-for="(x, i) in imglist" :key="i" class="demo-upload-list">
      <img :src="x" alt="">
      <div class="demo-upload-list-cover">
        <Icon type="ios-eye-outline" @click.native="handleView(x)"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import { api as viewerApi } from "v-viewer"
export default {
  props: {},
  data () {
    return {
      imglist: [
        require("@/assets/miao.png"),
        require("@/assets/logo.png"),
        require("@/assets/5.jpg"),
      ]
    };
  },
  components: {},
  computed: {},
  methods: {
    handleView(x) {
      const $viewer = this.$viewerApi({
        images: this.imglist
      })
    }
  },
  watch: {},
  mounted() {},
  created() {},
}
</script>

<style scoped>
.demo-upload-list{
  display: inline-block;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 4px;
}
.demo-upload-list img{
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover{
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
  display: block;
}
.demo-upload-list-cover i{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
<template>
  <div id="app">
    <div id="nav">
      <Menu mode="horizontal" theme="primary" active-name="/transfer">
        <div class="logoDiv">Design Studio</div>
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-stats" />
            组件
          </template>
          <MenuItem name="/transfer" to="/transfer">穿梭框</MenuItem>
          <MenuItem name="/pageTable" to="/pageTable">分页表格</MenuItem>
          <MenuItem name="/upload" to="/upload">上传</MenuItem>
          <MenuItem name="/download" to="/download">下载</MenuItem>
          <MenuItem name="/pageDetail" to="/pageDetail">详情页</MenuItem>
          <MenuItem name="/virtualList" to="/virtualList">虚拟列表</MenuItem>
          <MenuItem name="/crud" to="/crud">crud</MenuItem>
          <MenuItem name="/descode" to="/descode">des加密解密</MenuItem>
          <MenuItem name="/hookTest" to="/hookTest"
            >vue3增删改查hook测试</MenuItem
          >
          <MenuItem name="/cropper" to="/cropper">图片裁剪</MenuItem>
          <MenuItem name="/tree_select_page_iview" to="/tree_select_page_iview"
            >树状下拉选择器--iview</MenuItem
          >
          <MenuItem
            name="/tree_select_page_mySelf"
            to="/tree_select_page_mySelf"
            >树状下拉选择器--mySelf魔改</MenuItem
          >
          <MenuItem name="/previewDoc" to="/previewDoc"
            >word,excel,ppt,pdf在线预览</MenuItem
          >
          <MenuItem name="/count_to_number" to="/count_to_number"
            >数字渐变</MenuItem
          >
          <MenuItem name="/org_tree" to="/org_tree">组织结构树</MenuItem>
          <MenuItem name="/directivePage" to="/directivePage">指令</MenuItem>
          <MenuItem name="/vueQuillEditor" to="/vueQuillEditor"
            >vue-quill-editor</MenuItem
          >
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-stats" />
            组件2
          </template>
          <MenuItem name="/imagePreview" to="/imagePreview">图片预览</MenuItem>
          <MenuItem name="/videoPlay" to="/videoPlay">rtmp流视频</MenuItem>
          <MenuItem name="/canvasStep" to="/canvasStep">canvas流程图</MenuItem>
          <MenuItem name="/vxeTable" to="/vxeTable">vxeTable</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats" />
            作战室
          </template>
          <MenuItem name="/video" to="/video">录屏</MenuItem>
          <MenuItem name="/loca1" to="/loca1">1V1本地视频</MenuItem>
          <MenuItem name="/online1" to="/online1">1V1在线视频</MenuItem>
          <MenuItem name="/many" to="/many">多人视频</MenuItem>
          <MenuItem name="/whiteboard" to="/whiteboard">白板演示</MenuItem>
          <MenuItem name="/palette" to="/palette">共享画板</MenuItem>
          <MenuItem name="/warRoom" to="/warRoom">作战室</MenuItem>
          <MenuItem name="/Websocket" to="/Websocket">Websocket</MenuItem>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-stats" />
            地图
          </template>
          <MenuItem name="/baiduMap" to="/baiduMap">百度地图</MenuItem>
          <MenuItem name="/tencentMap" to="/tencentMap">腾讯地图</MenuItem>
          <MenuItem name="/shGis" to="/shGis">上海Gis</MenuItem>
          <MenuItem name="/turf" to="/turf">Turf.js</MenuItem>
        </Submenu>
        <Submenu name="5">
          <template slot="title">
            <Icon type="ios-stats" />
            可配置
          </template>
          <MenuItem name="/configurableForm" to="/configurableForm"
            >表单</MenuItem
          >
        </Submenu>
        <div class="userDiv">
          <img class="headImage" :src="require('@/assets/miao.png')" alt="" />
          Lzp
        </div>
      </Menu>
    </div>
    <div class="Main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
  created() {
    console.log(process.env);
  },
};
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  margin-top 10px
  font-family 'Times New Roman', Times, serif
#nav
  position fixed
  top 0
  left 0
  z-index 1000
  width 100%
.Main
  padding 20px
  height calc(100vh - 60px)
  position fixed
  top 60px
  width 100%
  overflow auto
.logoDiv
  width 200px
  float left
  text-align center
  font-size 25px
  color #fff
  font-weight bold
.userDiv
  width 150px
  float right
  text-align center
  font-size 15px
  color #fff
  font-weight bold
  height 100%
  .headImage
    width 30px
    height 30px
    vertical-align middle
    margin-right 10px
    border-radius 50%
/* 滚动条 start */
::-webkit-scrollbar
  width 9px
  height 8px
  // background-color: #f5f5f5;
/* 定义滚动条轨道 内阴影+圆角 */
::-webkit-scrollbar-track
  -webkit-box-shadow inset 0 0 10px rgba(0, 0, 0, 0.3)
  box-shadow inset 0 0 10px rgba(0, 0, 0, 0.3)
  background #fff
  border-radius 5px
/* 定义滑块 内阴影+圆角 */
::-webkit-scrollbar-thumb
  border-radius 5px
  -webkit-box-shadow inset 0 0 10px rgba(0, 0, 0, 0.3)
  box-shadow inset 0 0 10px rgba(0, 0, 0, 0.3)
  background-color #008ce6
::-webkit-scrollbar-thumb:hover
  border-radius 5px
  -webkit-box-shadow inset 0 0 10px rgba(0, 0, 0, 0.3)
  box-shadow inset 0 0 10px rgba(0, 0, 0, 0.3)
  background-color rgba(7, 170, 247, 1)
// IE
::-ms-scrollbar
  width 9px
  height 8px
  background-color #f5f5f5
/* 定义滚动条轨道 内阴影+圆角 */
::-ms-scrollbar-track
  -ms-box-shadow inset 0 0 10px rgba(0, 0, 0, 0.3)
  box-shadow inset 0 0 10px rgba(0, 0, 0, 0.3)
  background #fff
/* 定义滑块 内阴影+圆角 */
::-ms-scrollbar-thumb
  border-radius 5px
  -ms-box-shadow inset 0 0 10px rgba(0, 0, 0, 0.3)
  box-shadow inset 0 0 10px rgba(0, 0, 0, 0.3)
  background-color #008ce6
::-ms-scrollbar-thumb:hover
  border-radius 5px
  -ms-box-shadow inset 0 0 10px rgba(0, 0, 0, 0.3)
  box-shadow inset 0 0 10px rgba(0, 0, 0, 0.3)
  background-color rgba(7, 170, 247, 1)
</style>

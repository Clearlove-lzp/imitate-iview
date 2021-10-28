<template>
  <div id="app">
    <div id="nav">
      <Menu mode="horizontal" active-name="/transfer">
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
          <MenuItem name="/hookTest" to="/hookTest">vue3增删改查hook测试</MenuItem>
          <MenuItem name="/cropper" to="/cropper">图片裁剪</MenuItem>
          <MenuItem name="/tree_select_page" to="/tree_select_page">树状下拉选择器</MenuItem>
        </Submenu>
        <Submenu name="2">
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
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats" />
            地图
          </template>
          <MenuItem name="/baiduMap" to="/baiduMap">百度地图</MenuItem>
          <MenuItem name="/tencentMap" to="/tencentMap">腾讯地图</MenuItem>
        </Submenu>
      </Menu>
    </div>
    <div class="Main">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
  created() {
    console.log(process.env)
  },
}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 10px

#nav
  position fixed
  top: 0
  left: 0
  z-index 1000
.Main
  margin 80px 20px 0
</style>

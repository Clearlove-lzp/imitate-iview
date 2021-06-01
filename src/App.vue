<template>
  <div id="app">
    <div id="nav">
      <router-link to="/about">About</router-link> |
      <router-link to="/transfer">穿梭框</router-link> |
      <router-link to="/pageTable">分页表格</router-link> |
      <router-link to="/upload">上传</router-link> |
      <router-link to="/download">下载</router-link> |
      <router-link to="/pageDetail">详情页</router-link> |
      <router-link to="/virtualList">虚拟列表</router-link> |
      <router-link to="/crud">crud</router-link> |
      <router-link to="/video">录屏</router-link> |
      <router-link to="/descode">des加密解密</router-link> |
      <router-link to="/loca1">1V1本地视频</router-link> |
      <router-link to="/online1">1V1在线视频</router-link> |
      <router-link to="/many">多人视频</router-link> |
      <router-link to="/whiteboard">白板演示</router-link> |
      <router-link to="/palette">共享画板</router-link> |
      <router-link to="/Websocket">Websocket</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>

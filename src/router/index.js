import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/transfer',
    name: 'Transfer',
    component: () => import(/* webpackChunkName: "transfer" */ '../views/Transfer.vue')
  },
  {
    path: '/transfer',
    name: 'Transfer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Transfer.vue')
  },
  {
    path: '/pageTable',
    name: 'pageTable',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "pageTable" */ '../views/PageTable.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "upload" */ '../views/Upload.vue')
  },
  {
    path: '/download',
    name: 'download',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "download" */ '../views/Download.vue')
  },
  {
    path: '/pageDetail',
    name: 'pageDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "pageDetail" */ '../views/pageDetail.vue')
  },
  {
    path: '/virtualList',
    name: 'virtualList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "virtualList" */ '../views/virtualList.vue')
  },
  {
    path: '/crud',
    name: 'crud',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "crud" */ '../views/crud/index.vue')
  },
  {
    path: '/video',
    name: 'video',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "video" */ '../views/Video.vue')
  },
  {
    path: '/descode',
    name: 'descode',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "descode" */ '../views/Descode.vue')
  },
  {
    path: '/loca1',
    name: 'loca1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "loca1" */ '../views/WarRoom/loca1.vue')
  },
  {
    path: '/online1',
    name: 'online1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "online1" */ '../views/WarRoom/online1.vue')
  },
  {
    path: '/many',
    name: 'many',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "many" */ '../views/WarRoom/many.vue')
  },
  {
    path: '/whiteboard',
    name: 'whiteboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "whiteboard" */ '../views/WarRoom/whiteboard.vue')
  },
  {
    path: '/palette',
    name: 'palette',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "palette" */ '../views/WarRoom/palette.vue')
  },
  {
    path: '/Websocket',
    name: 'Websocket',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Websocket" */ '../views/Websocket.vue')
  },
  {
    path: '/warRoom',
    name: 'warRoom',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "warRoom" */ '../views/WarRoom/warRoom.vue')
  },
  {
    path: '/hookTest',
    name: 'hookTest',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "hookTest" */ '../views/hookTest/index.vue')
  },
  {
    path: '/baiduMap',
    name: 'baiduMap',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "baiduMap" */ '../views/baiduMap/map.vue')
  },
  {
    path: '/tencentMap',
    name: 'tencentMap',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tencentMap" */ '../views/tencentMap/map.vue')
  },
  {
    path: '/cropper',
    name: 'cropper',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "cropper" */ '../views/cropper/index.vue')
  },
  {
    path: '/tree_select_page_iview',
    name: 'tree_select_page_iview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tree_select_page_iview" */ '../views/treeSelectPage/iview/index.vue')
  },
  {
    path: '/tree_select_page_mySelf',
    name: 'tree_select_page_mySelf',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tree_select_page_mySelf" */ '../views/treeSelectPage/mySelf/index.vue')
  },
  {
    path: '/previewDoc',
    name: 'previewDoc',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "previewDoc" */ '../views/previewDoc/index.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router

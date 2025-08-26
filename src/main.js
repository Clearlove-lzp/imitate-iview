import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCompositionAPI from "@vue/composition-api";
import importDirective from "@/directive";
import { directive as clickOutside } from "v-click-outside-x";
import VOrgTree from "v-org-tree";
import "v-org-tree/dist/v-org-tree.css";
import axios from "axios";

import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";

import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
Vue.use(VXETable);

Vue.use(VueCompositionAPI);
Vue.use(Viewer);

Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.use(VOrgTree);

importDirective(Vue);
Vue.directive("clickOutside", clickOutside);

Vue.config.productionTip = false;

import net from "./views/heMediaNew/slsdk/CmccTobSDK.js";
window.net = net;
Vue.prototype.$userInfo = {};

axios.get("./static/config.json").then((res) => {
  window.SL_WEB_URL = res.data.SL_WEB_URL;
  window.SL_DNS = res.data.SL_DNS;
  net.prototype.web_url = res.data.SL_WEB_URL;
  Vue.prototype.sl = {
    SL_WEB_URL: res.data.SL_WEB_URL,
    SL_DNS: res.data.SL_DNS,
    SL_PLATFORM_ID: res.data.SL_PLATFORM_ID,
    SL_USERNAME: res.data.SL_USERNAME,
    SL_PASSWORD: res.data.SL_PASSWORD,
    SL_TEMPSPEAK_ACCOUT: res.data.SL_TEMPSPEAK_ACCOUT,
  };
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});

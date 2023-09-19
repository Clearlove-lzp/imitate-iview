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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

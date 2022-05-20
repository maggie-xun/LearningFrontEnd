import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.scss"; // global css
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/icons";
import "./permission";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
// import loading from './components/loading'
Vue.use(ElementUI);
Vue.use(ViewUI);

// Vue.use(loading)
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

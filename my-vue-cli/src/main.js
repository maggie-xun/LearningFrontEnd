import Vue from "vue";
import App from "./App.vue";
import router from "./router";
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});

const promisedd = new Promise((resolve) => {
  resolve();
});
console.log(promisedd);

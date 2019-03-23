import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fastClick from "fastclick";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import "@/assets/css/base.css";
import "babel-polyfill";
import api from "@/api/index";
import { Dialog, Popup } from "vant";
import cookie from "@/assets/js/cookie"

Vue.config.productionTip = false;
fastClick.attach(document.body);
Vue.use(VueAwesomeSwiper);
Vue.use(Dialog).use(Popup);
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
router.beforeResolve((to, from, next) => {
  const userInfo = cookie.get('is_login')
  if (to.meta.requireAuth) {
    localStorage.setItem('authUrl', to.fullPath)
    if (userInfo) {
      next()
    } else {
      // router.replace('/author')
      window.location.href = 'http://kf0001.rungyun.cn/api/login/index'
    }
  } else {
    next()
  }
})

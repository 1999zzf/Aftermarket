import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { post, get ,userpost,upload} from "./utils/httpUrl"
import {getCookie,setCookie,delCookie} from './utils/cookie'
Vue.config.devtools=true;
Vue.config.productionTip = false

Vue.prototype.$post = post;
Vue.prototype.$axios = axios;
Vue.prototype.$upload = upload;
Vue.prototype.$userpost = userpost;
Vue.prototype.$get = get;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$delCookie = delCookie;


Vue.use(ElementUI)

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.islogin == true) {//判断是否需要登录
    if (sessionStorage.getItem("token")) {
      if (to.meta.title) {
        document.title = '易丰科技 | ' + to.meta.title
        next()
      }
    } else {
      document.title = '易丰科技 | ' + to.meta.title
      next({
        path:'/'
      })
    }
  } else {
    if (to.meta.title) {
      document.title = '易丰科技 | ' + to.meta.title
      next()
    }
  }

})

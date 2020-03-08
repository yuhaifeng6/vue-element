import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局配置
import "./assets/scss/reset.scss"
import 'element-ui/lib/theme-chalk/index.css';
import http from "@/api/config"
import './mock'

// 引入第三方包
import ElementUI from 'element-ui';

Vue.use(ElementUI)
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
// 引入国际化i18n
import i18n from './lang/index'
// api挂到全局中，也可以直接引到组件内，两种写法
import api from '../api/api'
Vue.prototype.$api=api

Vue.config.productionTip = false

//刷新判断本地是否有登录信息
let token=localStorage.getItem('usertoken')
if (token) {
  let obj=JSON.parse(token)
  store.commit('loginModul/setUserName',obj)
}




new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

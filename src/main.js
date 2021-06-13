import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant'
import '@/styles/base.less'
import 'amfe-flexible'
import moment from 'moment'

Vue.config.productionTip = false
// 设置moment语言环境
moment.locale('zh-cn')
Vue.filter('fromNow', input => {
  return moment(input).fromNow()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

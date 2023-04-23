import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { useQiankun } from './qiankun'

Vue.config.productionTip = false

const vueApp = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/**
 * 在vue挂载完毕后，使用qiankun
 * */
useQiankun()

import './public-path'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import "./common/css/reset.css"; //引入重置样式表

import ElementUI from 'element-ui'; //引入饿了么
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import store from './store/index' // 引入vuex

/**
 * qiankun相关
 * */
let instance = null // 定义变量instance，将实例化的vue挂在其上

if (!window.__POWERED_BY_QIANKUN__) {
  console.log('window.__POWERED_BY_QIANKUN__', window.__POWERED_BY_QIANKUN__);
  render()
}

function render({ container, parentStore } = {}) {
  instance = new Vue({
    // router,
    store,
    data() {
      return {
        parentStore
      }
    },
    render: h => h(App)
  }).$mount(container ? container.querySelector('#child1') : '#child1')
  // index.html 里面的 id 需要改成 child1，否则子项目无法独立运行
}

// bootstrap初始化构建钩子
export async function bootstrap() {
  console.log('child1的bootstraped阶段')
}
// 进入应用mount钩子中渲染内容
export async function mount(props) {
  if (props.parentStore) {
    await props.parentStore.dispatch('getResource', { name: '传参资源' })
  }
  console.log('child1子应用挂载mount', props) // 将token加到请求头中
  render(props)
}
// 离开应用unmount钩子中卸载微应用实例
export async function unmount() {
  console.log('child1子应用卸载unmount')
  instance.$destroy()
  instance = null
}
// 更新的钩子函数
export async function update(props) {
  console.log('update props', props)
}

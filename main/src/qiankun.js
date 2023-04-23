/**
 * registerMicroApps函数用于注册微应用
 *      参数有两个：
 *          一个参数是 需要注册哪些子应用
 *          另一个参数是 全局微应用生命周期钩子
 * */
import { registerMicroApps, start } from 'qiankun'

export const useQiankun = () => {
  const appArr = [
    {
      name: 'child1', // 微应用名称要唯一
      entry: 'http://localhost:10001', // 微应用入口地址
      container: '#appContainer', // 微应用容器
      activeRule: '/child1', // 微应用路由匹配就激活
      props: { // 主应用传参数给微应用
        tokentoken: 'token', // vuex
      }
    },
    // {
    //   name: 'child2',
    //   entry: 'http://localhost:10002',
    //   container: '#appContainer',
    //   activeRule: '/child2',
    // }
  ]
  const lifeCycleHookObj = {
    beforeLoad: [
      app => {
        console.log(`${app.name}子应用加载前阶段-beforeLoad`)
      }
    ],
    beforeMount: [
      app => {
        console.log(`${app.name}子应用的挂载前阶段-beforeMount`)
      }
    ],
    afterMount: [
      app => {
        console.log(`${app.name}子应用的挂载后阶段-afterMount`)
      }
    ],
    beforeUnmount: [
      app => {
        console.log(`${app.name}子应用的卸载前阶段-beforeUnmount`)
      }
    ],
    afterUnmount: [
      app => {
        console.log(`${app.name}子应用的卸载后阶段-afterUnmount`)
      }
    ]
  }
  // 先注册（注册几个子应用，加上生命周期配置）
  registerMicroApps(appArr, lifeCycleHookObj)
  // 再启动（默认开始沙箱进行样式隔离，开启预加载并加载所有子应用资源）
  start({ experimentalStyleIsolation: true, prefetch: 'all' })
}

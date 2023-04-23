import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
})

// 重写路由push方法兜错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return routerPush.call(this, location, onResolve, onReject);
  return routerPush.call(this, location).catch(error => error)
};

export default router

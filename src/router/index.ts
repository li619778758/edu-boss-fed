/*
 * @Author: liyewen liyewen436@163.com
 * @Date: 2022-09-13 22:53:20
 * @LastEditors: liyewen liyewen436@163.com
 * @LastEditTime: 2022-09-14 21:23:50
 * @FilePath: \大前端P7\第三阶段\edu-boss-fed\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import home from /* webpackChunkName: 'home' */ '@/views/home/index.vue'
import layout from /* webpackChunkName: 'layout' */ '@/layout/index.vue'
import store from /* webpackChunkName: 'store' */ '@/store'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index.vue')
  },
  {
    path: '/',
    component: layout,
    // 可以在父路由设置，这样也可以限制子路由
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: home
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advertSpace',
        component: () => import(/* webpackChunkName: 'advertSpace' */'@/views/advert-space/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'create-menu' */'@/views/menu/create.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'errorPage',
    component: () => import(/* webpackChunkName: 'errorPage' */'@/views/error-page/index.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // if (to.path !== '/login') {

  // }
  // 路由守卫中 一定要调用 next, 否则页面无法显示
  // 在路由里面的 meta 设置了 requiresAuth，这个属性是自己命名的 的会查验
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        // redirect 是自己定义的key, 等登录之后继续跳转到此页面,在登录页处理
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router

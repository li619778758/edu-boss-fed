/*
 * @Author: liyewen liyewen436@163.com
 * @Date: 2022-09-13 22:53:20
 * @LastEditors: liyewen liyewen436@163.com
 * @LastEditTime: 2022-09-14 17:29:52
 * @FilePath: \大前端P7\第三阶段\edu-boss-fed\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/*
 * @Author: liyewen liyewen436@163.com
 * @Date: 2022-09-13 22:53:20
 * @LastEditors: liyewen liyewen436@163.com
 * @LastEditTime: 2022-09-14 23:29:00
 * @FilePath: \大前端P7\第三阶段\edu-boss-fed\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        // 配置全局样式变量这样不用每个vue组件内引用了prependData
        additionalData: '@import \'~@/styles/common.scss\';'
      }
    }
  },
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagounews.com',
        changeOrigin: true
      },
      '/front': {
        target: 'http://eduboss.lagounews.com',
        changeOrigin: true
      }
    }
  }
})

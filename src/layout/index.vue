<!--
 * @Author: liyewen liyewen436@163.com
 * @Date: 2022-09-14 21:17:42
 * @LastEditors: liyewen liyewen436@163.com
 * @LastEditTime: 2022-09-15 00:01:11
 * @FilePath: \大前端P7\第三阶段\edu-boss-fed\src\layout\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-container>
    <el-aside width="200px">
      <appAside />
    </el-aside>
    <el-container>
      <el-header>
        <appHeader />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import appAside from './components/app-aside.vue'

import appHeader from './components/app-header.vue'
export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    appAside,
    appHeader
  }
})
</script>

<style lang="scss" scoped>
.el-aside {
  min-height: 100vh;
  background: rgb(84, 92, 100);
}

.el-header {
  display: flex;
  justify-items: center;

}
</style>

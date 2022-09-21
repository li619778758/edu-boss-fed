<!--
 * @Author: liyewen liyewen436@163.com
 * @Date: 2022-09-14 16:27:22
 * @LastEditors: liyewen liyewen436@163.com
 * @LastEditTime: 2022-09-14 17:27:19
 * @FilePath: \大前端P7\第三阶段\edu-boss-fed\src\views\menu\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({name: 'menu-create'})">添加菜单</el-button>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>

  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getMenu } from '@/services/create-menu'
export default Vue.extend({
  name: 'menuIndex',
  created () {
    this.getAllMenu()
  },
  methods: {
    async getAllMenu () {
      const { data } = await getMenu()
    }
  }
})

</script>
<style lang="scss" scoped>

</style>

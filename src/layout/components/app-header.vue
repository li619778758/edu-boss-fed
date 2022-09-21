<!--
 * @Author: liyewen liyewen436@163.com
 * @Date: 2022-09-14 23:49:52
 * @LastEditors: liyewen liyewen436@163.com
 * @LastEditTime: 2022-09-14 23:54:16
 * @FilePath: \大前端P7\第三阶段\edu-boss-fed\src\layout\components\app-header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="appHeader">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="demo-basic--circle">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar shape="square" :size="50"
            :src="userInfo.portrait || (`https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png`)">
          </el-avatar>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
          <el-dropdown-item @click.native="outLogin" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { getInfo } from '@/services/user'
import Vue from 'vue'
// import store from '@/store'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userInfo: {
        portrait: '',
        userName: ''
      }
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getInfo()
      this.userInfo = data.content
    },
    outLogin () {
      this.$confirm('此操作将推出此账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
})
</script>
<style lang="scss" scoped>
.appHeader {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.el-dropdown-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

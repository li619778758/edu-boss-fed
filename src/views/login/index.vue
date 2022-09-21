<template>
  <div class="login">
    <el-form class="loginForm" ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" type="primary" :loading="isLoginLoading" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'loginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.isLoginLoading = true
        // 表单验证
        await (this.$refs.form as Form).validate()
        // 请求接口
        // axios 默认发送的是 application/json 格式的数据
        const { data } = await login(this.form)
        // 失败
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 使用 vuex 记录登录状态使各个组件都能访问到
          this.$store.commit('setUser', data.content)
          // 使用路由拦截器实现访问控制
          this.$message.success('登录成功')
          // 可能是路由守卫限制的路由，登录后需要继续跳转
          console.log(this.$route.query.redirect)
          this.$router.push(this.$route.query.redirect as string || '/')
        }
        // 成功
      } catch (err) {
        console.log(err)
      }
      this.isLoginLoading = false
    }
  }
})

</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;

  .loginForm {
    height: 350px;
    width: 300px;
    border-radius: 5px;
    background-color: white;
    padding: 20px;

    .loginBtn {
      width: 100%;
    }
  }
}
</style>

import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import qs from 'qs'
import router from '@/router'
const request = axios.create({
  // 请求拦截器

  // 响应拦截器
})

function redirectiveLogin () {
  router.push({
    name: 'login',
    query: {
      redirective: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'GET',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}
// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.access_token && config.headers) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
let isRefreshing = false // 控制刷新token状态
let requests:any[] = []
request.interceptors.response.use(function (response) { // 2xx开头的状态码
  return response
}, async function (error) { // 超出2XX开头的状态码
  if (error.response) { // 请求发出去收到响应但是状态码超出了2xx范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效 没有提供token或token国企
      // 如果有 refresh_token 则尝试使用 refresh_token 获取新的access_token
      // 成功了把本次失败的请求重新发出去
      // 失败了跳转登录页重新登录获取新的 token
      // 如果没有则直接跳转登录页
      // 尝试刷新 token
      // 这里稍后处理 并发 都401 会导致本只能用一次的refresh_token被多次使用报错
      if (!store.state.user) {
        redirectiveLogin()
        return Promise.reject(error)
      }
      if (!isRefreshing) {
        isRefreshing = true
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 token 失效')
          }
          // 刷新 token 后执行队列中请求
          requests.forEach((cb) => cb())
          requests = []
          store.commit('setUser', res.data.content)
          return request(error.config)
        }).catch(error => {
          store.commit('setUser', null)
          redirectiveLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false
        })
      }
      return new Promise(resolve => {
        requests.push(() => {
          resolve(error.config)
        })
      })
      // try {
      //   const { data } = await axios.create()({
      //     method: 'GET',
      //     url: '/front/user/refresh_token',
      //     data: qs.stringify({
      //       refreshtoken: store.state.user.refresh_token
      //     })
      //   })
      //   成功后把失败的请求重新发出去
      //   把刷新拿到的 access_token 更新到容器中和本地存储中
      //   store.commit('setUser', data.content)
      //   return request(error.config)
      // } catch (err) {
      //   store.commit('setUser', null)
      //   redirectiveLogin()
      //   return Promise.reject(error)
      // }
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应

  } else { // 在设置请求时发生了一些事情，触发了一个错误

  }
  // 把请求失败的错误对象继续抛出，仍给下一个上一个调用者
  return Promise.reject(error)
})

export default request

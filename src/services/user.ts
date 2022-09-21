import request from '@/utils/request'
import qs from 'qs'
import store from '@/store'
interface user {
  phone: 'string',
  password: 'string'
}

export const login = (data: user) => request({
  method: 'POST',
  /* 如果 data 是普通对象，则 Content-Type 是 application/json
  如果 data 是qs.stringify(data) 转换之后的数据： key=values$key=value,
  则 Content-Type 会被设置为 application/x-www-form-urlencoded
  如果 data 是FormData 对象，则 Content-Type 是 multipart/form-data */
  data: qs.stringify(data),
  url: '/front/user/login',
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
})
export const getInfo = () => request({
  method: 'GET',
  url: '/front/user/getInfo'
  // 这里请求头信息 可以在 请求拦截器 进行处理
  // headers: { Authorization: store.state.user.access_token }
})

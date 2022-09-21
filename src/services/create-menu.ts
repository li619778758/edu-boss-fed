import request from '@/utils/request'

export const createOrUpdateMenu = (data:any) => request({
  method: 'POST',
  url: '/boss/menu/saveOrUpdate',
  data
})

export const getMenu = () => request({
  method: 'POST',
  url: '/boss/permission/getUserPermissions'
})

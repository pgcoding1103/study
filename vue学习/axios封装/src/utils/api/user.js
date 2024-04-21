// import { request } from '../api/request'
import { request } from './_request'
export function login(params) {
  return request({
    url: '/login',
    method: 'get',
    params
  }).then(res => {
    localStorage.setItem('token', res.data.token)
    console.log(res)
  })
}
export function getUserInfo(id) {
  return request({
    url: `/user/${id}`,
    method: 'get'
  }).then(res => {
    console.log(res)
  })
}

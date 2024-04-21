import axios from 'axios'
import md5 from 'blueimp-md5'
import globalConfig from '../global.config'
const request = axios.create({
  baseURL: globalConfig.baseURL,
  timeout: globalConfig.timeOut
})
request.interceptors.request.use(
  config => {
    const withTokenList = globalConfig.withTokenList
    const key = globalConfig.secretId
    const hash = md5(`Bearer ${localStorage.getItem('token')}`, key)
    //判断是否需要携带token
    if (withTokenList.find(route => new RegExp('/user*', 'g').test(route))) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem(
        'token'
      )}`
      config.headers['hashToken'] = hash
    }

    return config
  },
  err => {
    console.log(err)
  }
)
request.interceptors.response.use(
  response => {
    const code = response.data.code
    const message = response.data.message || '未知错误'
    const _alert = response.data.alert
    if (_alert) {
      alert(`code:${code},message:${message}`)
    }
    return response
  },
  err => {
    console.log(err)
  }
)
export default request

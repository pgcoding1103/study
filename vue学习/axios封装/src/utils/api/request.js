import request from '../axios'
import { ref } from 'vue'
let count = ref(0)
const myrequest = (function () {
  let requestList = []
  let cache = new Map()
  return config => {
    if (cache.has(config.url)) {
      return Promise.resolve(cache.get(config.url))
    }
    if (requestList.includes(config.url)) {
      return Promise.reject('请求中，请勿重复请求')
    }
    requestList.push(config.url)
    return request(config).then(res => {
      count.value++
      //定时删除缓存
      setTimeout(() => {
        cache.delete(config.url)
      }, 20000)
      cache.set(config.url, res)
      requestList = requestList.filter(request => request !== config.url)
      return res
    })
  }
})()

export { myrequest as request, count }

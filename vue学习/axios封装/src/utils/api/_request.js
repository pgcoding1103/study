//代码优化
import request from '../axios'
import { ref } from 'vue'
const count = ref(0)
const myrequest = (function () {
  let cacheMap = new Map()
  let requestList = []
  return config => {
    let promise = Promise.resolve()
    function cache() {
      console.log(111)
      if (cacheMap.has(config.url)) {
        return cacheMap.get(config.url)
      }
    }
    function noRepeat() {
      console.log(222)
      if (requestList.includes(config.url)) {
        return Promise.reject('该请求进行中，请勿重复请求')
      }
    }
    function sendRequest() {
      console.log(333)
      count.value++
      requestList.push(config.url)
      return request(config)
    }
    function finalHandle(res) {
      console.log(444)
      //   cacheMap.set(config.url, res)
      requestList = requestList.filter(item => item != config.url)
      return res
    }
    //执行队列
    let runList = [cache, noRepeat, sendRequest, finalHandle]
    runList.forEach(fn => {
      promise = promise.then(fn)
    })
    return promise
  }
})()
export { myrequest as request, count }

# axios 封装

**注意点**
promise 中的 then 里对应的回调如果返回的是 promise，then 最后返回的 promise 状态和参数将取决于该返回的 promise

**基本封装思路**

1. 根据基本参数封装（baseUrl、timeout、headers...）
2. 对请求拦截器、响应拦截器进行封装（请求拦截器就可根据请求路径匹配是否携带 token、响应拦截器可根据返回的数据进行统一的弹窗展示 **或** 统一的错误处理...）
3. 根据业务进行封装，如登录（login({username,password})）、获取用户信息 getUserInfo(userId),之后调用方法传个参就可以直接获取数据

**拓展封装**
**代码优化**
对于封装思路 2：

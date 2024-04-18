# vue 权限控制

**注意点**：

- 路由守卫前判断是否需要添加路由，需要则进行添加，一是防止之后的 to.matched 时路由规则并不是最新的，二是解决刷新后 store 路由规则丢失，减少发送请求
- 退出登录后除了清空 store、localStorage 非默认路由值，要记得对 router 的路由进行删除
- vite 中使用 await import() 或 import.meta.glob 动态引入路由规则
  > 参考：https://cn.vitejs.dev/guide/features#dynamic-import

**路由守卫逻辑**

- **if** store 非默认权限路由为空 && loacalStorage 中有保存的路由规则？是的话，进行添加
- **if** 登录了&&前往登录页？是的话，跳转首页
- **else if** 是否路由没有匹配项？是的话，跳转到原来页
- **else** 无其他特殊情况，直接 next()

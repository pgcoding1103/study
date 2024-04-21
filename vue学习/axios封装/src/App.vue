<script setup>
  import { login, getUserInfo } from './utils/api/user'
  import { ref } from 'vue'
  // import { count } from './utils/api/request'
  import { count } from './utils/api/_request'

  const username = ref('')
  const password = ref('')

  // request.get('/user/24419').then(res => {
  //   console.log(res)
  // })
</script>
<template>
  <div class="my-div">
    <h1>axios封装测试</h1>
    <h2>已发送请求次数：{{ count }}</h2>
    账号<input class="my-input" type="text" v-model="username" /> 密码<input
      class="my-input"
      type="password"
      v-model="password"
    />
    <button class="my-btn" @click="login({ username, password })">登录</button>
    <button class="my-btn" @click="getUserInfo(24419)">获取用户信息</button>
  </div>
</template>
<style scoped></style>

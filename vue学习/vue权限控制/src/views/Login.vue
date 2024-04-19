<script setup>
  import axios from 'axios'
  import { usePermission } from '../store'
  import { ref } from 'vue'
  import router from '../router'
  const username = ref('')
  const password = ref('')
  const { addRoutes } = usePermission()
  async function login() {
    const { token } = await axios
      .get('http://127.0.0.1:3000/login', {
        params: {
          username: username.value,
          password: password.value
        }
      })
      .then(res => res.data)
    const { routes } = await axios
      .get('http://127.0.0.1:3000/routes', {
        params: {
          token
        }
      })
      .then(res => res.data)

    addRoutes(routes)
    localStorage.setItem('token', token)
    router.push('/home')
  }
</script>
<template>
  <div class="my-div">
    账号<input class="my-input" type="text" v-model="username" /> 密码<input
      class="my-input"
      type="password"
      v-model="password"
    />
    <button class="my-btn" @click="login">登录</button>
  </div>
</template>
<style scoped></style>

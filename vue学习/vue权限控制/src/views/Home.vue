<script setup>
  import { usePermission } from '../store'
  const { allRoutes, clearRoutes } = usePermission()
  function logout() {
    localStorage.removeItem('token')
    clearRoutes()
  }
</script>
<template>
  <div class="my-div">
    <h1>这是首页</h1>
    <button class="my-btn" @click="logout">退出登录</button>
    <template v-for="route in allRoutes" :key="route">
      <router-link class="my-btn" :to="route.path">{{
        route.name
      }}</router-link>
    </template>
  </div>
</template>
<style scoped></style>

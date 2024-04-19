import { createRouter, createWebHashHistory } from 'vue-router'
import { usePermission } from '../store'
// import { getPermissionRoutes } from '../utils/routes'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { permissRoutes, addRoutes } = usePermission()
  const token = localStorage.getItem('token')
  const routes = JSON.parse(localStorage.getItem('routes'))
  //补充路由
  if (routes && permissRoutes.length === 0) await addRoutes(routes)
  //守卫导航
  if (token && to.path == '/login') {
    next('/home')
  } else if (to.matched.length === 0) {
    next(from.path)
  } else {
    next()
  }
})
export default router

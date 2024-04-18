import router from '../router'
import { defineStore } from 'pinia'

export const usePermission = defineStore('permission', {
  state: () => ({
    defaultRoutes: [...router.getRoutes().filter(route => route.path !== '/')],
    permissRoutes: []
  }),
  getters: {
    allRoutes() {
      return this.defaultRoutes.concat(this.permissRoutes)
    }
  },
  actions: {
    async addRoutes(routes) {
      const _routes = await this.formatRoutes(routes)
      this.permissRoutes.push(..._routes)
      this.permissRoutes.forEach(route => {
        router.addRoute(route)
      })
      console.log(router.getRoutes())
      localStorage.setItem('routes', JSON.stringify(this.permissRoutes))
    },
    formatRoutes(routes) {
      return Promise.all(
        routes.map(async route => {
          //1. const allComponents = await import.meta.glob('../views/*.vue')
          const _com = await import(`../views/${route.name}.vue`)
          route.component = _com.default
          return route
        })
      )
    },
    clearRoutes() {
      this.permissRoutes.forEach(route => {
        router.removeRoute(route.name)
      })
      this.permissRoutes = []
      localStorage.removeItem('routes')
      router.push('/login')
    }
  }
})

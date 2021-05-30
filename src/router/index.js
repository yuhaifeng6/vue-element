import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    component: ()=>import("@/views/Login/login")
  },
  {
    path: "*",
    name: "404",
    component: ()=>import("@/views/404/index")
  }
]

const router = new VueRouter({
  routes
})

export default router

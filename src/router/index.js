import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
      path: "/",
      component: ()=>import("@/views/main.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: ()=>import("@/views/Home/home")
        },
        {
          path: "/video",
          name: "video",
          component: ()=>import("@/views/VideoManage/videoManage")
        },
        {
          path: "/user",
          name: "user",
          component: ()=>import("@/views/UserManage/userManage")
        },
        {
          path: "/page1",
          name: "page1",
          component: ()=>import("@/views/Other/pageOne")
        },
        {
          path: "/page2",
          name: "page2",
          component: ()=>import("@/views/Other/pageTwo")
        }
      ]
    }
]

const router = new VueRouter({
  routes
})

export default router

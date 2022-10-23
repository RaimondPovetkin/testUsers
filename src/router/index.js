import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/auth/LoginPage";

Vue.use(VueRouter)
let router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/',
      name: 'login',
      component: LoginPage
    }
  ]
})

export default router

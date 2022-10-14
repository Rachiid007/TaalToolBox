import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import CardView from '../views/CardView.vue'
import ConReg from '../views/ConReg.vue'
import Login from '../views/Login.vue'
import SignIn from '../views/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MapView
    },
    {
      path: '/cards',
      name: 'cards',
      component: CardView
    },
    {
      path: '/conReg',
      name: 'login',
      component: ConReg
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn
    }
  ]
})

export default router

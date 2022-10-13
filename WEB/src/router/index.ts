import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import MapView from '@/views/MapView.vue'
import CardView from '@/views/CardView.vue'
import CardNumberSelector from '@/views/CardNumberSelector.vue'
import HomeView from '@/views/HomeView.vue'
import addCardExcelView from '@/views/add-card/addCardExcelView.vue'
import addCardFormView from '@/views/add-card/addCardFormView.vue'
import choiceHowToAddCardView from '@/views/add-card/choiceHowToAddCardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/map',
      name: 'mainHome',
      component: MapView
    },
    {
      path: '/cards',
      name: 'cards',
      component: CardView
    },
    {
      path: '/CardNumberSelector',
      name: 'CardNumberSelector',
      component: CardNumberSelector
    },
    {
      path: '/add-card',
      name: 'add-card',
      component: choiceHowToAddCardView
    },
    {
      path: '/add-card/excel',
      name: 'add-card-excel',
      component: addCardExcelView
    },
    {
      path: '/add-card/form',
      name: 'add-card-form',
      component: addCardFormView
    }
  ]
})

export default router

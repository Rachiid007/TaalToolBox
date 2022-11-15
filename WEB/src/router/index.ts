import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import MapView from '@/views/MapView.vue'
import CardView from '@/views/CardView.vue'
import CardNumberSelector from '@/views/CardNumberSelector.vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import addCardExcelView from '@/views/add-card/addCardExcelView.vue'
import addCardFormView from '@/views/add-card/addCardFormView.vue'
import choiceHowToAddCardView from '@/views/add-card/choiceHowToAddCardView.vue'
import choiceHowToAddUserView from '@/views/add-user/choiceHowToAddUser.vue'
import ChooseActivities from '@/views/chooseActivities/MultipleActivities.vue'
import DadTestView from '@/views/DadTestView.vue'
import DadTestTeacherView from '@/views/DadTestTeacherView.vue'
import LevelSelectorView from '@/views/DadSelector.vue'
import DadTestMobileView from '@/views/DadTestMobileView.vue'
import Login from '@/views/Login.vue'
import SignIn from '@/views/SignIn.vue'
// import ChooseActivities from '@/views/chooseActivities/MultipleActivities.vue'

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
      path: '/Profile',
      name: 'Profile',
      component: ProfileView
    },
    {
      path: '/add-card',
      name: 'add-card',
      component: choiceHowToAddCardView
    },
    {
      path: '/add-user',
      name: 'add-user',
      component: choiceHowToAddUserView
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
    },
    {
      path: '/chooseActivities',
      name: 'chooseActivities',
      component: ChooseActivities
    },
    {
      path: '/dadtest',
      name: 'dadtest',
      component: DadTestView
    },
    {
      path: '/dadteachertest',
      name: 'dadteachertest',
      component: DadTestTeacherView
    },
    {
      path: '/dadselector',
      name: 'dadlevelselector',
      component: LevelSelectorView
    },
    {
      path: '/dadtestmobile',
      name: 'dadtestmobile',
      component: DadTestMobileView
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
    },
  ]
})

export default router

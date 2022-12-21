import { createRouter, createWebHistory } from 'vue-router'

import MapView from '@/views/MapView.vue'
import CardView from '@/views/CardView.vue'
import CardNumberSelector from '@/views/CardNumberSelector.vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AddCardExcelView from '@/views/add-card/AddCardExcelView.vue'
import AddCardFormView from '@/views/add-card/AddCardFormView.vue'
import ChoiceHowToAddCardView from '@/views/add-card/ChoiceHowToAddCardView.vue'
import ChoiceHowToAddUserView from '@/views/add-user/ChoiceHowToAddUser.vue'
import ChooseActivities from '@/views/chooseActivities/MultipleActivities.vue'
import DadView from '@/views/dad/DadView.vue'
import DadTeacherView from '@/views/dad/DadTeacherView.vue'
import LevelSelectorView from '@/views/dad/DadSelector.vue'
import DadMobileView from '@/views/dad/DadMobileView.vue'
import Login from '@/views/Login.vue'
import SignIn from '@/views/SignIn.vue'
import StartGame from '@/views/StartGameView.vue'
import AddClass from '@/views/Add Class/AddClass.vue'
import InfoLevel from '@/views/Info level/InfoLevel.vue'
import AddUserExcelView from '@/views/add-user/AddUserExcelView.vue'
import Verbalize from '@/views/recognition/VerbalizeView.vue'
import userResponseStats from '@/views/userResponseStats.vue'
import Rgpd from '@/views/RgpdView.vue'
import NotFound from '@/views/NotFound.vue'

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
      path: '/card-number-selector',
      name: 'CardNumberSelector',
      component: CardNumberSelector
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView
    },
    {
      path: '/add-card',
      name: 'add-card',
      component: ChoiceHowToAddCardView
    },
    {
      path: '/add-user',
      name: 'add-user',
      component: ChoiceHowToAddUserView
    },
    {
      path: '/add-user/excel',
      name: 'add-user-excel',
      component: AddUserExcelView
    },
    {
      path: '/add-card/excel',
      name: 'add-card-excel',
      component: AddCardExcelView
    },
    {
      path: '/add-card/form',
      name: 'add-card-form',
      component: AddCardFormView
    },
    {
      path: '/choose-activities',
      name: 'chooseActivities',
      component: ChooseActivities
    },
    {
      path: '/dad',
      name: 'dad',
      component: DadView
    },
    {
      path: '/dad-teacher',
      name: 'dadteacher',
      component: DadTeacherView
    },
    {
      path: '/dad-selector',
      name: 'dadlevelselector',
      component: LevelSelectorView
    },
    {
      path: '/dad-mobile',
      name: 'dadmobile',
      component: DadMobileView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/start-game',
      name: 'startGame',
      component: StartGame
    },
    {
      path: '/add-class',
      name: 'addClass',
      component: AddClass
    },
    {
      path: '/info-level',
      name: 'infoLevel',
      component: InfoLevel
    },
    {
      path: '/verbalize',
      name: 'Verbalize',
      component: Verbalize
    },
    {
      path: '/user-response-stats',
      name: 'userResponseStats',
      component: userResponseStats
    },
    {
      path: '/rgpd',
      name: 'rgpd',
      component: Rgpd
    },
    //Catch All / 404 Route Not Found Page
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFound
    }
  ]
})

export default router

import { reactive } from 'vue'
import { defineStore } from 'pinia'
import loginService from '@/services/loginService'
import type User from '@/types/user'
import { useArrayEvery } from '@vueuse/shared'
// import localforage from 'localforage'

export const useUserStore = defineStore('user', () => {
  let user = reactive<User>({
    name: '',
    surname: '',
    birthdate: '',
    role: [],
    email: '',
    phone: ''
  })
  // const refreshStore = () => {
  if (localStorage.getItem('user')) {
    const userStorage = localStorage.getItem('user')
    user = JSON.parse(userStorage)
  }
  // }
  const getUser = async (email: string, password: string) => {
    const userRequest = await loginService.getUsers(email, password).catch((err) => {
      console.log(err)
    })
    if (userRequest) {
      console.log(userRequest.data)
      return userRequest.data
    }
  }
  return {
    user,
    getUser
  }
})

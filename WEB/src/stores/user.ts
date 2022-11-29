import {ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import loginService from '@/services/loginService'
import type User from '@/types/user'
import { useArrayEvery } from '@vueuse/shared'
// import localforage from 'localforage'

export const useUserStore = defineStore('user', () => {
  let user = reactive<User>({
    id: 1,
    name: '',
    surname: '',
    birthdate: '',
    role: [],
    email: '',
    phone: ''
  })
  // const refreshStore = () => {
  if (localStorage.getItem('user')) {
    const userStorage:any = localStorage.getItem('user')
    if (JSON.parse(userStorage)) {
      user = JSON.parse(userStorage)
    }
  }
  // }
  const getUser = async (email: string, password: string) => {
    const userRequest = await loginService.getUsers(email, password).catch((err) => {
      console.log(err)
    })
    if (userRequest.data) {
      return userRequest.data
    }
  }
  return {
    user,
    getUser
  }
})

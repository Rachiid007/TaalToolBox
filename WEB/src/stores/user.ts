import { defineStore } from 'pinia'
import loginService from '@/services/loginService'

export const useUserStore = defineStore('user', () => {
  const getUser = async (email: string, password: string) => {
    console.log(email, password)
    return await loginService.getUsers(email, password).catch((err) => {
      console.log(err)
    })
  }
  return {
    getUser
  }
})

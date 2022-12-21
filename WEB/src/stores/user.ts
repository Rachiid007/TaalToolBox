import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import loginService from '@/services/loginService'
import type { User, UserFormData } from '@/types/user'
import UserService from '@/services/UserService'

export const useUserStore = defineStore('user', () => {
  let userReward = ref<number>(0)
  let user = reactive<User>({
    id: 1,
    name: '',
    surname: '',
    birthdate: '',
    role: [],
    email: '',
    schoolEmail: '',
    schoolClass: [],
    school: '',
    sex: ''
  })
  // const refreshStore = () => {
  if (localStorage.getItem('user')) {
    const userStorage: any = localStorage.getItem('user')
    if (JSON.parse(userStorage)) {
      user = JSON.parse(userStorage)
    }
  }
  // }
  const getUser = async (email: string, password: string) => {
    const userRequest = await loginService.getUsers(email, password).catch((err) => {
      // console.log(err)
      // console.log(err.response.status)
      if (err.response.status == 404) {
        return 'NotFound'
      } else if (err.response.status == 500) {
        return 'InternalError'
      }
    })
    if (userRequest.data) {
      return userRequest.data
    }
  }

  const setReward = (reward: number) => {
    userReward.value = reward
  }

  const postListUsers = async (users: UserFormData[]) => {
    const userRequest = await UserService.createUsers(users)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
    return userRequest
  }

  const getUserScore = async () => {
    await UserService.getScore(user.email)
      .then((res) => {
        console.log(res)
        userReward.value = res.data.score
      })
      .catch((err) => {
        console.log(err)
        return err
      })
    return userReward.value
  }

  const addScoreToUser = async (quantity: number) => {
    await UserService.addScore(user.email, quantity)
      .then((res) => {
        console.log(res)
        userReward.value = res.data
      })
      .catch((err) => {
        console.log(err)
        return err
      })
    return 'score added !'
  }

  return {
    user,
    userReward,
    setReward,
    getUser,
    postListUsers,
    getUserScore,
    addScoreToUser
  }
})

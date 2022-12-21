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
    sex: '',
    accessToken: ''
  })
  // const refreshStore = () => {
  // if (localStorage.getItem('user')) {
  //   const userStorage: any = localStorage.getItem('user')
  //   if (JSON.parse(userStorage)) {
  //     user = JSON.parse(userStorage)
  //   }
  // }
  // }
  const getProtected = async () => {
    await loginService.getProtected().catch((err) => {
      console.error(err)
    })
  }
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

    // $cookies.get("sessionId")
    // window.sessionStorage.sessionId = userRequest.body.sessionId
    console.log(userRequest)
    if (userRequest.data) {
      window.sessionStorage['x-xsrf-token'] = userRequest.data.xsrfToken
      return true
      // return userRequest.data
    }
    return false
  }

  const getUserScope = async () => {
    const roleRequest = await UserService.getUserScope().catch((err) => {
      console.error(err)
    })
    if (roleRequest === undefined) {
      return ''
    } else if (roleRequest.data) {
      return roleRequest.data
    }
    return ''
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
  const checkUserAcess = async () => {
    if (window.sessionStorage.getItem('x-xsrf-token')) {
      const userScope = await getUserScope()
      if (!userScope) {
        window.location.pathname = import.meta.env.VITE_LOGIN_ROUTE
      } else {
      }
    } else {
      window.location.pathname = import.meta.env.VITE_LOGIN_ROUTE
    }
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
  const checkUserAccessAndRole = async (role: string[]) => {
    if (window.sessionStorage.getItem('x-xsrf-token')) {
      const userScope = await useUserStore().getUserScope()
      if (!userScope) {
        window.location.pathname = import.meta.env.VITE_LOGIN_ROUTE
      }
      // Si l'utilisateur n'a pas les permissions ['Administrateur', 'Créateur']
      else if (!role.some((x) => userScope.role.includes(x))) {
        window.location.pathname = import.meta.env.VITE_LOGIN_ROUTE
      }
    } else {
      window.location.pathname = import.meta.env.VITE_LOGIN_ROUTE
    }
  }

  const checkUserAccessAndReturnUser = async () => {
    if (window.sessionStorage.getItem('x-xsrf-token')) {
      const userScope = await useUserStore().getUserScope()
      if (!userScope) {
        window.location.pathname = import.meta.env.VITE_LOGIN_ROUTE
      } else if (userScope && userScope.role.length) {
        return userScope
      }
    } else {
      window.location.pathname = import.meta.env.VITE_LOGIN_ROUTE
    }
  }
  const checkUserAccessAndRoleAndReturnUser = async (role: string[]) => {
    if (window.sessionStorage.getItem('x-xsrf-token')) {
      const userScope = await useUserStore().getUserScope()
      if (!userScope) {
        window.location.pathname = import.meta.env.VITE_LOGIN_ROUTE
      }
      // Si l'utilisateur n'a pas les permissions ['Administrateur', 'Créateur']
      else if (role.some((x) => userScope.role.includes(x))) {
        return userScope
      }
    } else {
      window.location.pathname = import.meta.env.VITE_LOGIN_ROUTE
    }
  }
  const logout = async () => {
    const logoutRequest = await loginService.logout().catch((err) => {
      console.log('logout error', err)
    })
  }

  return {
    user,
    userReward,
    setReward,
    getUser,
    postListUsers,
    getUserScore,
    addScoreToUser,
    getProtected,
    getUserScope,
    logout,
    checkUserAccessAndRole,
    checkUserAcess,
    checkUserAccessAndReturnUser,
    checkUserAccessAndRoleAndReturnUser
  }
})

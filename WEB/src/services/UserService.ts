import { apiClient, apiClientWithCredential } from './apiClient'
import type { UserFormData } from '@/types/user'

export default {
  async createUsers(payload: UserFormData[]) {
    // console.log(payload)
    return apiClientWithCredential.post('/users/excel', payload)
  },
  async getScore(email: string) {
    return await apiClient.get('/users/score', {
      params: {
        email: email
      }
    })
  },
  async addScore(email: string, quantity: number) {
    console.log(quantity, email)
    return await apiClient.post('/users/score', {
      email: email,
      numberToAdd: quantity
    })
  },

  getUserScope() {
    return apiClientWithCredential.get('/users/role')
  }
}

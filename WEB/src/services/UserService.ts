import { apiClient } from './apiClient'
import type { UserFormData } from '@/types/user'

export default {
  async createUsers(payload: UserFormData[]) {
    // console.log(payload)
    return apiClient.post('/users/excel', payload)
  }
}

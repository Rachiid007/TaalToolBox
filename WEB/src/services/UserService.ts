import { apiClient } from './apiClient'
import type { UserFromExcelFile } from '@/types/user'

export default {
  async createUsers(users: UserFromExcelFile[]) {
    return apiClient.post('/users/excel', users)
  }
}

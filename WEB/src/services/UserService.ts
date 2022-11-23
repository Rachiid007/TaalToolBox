import { apiClient } from './apiClient'
import type User from '@/types/user'

export default {
  postUsers(users: User[]) {
    return apiClient.post('/users', users)
  },
  getUsers() {
    return apiClient.get('/users')
  }
}

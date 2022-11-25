import { apiClient } from './apiClient'

export default {
  getRole() {
    return apiClient.get('/role')
  },
}

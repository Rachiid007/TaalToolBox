import { apiClient } from './apiClient'

export default {
  getUsers(email: string, password: string) {
    console.log('inside the service', email, password)
    return apiClient.get(`/users`, {
      params: {
        email: email,
        password: password
      }
    })
  }
}

import type { UserFormData } from './../types/user'
import { apiClient } from './apiClient'

export default {
  getUsers(email: string, password: string) {
    return apiClient.get(`/users`, {
      params: {
        email: email,
        password: password
      }
    })
  },
  setUsers(payload: UserFormData) {
    // TODO THE PASSWORD NEED TO BE HASH -- IF THE ATTACKER GET THE HASH HE CAN COMPRIMISED DATABASE
    console.log(payload)
    return apiClient.post('/users', payload)
  }
}

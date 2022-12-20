import type { UserFormData } from './../types/user'
import { apiClientWithCredential, apiClient } from './apiClient'

export default {
  getUsers(email: string, password: string) {
    return apiClientWithCredential.post(`/auth/login`, {
      email,
      password
    })
  },
  getProtected() {
    console.log('inside getprotected')
    return apiClientWithCredential.post(`/protected`)
  },
  setUsers(payload: UserFormData) {
    // TODO THE PASSWORD NEED TO BE HASH -- IF THE ATTACKER GET THE HASH HE CAN COMPRIMISED DATABASE
    return apiClient.post('/users', payload)
  },
  // Route pour la suppression du cookie utilisateur
  logout() {
    return apiClientWithCredential.post(`/logout`)
  }
}

import { apiClient, apiClientForm } from './apiClient'

interface UserFromExcel {
  firstName: string | null
  lastName: string | null
  email: string | null
  birthDate: string | null
  classes: string | null
  registrationDate: string | null
}

export default {
  postUsers(users: UserFromExcel[]) {
    return apiClient.post('/users', users)
  },
  getUsers() {
    return apiClient.get('/users')
  }
}

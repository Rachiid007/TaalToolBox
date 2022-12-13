import { apiClient } from './apiClient'
import type User from '@/types/user'

export default {
  async getUsers(): Promise<User[]> {
    const { data } = await apiClient.get('/users')
    return data
  },
  async getUser(id: number): Promise<User> {
    const { data } = await apiClient.get(`/users/${id}`)
    return data
  },
  async createUser(user: User): Promise<User> {
    const { data } = await apiClient.post('/users', user)
    return data
  },
  // async updateUser(user: User): Promise<User> {
  //   const { data } = await apiClient.put(`/users/${user.id}`, user)
  //   return data
  // },
  async deleteUser(id: number): Promise<User> {
    const { data } = await apiClient.delete(`/users/${id}`)
    return data
  },
  // send a list of users to the server to be created
  async createUsers(users: User[]): Promise<User[]> {
    const { data } = await apiClient.post('/users/bulk', users)
    return data
  }
}

import { apiClient } from './apiClient'

export default {
  getRole() {
    return apiClient.get('/role')
  },
  getCardTheme() {
    return apiClient.get('/cards-theme')
  },
  getDifficultyLevel() {
    return apiClient.get('/level-difficulty')
  },
  getActivities() {
    return apiClient.get('/activity')
  }
}

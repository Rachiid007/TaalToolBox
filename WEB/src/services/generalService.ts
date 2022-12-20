import { apiClient, apiWithToken, apiClientWithCredential } from './apiClient'

export default {
  // Ces routes ont besoin d'une connexion de l'utilisateur
  getRole() {
    return apiClient.get('/role')
  },
  getCardTheme() {
    // return apiWithToken(userObj.accessToken)
    return apiClient.get('/cards-theme')
  },
  getDifficultyLevel(){
    return apiClient.get('/level-difficulty')
  },
  getActivities(){
    return apiClient.get('/activity')
  }
}

import { apiClient, apiClientForm } from './apiClient'

export default {
  getActivity() {
    return apiClient.get('/activity')
  }
}
   
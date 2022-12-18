import { apiClient, apiClientForm } from './apiClient'
import { useUserStore } from '@/stores/user'

//const store = useUserStore()

export default class statsServiceRessource{
[x: string]: any
  getSubscriptionStats() {
    const stats=apiClient.get('/users/subscription_stats/1')
    return stats //+store.user.id
  }
  getActivePlayersStats() {
    const stats=apiClient.get('/users/activePlayers/1')
    return stats //+store.user.id
  }

  findSchoolResponseStats() {
    const stats=apiClient.get('/user-response/schoolClassStats/1')
    //console.log(stats)
    return stats //+store.user.id
  }

  findUsersResponseStats() {
    const stats=apiClient.get('/user-response/userStats/1')
    //console.log(stats)
    return stats //+store.user.id
  }
}
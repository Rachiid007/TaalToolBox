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
    console.log("test2")
    const stats=apiClient.get('/users/activePlayers/1')
    //console.log(stats)
    return stats //+store.user.id
  }
}
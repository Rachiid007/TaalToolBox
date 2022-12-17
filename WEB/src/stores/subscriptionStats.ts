import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import type pieConfig from '@/types/pieConfig'
import type subscriptionStats from '@/types/subscriptionStats'
import statsServiceRessource from '@/services/statsService'
import { setActivePinia, createPinia } from 'pinia'

export const usesubscriptionStatsStore = defineStore('stats', () => { 
    //Get subscription stats from API

    const getsubscriptionStats = async () => {
      // Faire une requete en prenant les cartes et leur poids
      console.log('test')
      const statsS = new statsServiceRessource()
      
      const piedata = await statsS.getSubscriptionStats()
      //return a table with data
      return piedata.data
    }
    const options = {
      responsive: true,
      maintainAspectRatio: false
    }
    return {
      getsubscriptionStats
    }
   
  
 

  
})

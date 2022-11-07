import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import weightCardRessource from '@/services/weightCardService'

export const useWeightCardStore = defineStore('weightCard', () => {
  //besoin de modifier les données de la base de données donc faire des appels
  const getWeightCards = async () => {
    // Faire une requete en prenant les cartes et leur poids
    const weightCardService = new weightCardRessource()
    const weightCard = await weightCardService.getWeightCard()
    //return a table with data
    return weightCard.data
  }
  const incrementWeightCards = () => {}
  const decrementWeightCards = () => {}
  return {
    getWeightCards
  }
})

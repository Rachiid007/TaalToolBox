import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const remaining = ref(0)
  const setRemaining = (nbrOfCards) => {
    remaining.value = nbrOfCards
  }
  const decrement = () => {
    remaining.value--
  }

  return { remaining, setRemaining, decrement }
})

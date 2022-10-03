import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCardStore = defineStore('card', () => {
  const remaining = ref(0)

  const setRemaining = (nbrOfCards) => {
    remaining.value = nbrOfCards
  }

  const decrement = () => {
    if (remaining.value > 0) {
      remaining.value--
    }
  }

  return { remaining, setRemaining, decrement }
})

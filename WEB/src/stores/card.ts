import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const remaining = ref(5)

  const decrement = () => {
    remaining.value--
  }

  return { remaining, decrement }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const remaining = ref(10)
  const decrement = () => {
    remaining.value--
  }

  return { remaining, decrement }
})

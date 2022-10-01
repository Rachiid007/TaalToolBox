import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCardStore = defineStore('card', () => {
  const remaining = ref(30)

  const getters_remaining = computed(() => {})

  const decrement = () => {
    remaining.value--
  }

  return { remaining, decrement }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowStore = defineStore('show', () => {
  const showComponent = ref(false)
  const showAnswer = ref(false)
  const showButtonReveal = ref(true)
  const setShowButtonValidation = (show: boolean) => {
    showComponent.value = show
  }
  const getShowButtonValidation = () => {
    return showComponent.value
  }
  const setShowAnswer = (show: boolean) => {
    showAnswer.value = show
  }
  const getShowAnswer = () => {
    return showAnswer.value
  }
  const setShowButtonReveal = (show: boolean) => {
    showButtonReveal.value = show
  }
  const getShowButtonReveal = () => {
    return showButtonReveal.value
  }

  return {
    setShowButtonValidation,
    getShowButtonValidation,
    setShowAnswer,
    getShowAnswer,
    setShowButtonReveal,
    getShowButtonReveal
  }
})

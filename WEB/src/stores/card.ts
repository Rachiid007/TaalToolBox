import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCardStore = defineStore('card', () => {
  const remaining = ref(0)
  const totalQuestions = ref(0)
  const goodAnswers = ref(0)
  const almostGoodAnswers = ref(0)
  const wrongAnswers = ref(0)
  const goodAnswerPercentage = computed(() => {
    return Math.round((goodAnswers.value / totalQuestions.value) * 100)
  })

  const setRemaining = (nbrOfCards: number) => {
    totalQuestions.value = nbrOfCards
    remaining.value = nbrOfCards
  }

  const decrement = () => {
    if (remaining.value > 0) {
      remaining.value--
    }
  }

  const incrementGoodAnswers = () => {
    goodAnswers.value++
  }

  const incrementAlmostGoodAnswers = () => {
    almostGoodAnswers.value++
  }

  const incrementWrongAnswers = () => {
    wrongAnswers.value++
  }

  return {
    remaining,
    totalQuestions,
    goodAnswers,
    almostGoodAnswers,
    wrongAnswers,
    goodAnswerPercentage,
    setRemaining,
    decrement,
    incrementGoodAnswers,
    incrementAlmostGoodAnswers,
    incrementWrongAnswers
  }
})

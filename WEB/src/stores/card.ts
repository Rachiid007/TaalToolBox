import type Flashcard from '@/types/Flashcard'
import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export const useCardStore = defineStore('card', () => {
  //point management
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

  // ADD CARD FORM

  const flashcardList = reactive([]) as Flashcard[]

  const addFlashcard = (flashcard: Flashcard) => {
    flashcardList.push(flashcard)
  }

  const removeFlashcard = (id: number): void => {
    flashcardList.forEach((flashcard, index) => {
      if (flashcard.id === id) {
        flashcardList.splice(index, 1)
        return
      }

      console.log("PROBLEME D'ID -> carte pas trouvé dans le store")
    })
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
    incrementWrongAnswers,
    addFlashcard,
    flashcardList,
    removeFlashcard
  }
})

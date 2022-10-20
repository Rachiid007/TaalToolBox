import { flashcardsData } from './../data/animalFlashcards'
import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import type Flashcard from '@/types/Flashcard'
import type { Ref } from 'vue'
// const animal = flashcardsData
// console.log(animal)
interface FlashCardData {
  id: number
  question: string
  answer: string
  image: string
  category: string
}

export const useCardStore = defineStore('card', () => {
  const remaining = ref(0)
  const totalQuestions = ref(0)
  const goodAnswers = ref(0)
  const almostGoodAnswers = ref(0)
  const wrongAnswers = ref(0)
  const tableCard = ref<FlashCardData[]>([])
  let actualCard = ref<FlashCardData>({ id: 0, question: '', answer: '', image: '', category: '' }) //{ id: 0, question: '', answer: '', image: '', category: '' }
  const goodAnswerPercentage = computed(() => {
    return Math.round((goodAnswers.value / totalQuestions.value) * 100)
  })
  const setCard = (card: number) => {
    if (totalQuestions.value) {
      for (let i = 0; i < card; i++) {
        tableCard.value.push(flashcardsData[i])
      }
      console.log(tableCard.value)
      // return { tableCard }
    }
  }
  const removeCorrectCard = (card: FlashCardData) => {
    tableCard.value.splice(tableCard.value.indexOf(card), 1)
    console.log(tableCard)
  }
  const setActualCard = (card: FlashCardData) => {
    actualCard.value = card
  }
  const getActualCard = (): FlashCardData => {
    return actualCard.value
  }
  const getCard = () => {
    console.log(tableCard.value)
    return tableCard.value
  }

  // POUR LE NOMBRE DE CARTE RESTANT
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
    console.log(flashcard)
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
    tableCard,
    setRemaining,
    setCard,
    setActualCard,
    getCard,
    getActualCard,
    removeCorrectCard,
    decrement,
    incrementGoodAnswers,
    incrementAlmostGoodAnswers,
    incrementWrongAnswers,
    addFlashcard,
    flashcardList,
    removeFlashcard
  }
})

import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import type Flashcard from '@/types/Flashcard'
import FlashcardService from '@/services/FlashcardService'
import { flashcardsData } from '@/data/animalFlashcards'
export const useCardStore = defineStore('card', () => {
  const remaining = ref(0)
  const totalQuestions = ref(0)
  const goodAnswers = ref(0)
  const almostGoodAnswers = ref(0)
  const wrongAnswers = ref(0)
  const tableCard = reactive<Flashcard[]>([])
  let actualCard = ref<Flashcard>({ id: 0, word: '', translation: '', image: '' }) //{ id: 0, question: '', translation: '', image: '', category: '' }
  const goodAnswerPercentage = computed(() => {
    return Math.round((goodAnswers.value / totalQuestions.value) * 100)
  })
  const setCard = async (card: number) => {
    //get all card in db
    const flashcards = await getCard()

    //Insert necessary number of card
    if (totalQuestions.value) {
      if (flashcards.length > 5) {
        for (let i = 0; i < card; i++) {
          tableCard.push(flashcards[i])
        }
        // return { tableCard }
      } else {
        for (let i = 0; i < card; i++) {
          tableCard.push(flashcardsData[i])
        }
      }
    }
  }
  const removeCorrectCard = (card: Flashcard) => {
    tableCard.splice(tableCard.indexOf(card), 1)
  }
  const setActualCard = (card: Flashcard) => {
    actualCard.value = card
  }
  const getActualCard = (): Flashcard => {
    return actualCard.value
  }
  const getCard = async (): Promise<Flashcard[]> => {
    const flashcardRequest = await FlashcardService.getFlashcards()
    return flashcardRequest.data
  }

  const getCurrentDeck = () => {
    return tableCard
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
    getCurrentDeck,
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

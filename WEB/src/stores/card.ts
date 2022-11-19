import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import type Flashcard from '@/types/Flashcard'
import FlashcardService from '@/services/FlashcardService'
import { flashcardsData } from '@/data/animalFlashcards'

export const useCardStore = defineStore('card', () => {
  const resultGame = reactive({
    totalQuestions: 0,
    goodAnswers: 0,
    almostGoodAnswers: 0,
    wrongAnswers: 0
  })
  const remaining = ref(0)
  const tableCard = reactive<Flashcard[]>([])
  let actualCard = ref<Flashcard>() //{ id: 0, question: '', translation: '', image: '', category: '' }

  const goodAnswerPercentage = computed(() => {
    return Math.round((resultGame.goodAnswers / resultGame.totalQuestions) * 100)
  })

  //Get the required cards
  const getCard = async (cardNumber: number): Promise<Flashcard[]> => {
    const flashcardRequest = await FlashcardService.getFlashcards(cardNumber)
    return flashcardRequest.data
  }

  // prend nombre de card et les melange et les met dans tableCard
  //Take a cardNumber of card in a random position inside the flashcardTable table
  const shuffledCard = (flashcardTable: Flashcard[], cardNumber: number) => {
    // unsort table
    const shuffled = [...flashcardTable].sort(() => 0.5 - Math.random())

    //push card(number) item
    tableCard.push(...shuffled.slice(0, cardNumber))
  }
  const setCard = async (card: number) => {
    //TODO Need to check connexion before getCard in other to go faster

    getCard(card)
      .then((data) => {
        if (resultGame.totalQuestions) {
          //If we have the number of card in DB else take card in front
          data.length >= card ? shuffledCard(data, card) : shuffledCard(flashcardsData, card)
        }
      })
      .catch((err) => {
        // Take card in front or display some message
        shuffledCard(flashcardsData, card)
      })
  }

  // If user choose the correct card remove it to the deck
  const removeCorrectCard = (card: Flashcard) => {
    tableCard.splice(tableCard.indexOf(card), 1)
  }

  const setActualCard = (card: Flashcard) => {
    actualCard.value = card
  }

  const getActualCard = (): Flashcard => {
    return actualCard.value
  }

  const getCurrentDeck = () => {
    return tableCard
  }

  // POUR LE NOMBRE DE CARTE RESTANT
  const setRemaining = (nbrOfCards: number) => {
    resultGame.totalQuestions = nbrOfCards
    remaining.value = nbrOfCards
  }

  const decrement = () => {
    if (remaining.value > 0) {
      remaining.value--
    }
  }

  const incrementGoodAnswers = () => {
    resultGame.goodAnswers
  }

  const incrementAlmostGoodAnswers = () => {
    resultGame.almostGoodAnswers
  }

  const incrementWrongAnswers = () => {
    resultGame.wrongAnswers
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
    })
  }

  return {
    remaining,
    resultGame,
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

import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import type Flashcard from '@/types/Flashcard'
import FlashcardService from '@/services/FlashcardService'
import { flashcardsData } from '@/data/animalFlashcards'
import type User_response from '@/types/user_response'
import userResponseRessource from '@/services/user_ResponseService'
import { useUserStore } from './user'

export const useCardStore = defineStore('card', () => {
  const resultGame = reactive({
    totalQuestions: 0,
    goodAnswers: 0,
    almostGoodAnswers: 0,
    wrongAnswers: 0
  })

  const userStore = useUserStore()

  const tableUserResponse = reactive<User_response[]>([])

  const remaining = ref(0)
  const tableCard = reactive<Flashcard[]>([])
  let actualCard = ref<Flashcard>() //{ id: 0, question: '', translation: '', image: '', category: '' }

  const goodAnswerPercentage = computed(() => {
    return Math.round((resultGame.goodAnswers / resultGame.totalQuestions) * 100)
  })

  //Get athe number of required cards
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
  const removeCorrectCard = (card: Flashcard | undefined) => {
    if (card) {
      tableCard.splice(tableCard.indexOf(card), 1)
    } else {
      console.log('card is undefined')
    }
  }

  // If user choose the correct card remove it to the deck
  const removeAlmostCorrectCard = (card: Flashcard | undefined) => {
    if (card) {
      tableCard.splice(tableCard.indexOf(card), 1)
    } else {
      console.log('card is undefined')
    }
  }

  const setActualCard = (card: Flashcard) => {
    actualCard.value = card
  }

  const getActualCard = (): Flashcard | undefined => {
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

  const resetCounters = () => {
    resultGame.goodAnswers = 0
    resultGame.totalQuestions = 0
    resultGame.wrongAnswers = 0
    resultGame.almostGoodAnswers = 0
    tableUserResponse.splice(0)
  }

  const decrement = () => {
    if (remaining.value > 0) {
      remaining.value--
    }
  }

  // Insertion d'une réponse dans le tabeau des réponses
  const addAnswer = (user_response: User_response) => {
    let obj = []
    const found = tableUserResponse.some((obj) => {
      return obj.id_card === user_response.id_card
    })

    //Ajouter une réponse au tableau des réponses seulement si c est la première tentative
    if (!found) {
      tableUserResponse.push(user_response)
    }
  }

  const postUserResponse = async (userId: number) => {
    //Envoi du tableau des réponses vers le backend
    const user_ResponseService = new userResponseRessource()
    const result = await user_ResponseService.postUserResponse(tableUserResponse, userId)
    return result
  }

  const incrementGoodAnswers = () => {
    resultGame.goodAnswers++
  }

  const incrementAlmostGoodAnswers = () => {
    resultGame.almostGoodAnswers++
  }

  const incrementWrongAnswers = () => {
    resultGame.wrongAnswers++
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
    tableUserResponse,
    tableCard,
    setRemaining,
    resetCounters,
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
    addAnswer,
    removeFlashcard,
    removeAlmostCorrectCard,
    postUserResponse
  }
})

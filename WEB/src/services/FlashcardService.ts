import { apiClient, apiClientForm } from './apiClient'
import { useUserStore } from '@/stores/user'

interface FlashcardForm {
  word: string | null
  translation: string | null
}

interface FlashcardImage {
  id: string
  image: any
}

export default {
  async getFlashcards(nbrcards: number) {
    const store = await useUserStore().getUserScope()
    return apiClient.get('/cards/' + store.id + '/' + nbrcards)
  },

  getFlashcard(id: string) {
    return apiClient.get('/cards/' + id)
  },

  postFlashcard(flashcard: FlashcardForm) {
    // for (var key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1])
    // }

    return apiClient.post('/cards', flashcard)
  },
  // putFlashcard(flashcard: Flashcard) {
  //   return apiClient.put('/cards/' + flashcard.id, flashcard)
  // },
  deleteFlashcard(id: string) {
    return apiClient.delete('/cards/' + id)
  },

  uploadImage(flashcardimage: FlashcardImage) {
    let formData = new FormData()
    formData.append('id', flashcardimage.id)
    formData.append('file', flashcardimage.image)
    return apiClientForm.post('/cards/image', formData)
  }
}

import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

interface Flashcard {
  word: string
  translation: string
  // image: File
}

export default {
  getFlashcards() {
    return apiClient.get('/flashcards')
  },
  getFlashcard(id: string) {
    return apiClient.get('/flashcards/' + id)
  },
  postFlashcard(flashcard: Flashcard) {
    const formData = new FormData()
    formData.append('word', flashcard.word)
    formData.append('translation', flashcard.translation)

    return apiClient.post('/flashcards', flashcard)
  },
  // putFlashcard(flashcard: Flashcard) {
  //   return apiClient.put('/flashcards/' + flashcard.id, flashcard)
  // },
  deleteFlashcard(id: string) {
    return apiClient.delete('/flashcards/' + id)
  },
  uploadImage(image: File) {
    const formData = new FormData()
    formData.append('image', image)
    return apiClient.post('/upload', formData)
  }
}

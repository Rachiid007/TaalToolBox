import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const apiClientForm = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

interface Flashcard {
  word: string
  translation: string
  image: any
}

export default {
  getFlashcards() {
    return apiClient.get('/cards')
  },
  getFlashcard(id: string) {
    return apiClient.get('/cards/' + id)
  },
  postFlashcard(flashcard: Flashcard) {
    // formData.append('file', flashcard.image)

    // for (var key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1])
    // }
    // return axios.post(
    //   'http://localhost:3000/cards',
    //   {
    //     word: flashcard.word,
    //     translation: flashcard.translation
    //   },
    //   { headers: { 'Content-Type': 'Application.json' } }
    // )
    return apiClient.post('/cards', { word: flashcard.word, translation: flashcard.translation })
  },
  // putFlashcard(flashcard: Flashcard) {
  //   return apiClient.put('/cards/' + flashcard.id, flashcard)
  // },
  deleteFlashcard(id: string) {
    return apiClient.delete('/cards/' + id)
  },
  uploadImage(image: File) {
    let formData = new FormData()
    formData.append('file', image)
    return apiClientForm.post('/cards/upload', formData)
  }
}

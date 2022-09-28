import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCards() {
    return apiClient.get('/cards')
  },
  getCard(id) {
    return apiClient.get('/cards/' + id)
  },
  postCard(card) {
    return apiClient.post('/cards', card)
  },
  putCard(card) {
    return apiClient.put('/cards/' + card.id, card)
  },
  deleteCard(id) {
    return apiClient.delete('/cards/' + id)
  }
}

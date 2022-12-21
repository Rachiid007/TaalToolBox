import axios from 'axios'

let apiBaseUrl = 'http://localhost:3000'

if (!import.meta.env.DEV) {
  apiBaseUrl = 'https://taaltoolbox.be/api/'
}

export default axios

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json '
  }
})

export const apiClientForm = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

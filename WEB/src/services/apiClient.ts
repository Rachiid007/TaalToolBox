import axios from 'axios'

let apiBaseUrl = 'http://localhost:3000'

if (!import.meta.env.DEV) {
  apiBaseUrl = 'https://taaltoolbox.be/api/'
}

export default axios

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false
})

export const apiClientWithCredential = axios.create({
  withCredentials: true,
  baseURL: apiBaseUrl,
  headers: {
    'x-xsrf-token': `${window.sessionStorage['x-xsrf-token']}`
  }
})

export const apiClientForm = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Credentials': true
  }
})

// Utiliser pour le route qui necessite une authentification de l'utilisateur
// Faire la requête avec le xsrfToken pour la double authentification(avec le cookie et le xsrfToken)
export const apiWithToken = (token: string) => {
  return axios.create({
    withCredentials: true,
    // baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'Application/json',
      'x-xsrf-token': `${window.sessionStorage['x-xsrf-token']}`
    }
  })
}

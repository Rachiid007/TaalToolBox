import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import user_ResponseRessource from '@/services/user_ResponseService'
import type User_response from '@/types/user_response'


export const useUser_ResponseStore = defineStore('user_response', () => {
  //Envoi des réponses vers le backend (post)
  const postUser_Response = async (tableUserResponse:User_response[], id_user: number) => {
    const user_ResponseService = new user_ResponseRessource()
    const result = await user_ResponseService.postUserResponse(tableUserResponse,id_user)
    //return a table with data
    return result
  }
  return {
   postUser_Response
  }
})
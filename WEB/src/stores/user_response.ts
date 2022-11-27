import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import user_ResponseRessource from '@/services/user_ResponseService'
import type User_response from '@/types/user_response'

//const tableUserResponse = reactive<User_response[]>([])


export const useUser_ResponseStore = defineStore('user_response', () => {
  //besoin de modifier les données de la base de données donc faire des appels
  const postUser_Response = async (tableUserResponse:User_response[], id_user: number) => {
    // Faire une requete en prenant les cartes et leur poids
    const user_ResponseService = new user_ResponseRessource()
    const result = await user_ResponseService.postUserResponse(tableUserResponse,id_user)
    //return a table with data
    return result
  }
  /*const addUser_Response = (user_response: User_response) => {
    
    //check if the card was played before
    console.log("eeeee"+tableUserResponse)

    const found = tableUserResponse.find((obj) => {
      return obj.id_card === user_response.id_card;
    });

    //add to user_response table only if 1st time played
    if (found == undefined) {
      tableUserResponse.push(user_response)
    }
    console.log(tableUserResponse)
  }*/
  return {
    postUser_Response
    //addUser_Response
  }
})
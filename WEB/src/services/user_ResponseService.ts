import type User_response from '@/types/user_response'
import { apiClient } from './apiClient'

export default class user_ResponseRessource {
    postUserResponse(user_response: User_response[],id_user: number) {
        return apiClient.post('/user_response/'+id_user+'/cards',user_response)
    }
}

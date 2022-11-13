import { apiClient, apiClientForm } from './apiClient'

interface DragAndLearn {
  data: []
  imgLink: string
}

export default {
  getDragAndLearn() {
    return apiClient.get(`/draganddrop`)
  },
  postDragAndLearn(newExerciceData: DragAndLearn) {
    return apiClientForm.post('/draganddrop', {
      params: {
        data: newExerciceData.data,
        img: newExerciceData.imgLink
      }
    })
  }
}

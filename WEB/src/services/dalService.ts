import { apiClient, apiClientForm } from './apiClient'

interface DragAndLearn {
  data: []
  imgLink: string
}

export default {
  getDragAndLearn() {
    return apiClient.get(`/drag_and_drop`)
  },
  postDragAndLearn(newExerciceData: DragAndLearn) {
    return apiClientForm.post('/drag_and_drop', {
      params: {
        data: newExerciceData.data,
        img: newExerciceData.imgLink
      }
    })
  }
}

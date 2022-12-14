import { apiClient, apiClientForm } from './apiClient'

interface DragAndLearn {
  leveldata: string
}

export default {
  getDragAndLearn() {
    return apiClient.get(`/drag_and_drop`)
  },
  postDalImage(imageData: File, id: number) {
    let formData = new FormData()
    formData.append('file', imageData)
    formData.append('id', id.toString())
    console.log(formData)
    console.log(imageData, id)
    return apiClientForm.post(`/drag_and_drop/image`, formData)
  },
  async getDragAndLearnExercice(id: number) {
    return await apiClient.get(`/drag_and_drop/levels`, {
      params: {
        id: id
      }
    })
  }
}

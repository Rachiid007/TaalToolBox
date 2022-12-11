import { apiClient, apiClientForm } from './apiClient'

interface DragAndLearn {
  leveldata: string
  levelname: string
  creator: string
}

export default {
  getDragAndLearn() {
    return apiClient.get(`/drag_and_drop`)
  },
  postDragAndLearn(newExerciceData: DragAndLearn) {
    // console.log(newExerciceData)
    return apiClient.post(`/drag_and_drop`, {
      leveldata: newExerciceData.leveldata,
      levelname: newExerciceData.levelname,
      creator: newExerciceData.creator
    })
  },
  postDalImage(imageData: File, id: number) {
    let formData = new FormData()
    formData.append('file', imageData)
    formData.append('id', id.toString())

    return apiClientForm.post(`/drag_and_drop/image`, formData)
  }
}

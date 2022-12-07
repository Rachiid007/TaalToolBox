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
  postDalImage(image: any) {
    return apiClientForm.post(`/drag_and_drop/image`, { params: { image: image } })
  }
}

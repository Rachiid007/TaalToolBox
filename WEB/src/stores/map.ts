import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { LevelMap } from '@/types/map'
import generalService from '@/services/generalService'
import mapService from '@/services/mapService'
export const useMapStore = defineStore('map', () => {
  // Get les level dont on a besoin dans la base de données
  // Enregistrer les level
  const newLevel: LevelMap = reactive({
    name: '',
    description: '',
    address: '',
    position: [],
    activityId: 0,
    difficultyId: 0,
    themeId: 0
  })

  const actualLevelMapId = ref<number>(0)
  const getLevelMap = async () => {
    const levelRequest = await mapService.getLevelMap().catch((err) => console.error(err))
    return levelRequest.data
  }
  const setLevelMap = async (level: LevelMap) => {
    // Enregistrer le nouveau level dans la map
    return
  }

  const setActualLevelMapId = (id: number) => {
    actualLevelMapId.value = id
  }
  const getActivitiesRequest = async () => {
    const activitiesRequest = await generalService
      .getActivities()
      .catch((err) => console.error(err))
    return activitiesRequest.data
  }

  const getThemeRequest = async () => {
    const themeRequest = await generalService.getCardTheme().catch((err) => console.error(err))
    return themeRequest.data
  }
  const getDifficultyRequest = async () => {
    const difficultyRequest = await generalService
      .getDifficultyLevel()
      .catch((err) => console.error(err))
    return difficultyRequest.data
  }
  return {
    newLevel,
    actualLevelMapId,
    getLevelMap,
    setLevelMap,
    getActivitiesRequest,
    getThemeRequest,
    getDifficultyRequest,
    setActualLevelMapId
  }
})

export default useMapStore

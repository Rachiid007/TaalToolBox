import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { LevelMap } from '@/types/map'

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
  const getLevelMap = (): LevelMap => {
    return newLevel
  }
  const setLevelMap = async (level: LevelMap) => {
    // Enregistrer le nouveau level dans la map
    return
  }
  return {
    newLevel,
    getLevelMap,
    setLevelMap
  }
})

export default useMapStore

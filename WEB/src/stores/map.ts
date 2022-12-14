import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { LevelMap } from '@/types/map'

export const useMapStore = defineStore('map', () => {
  // Get les level dont on a besoin dans la base de données
  // Enregistrer les level
  const newLevel: LevelMap = reactive({
    name: '',
    position: [],
    difficulty: '',
    theme: ''
  })
  const getMap = () => {
    return
  }
  const setMap = () => {
    return
  }
  return {
    newLevel,
    getMap,
    setMap
  }
})

export default useMapStore

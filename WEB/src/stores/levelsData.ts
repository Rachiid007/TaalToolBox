import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'

export const useLevelsData = defineStore('dadlevels', () => {
  const levelGeoLoc: Ref<string> = ref('')
  const levelName: Ref<string> = ref('')
  const levelType: Ref<number> = ref(0)
  const levelTheme: Ref<number> = ref(0)
  const levelDifficulty: Ref<number> = ref(0)
  const levelDescription: Ref<string> = ref('')

  const addLevelData = (data: {}) => {
    levelName.value = data.name
    levelType.value = data.type
    levelTheme.value = data.theme
    levelDifficulty.value = data.difficulty
    levelDescription.value = data.description
  }

  return {
    levelGeoLoc,
    levelName,
    levelType,
    levelTheme,
    levelDifficulty,
    levelDescription,
    addLevelData
  }
})

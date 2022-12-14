import { apiClient } from './apiClient'
import type { LevelMap } from '@/types/map'

export default {
  setLevelMap(payload: LevelMap) {
    return apiClient.post('/level_map', payload)
  }
}

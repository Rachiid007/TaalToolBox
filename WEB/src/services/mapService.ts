import { apiClient } from './apiClient'
import type { LevelMap } from '@/types/map'

export default {
  async setLevelMap(payload: LevelMap) {
    return await apiClient.post('/level-map', payload)
  },

  getLevelMap() {
    return apiClient.get('/level-map')
  }
}

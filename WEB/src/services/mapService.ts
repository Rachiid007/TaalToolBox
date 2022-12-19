import { apiClient } from './apiClient'
import type { LevelMap } from '@/types/map'

export default {
  async setLevelMap(payload: LevelMap) {
    return await apiClient.post('/level-map', {
      mapPayload: payload,
      dadPayload: { levelData: '' }
    })
  },

  getLevelMap() {
    return apiClient.get('/level-map')
  },

  async setDadLevelMap(mapPayload: LevelMap, payload: { levelData: string }) {
    return apiClient.post('/level-map', { mapPayload: mapPayload, dadPayload: payload })
  }
}

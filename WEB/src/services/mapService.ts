import { apiClient } from './apiClient'
import type { LevelMap } from '@/types/map'

export default {
  async setLevelMap(payload: LevelMap) {
    console.log(payload)
    return await apiClient.post('/level-map', payload)
  }
}

export interface LevelMap {
  name: string
  description: string
  address: string
  position: number[]
  activityId: number
  difficultyId: number
  themeId: number
}

export interface LevelMapWithId {
  id: number
  name: string
  description: string
  address: string
  position: number[]
  activityId: number
  difficultyId: number
  themeId: number
}

import { defineStore } from 'pinia'

const useMapStore = defineStore('map', {
  state: () => {
    return { map: 15 }
  },

  getters: {
    getMap: (state) => {
      return state.map
    }
  },
  actions: {
    setMap(map: any) {
      this.map = map
    }
  }
})

export default useMapStore

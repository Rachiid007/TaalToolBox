import { defineStore } from 'pinia'

const store = defineStore('map', {
  state: () => {
    return { map: null }
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

export default store

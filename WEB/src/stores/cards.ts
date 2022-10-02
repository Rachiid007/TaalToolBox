import { defineStore } from 'pinia'

export const useCardStore = defineStore('main', {
  state: () => ({
    numberOfCards: 0
  }),
  getters: {
    getValue: (state) => {
      state.numberOfCards
    }
  },
  actions: {
    setNumber(param1: number) {
      this.numberOfCards = param1
    }
  }
})

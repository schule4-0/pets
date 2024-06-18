import { defineStore } from 'pinia'

export const useStageStore = defineStore('stage', {
  state: () => ({
    isActive: false
  }),
  actions: {
    startStageTransition(onHalftime: () => void) {
      this.isActive = true
      setTimeout(() => {
        onHalftime()
        this.isActive = false
      }, 2000)
    },
    toggleState() {
      this.isActive = !this.isActive
    }
  }
})

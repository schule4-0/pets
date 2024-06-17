import type { CareTimeState } from '@/views/dog/MinigameCareTime.vue'
import { defineStore } from 'pinia'

export const useCareTimeToolStore = defineStore('careTimeState', {
  state: () => ({
    currentState: 'shampooing' as CareTimeState
  }),
  actions: {
    setCurrentState(state: CareTimeState) {
      this.currentState = state
    }
  }
})

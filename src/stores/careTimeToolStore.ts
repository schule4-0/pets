import type { CareTimeTool } from '@/views/dog/MinigameCareTime.vue'
import { defineStore } from 'pinia'

export const useCareTimeToolStore = defineStore('careTimeTool', {
  state: () => ({
    selectedTool: 'shampoo' as CareTimeTool
  }),
  actions: {
    setTool(tool: CareTimeTool) {
      this.selectedTool = tool
    }
  }
})

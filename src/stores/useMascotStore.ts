import { defineStore } from 'pinia'

export const useMascotStore = defineStore('popup', {
  state: () => ({
    message: '',
    show: false
  }),
  actions: {
    showMessage(message: string) {
      this.message = message
      this.show = true

      setTimeout(() => {
        this.show = false
      }, 3000)
    }
  }
})

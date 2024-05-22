import { defineStore } from 'pinia'
import type { Message } from '@/config/mascotMessages'

export const useMascotStore = defineStore('popup', {
  state: () => ({
    showMascot: false,
    messageShown: false, //TODO: maybe derive from empty message
    message: {} as Message
  }),
  actions: {
    setMessage(message: Message) {
      this.message = message
    },
    showMascotItem() {
      this.showMascot = true
    },
    hideMascotItem() {
      this.showMascot = false
    },
    showMessage() {
      this.messageShown = true
    },
    hideMessage() {
      this.messageShown = false
    }
  }
})

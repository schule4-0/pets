import { defineStore } from 'pinia'
import type { Message } from '@/config/mascotMessages'
import mascotMessages from '@/config/mascotMessages'
import { useReading } from '@/composables/reading'

const { readAloud } = useReading()

export const useMascotStore = defineStore('popup', {
  state: () => ({
    showMascot: false,
    message: {} as Message,
    speechBubbleShown: false
  }),
  getters: {
    messages: () => mascotMessages
  },
  actions: {
    setMessage(message: Message, delay?: number) {
      setTimeout(() => {
        this.showMascotItem()
        this.showSpeechBubble()
        this.message = message
        this.readMessage()
      }, delay)
    },
    showMascotItem(delay?: number) {
      setTimeout(() => {
        this.showMascot = true
      }, delay)
    },
    hideMascotItem() {
      this.showMascot = false
    },
    showSpeechBubble() {
      this.speechBubbleShown = true
    },
    hideSpeechBubble() {
      this.speechBubbleShown = false
    },
    readMessage() {
      readAloud(this.message)
    },
    readMessageAgain() {
      this.showSpeechBubble()
      this.readMessage()
    }
  }
})

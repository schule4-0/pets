import { defineStore } from 'pinia'
import type { Message, StringResourceKey } from '@/config/mascotMessages'
import { getStringRes } from '@/config/mascotMessages'
import { useReading } from '@/composables/reading'

const { readAloud } = useReading()

export const useMascotStore = defineStore('popup', {
  state: () => ({
    showMascot: false,
    speechBubbleShown: false,
    messageKey: '' as StringResourceKey
  }),
  getters: {
    messageString: (state) => {
      return getStringRes(state.messageKey).content
    }
  },
  actions: {
    /** @deprecated
     * use showMessage(key: StringResourceKey, delay?: number) instead
     */
    setMessage(message: Message) {
      console.log(message.content)
    },
    showMessage(key: StringResourceKey, delay?: number) {
      this.hideSpeechBubble() //Support animation
      this.showMascotItem()
      setTimeout(() => {
        this.showSpeechBubble()
        this.messageKey = key
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
    readMessageAgain() {
      this.showSpeechBubble()
      this.readMessage()
    },
    readMessage() {
      readAloud(this.messageKey)
    }
  }
})

import { defineStore } from 'pinia'
import type { StringResourceKey } from '@/config/mascotMessages'
import { getStringRes } from '@/config/mascotMessages'
import { useReading } from '@/composables/reading'

const { readAloud, cancelAudio } = useReading()

export const useMascotStore = defineStore('popup', {
  state: () => ({
    showMascot: false,
    speechBubbleShown: false,
    messageKey: '' as StringResourceKey,
    defaultPosition: true
  }),
  getters: {
    currentMessageString: (state) => {
      return getStringRes(state.messageKey).content
    }
  },
  actions: {
    showMessage(key: StringResourceKey, onEnd = () => {}, overrideDefaultPosition = false) {
      this.defaultPosition = !overrideDefaultPosition
      this.hideSpeechBubble() //Support animation
      this.showMascotItem()

      this.showSpeechBubble()

      this.messageKey = key
      this.readMessage(onEnd)
    },
    getMessageString: (key: StringResourceKey) => {
      return getStringRes(key).content
    },
    showMascotItem() {
      this.showMascot = true
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
    readMessage(onEnd?: Function) {
      readAloud(this.messageKey, onEnd)
    },
    cancelMessage() {
      cancelAudio()
    }
  }
})

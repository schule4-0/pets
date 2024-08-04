import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMascotMessage, type MascotMessageKey } from '@/config/mascotMessages'

interface Options {
  overrideDefaultPosition?: boolean
  showSpeechBubble?: boolean
  showMascot?: boolean
  hideMessageAfterRead?: boolean
  onFinished?: () => void
}

export const useMascotStore = defineStore('audio', () => {
  const mascotResourceKey = ref<MascotMessageKey | null>(null)
  const showMascot = ref(false)
  const showSpeechBubble = ref(false)
  const defaultPosition = ref(true)
  const isPlaying = ref(false)
  const currentAudio = ref<HTMLAudioElement | null>(null)
  const isAudioInitialized = ref(false)

  // Initialize audio element on user interaction
  const initializeAudio = () => {
    if (!isAudioInitialized.value && currentAudio.value === null) {
      currentAudio.value = new Audio()
      isAudioInitialized.value = true
    }
  }

  // Play the audio file or use speech synthesis
  const showMessage = async (key: MascotMessageKey, options: Options = {}) => {
    initializeAudio() // Ensure audio is initialized on user interaction

    const _showMascot = options?.showMascot ?? true
    const _showSpeechBubble = options?.showSpeechBubble ?? true
    const _hideMessageAfterRead = options?.hideMessageAfterRead ?? true

    mascotResourceKey.value = key
    defaultPosition.value = !options.overrideDefaultPosition
    showSpeechBubble.value = _showSpeechBubble && _showMascot
    showMascot.value = _showMascot

    const extendedOnFinishCallback = () => {
      if (_hideMessageAfterRead) showSpeechBubble.value = false
      options.onFinished?.()
    }
    readMessage(key, extendedOnFinishCallback)
  }

  // Cancel any ongoing playback or speech synthesis
  const cancelPlayback = () => {
    if (isPlaying.value) {
      if (currentAudio.value) {
        currentAudio.value.pause()
        currentAudio.value.currentTime = 0
      }
      isPlaying.value = false
    }
  }

  const getMessageString = (key: MascotMessageKey) => {
    return getMascotMessage(key).content
  }

  const hideMascotItem = () => {
    showMascot.value = false
  }

  const readMessage = async (key: MascotMessageKey, onEndCallback?: () => void) => {
    if (isPlaying.value) {
      cancelPlayback()
    }

    const audioSrc = getMascotMessage(key).audioSrc

    if (currentAudio.value && audioSrc) {
      currentAudio.value.src = audioSrc

      currentAudio.value.onended = () => {
        isPlaying.value = false
        if (onEndCallback) {
          onEndCallback()
        }
      }

      currentAudio.value.onerror = (event) => {
        console.error('Audio playback error:', event)
        isPlaying.value = false
      }

      isPlaying.value = true
      currentAudio.value.play().catch((error) => {
        console.error('Audio play error:', error)
      })
    }
  }

  const cancelMessage = () => {
    cancelPlayback()
  }

  return {
    isPlaying,
    showMessage,
    cancelPlayback,
    mascotResourceKey,
    showMascot,
    showSpeechBubble,
    defaultPosition,

    cancelMessage,
    readMessage,
    getMessageString,
    hideMascotItem,
    initializeAudio
  }
})

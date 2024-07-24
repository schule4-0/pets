import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSpeechSynthesis } from '@/composables/useSpeechSynthesis'
import { getStringRes, type StringResourceKey } from '@/config/mascotMessages'

interface Options {
  overrideDefaultPosition?: boolean
  showSpeechBubble?: boolean
  showMascot?: boolean
  hideMessageAfterRead?: boolean
  onFinished?: () => void
}

// Import all audio files dynamically
const audioFiles = import.meta.glob('@/assets/audio/mascot/*.mp3')

export const useMascotStore = defineStore('audio', () => {
  const mascotResourceKey = ref<StringResourceKey | null>(null)
  const showMascot = ref(false)
  const showSpeechBubble = ref(false)
  const defaultPosition = ref(true)
  const isPlaying = ref(false)
  const onEnd = ref<(() => void) | null>(null)
  const currentAudio = ref<HTMLAudioElement | null>(null)
  const { speak, cancel, isSpeaking, onFinished } = useSpeechSynthesis()

  // Play the audio file or use speech synthesis
  const showMessage = async (key: StringResourceKey, options: Options = {}) => {
    const _showMascot = options?.showMascot ?? true
    const _showSpeechBubble = options?.showMascot ?? true
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
    cancel()
  }

  const getMessageString = (key: StringResourceKey) => {
    return getStringRes(key).content
  }

  const hideMascotItem = () => {
    showMascot.value = false
  }

  const readMessage = async (key: StringResourceKey, onEndCallback?: () => void) => {
    if (isPlaying.value) {
      cancelPlayback()
    }

    const audioPath = `/src/assets/audio/mascot/${key}.mp3`
    const importAudio = audioFiles[audioPath]

    if (importAudio) {
      try {
        const module = await importAudio()
        const audioUrl = (module as { default: string }).default
        const audio = new Audio(audioUrl)
        currentAudio.value = audio

        audio.onended = () => {
          isPlaying.value = false
          if (onEndCallback) {
            onEndCallback()
          }
          if (onEnd.value) {
            onEnd.value()
          }
        }

        audio.onerror = (event) => {
          console.error('Audio playback error:', event)
          isPlaying.value = false
        }

        isPlaying.value = true
        audio.play()
      } catch (error) {
        console.error('Error importing audio file:', error)
        speak(getStringRes(key).content, onEndCallback)
      }
    } else {
      speak(getStringRes(key).content, onEndCallback)
    }
  }

  const cancelMessage = () => {
    cancelPlayback()
  }

  return {
    isPlaying,
    onEnd,
    showMessage,
    cancelPlayback,
    isSpeaking,
    onFinished,
    mascotResourceKey,
    showMascot,
    showSpeechBubble,
    defaultPosition,

    cancelMessage,
    readMessage,
    getMessageString,
    hideMascotItem
  }
})

import { ref, onBeforeUnmount } from 'vue'

export function useSpeechSynthesis() {
  const synth = window.speechSynthesis
  const isSpeaking = ref(false)
  const onFinished = ref<(() => void) | null>(null)

  const speak = (text: string, onFinishedCallback?: () => void) => {
    if (synth.speaking) {
      console.error('SpeechSynthesis is already speaking')
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    utterance.rate = 0.7
    utterance.pitch = 1.3

    utterance.onend = () => {
      isSpeaking.value = false
      if (onFinishedCallback) {
        onFinishedCallback()
      }
      if (onFinished.value) {
        onFinished.value()
      }
    }

    utterance.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event)
      isSpeaking.value = false
    }

    isSpeaking.value = true
    synth.speak(utterance)
  }

  const cancel = () => {
    if (synth.speaking) {
      synth.cancel()
      isSpeaking.value = false
    }
  }

  onBeforeUnmount(() => {
    cancel()
  })

  return {
    speak,
    cancel,
    isSpeaking,
    onFinished
  }
}

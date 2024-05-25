import type { Message } from '@/config/mascotMessages'
import { useMascotStore } from '@/stores/useMascotStore'

export function useReading() {
  const speech = new SpeechSynthesisUtterance()
  speech.lang = 'de'
  speech.rate = 0.7
  speech.pitch = 1.3

  function readAloud(message: Message) {
    //TODO: initialise store outside of this function
    const mascot = useMascotStore()

    window.speechSynthesis.cancel()
    speech.text = message.content
    window.speechSynthesis.speak(speech)
    speech.onend = () => {
      setTimeout(() => mascot.hideSpeechBubble(), 1500)
    }
  }

  return {
    readAloud
  }
}

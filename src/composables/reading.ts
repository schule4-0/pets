import type { Message } from '@/config/mascotMessages'
import { useMascotStore } from '@/stores/useMascotStore'

export function useReading() {
  const speech = new SpeechSynthesisUtterance()
  speech.lang = 'de'
  speech.rate = 0.7
  speech.pitch = 1.3

  function hideSpeechBubble() {
    const mascot = useMascotStore() //TODO: initialize mascot store outside this function
    setTimeout(() => mascot.hideSpeechBubble(), 1500)
  }

  async function playFile(message: Message) {
    const module = await import(/* @vite-ignore */ `../assets/audio/mascot/${message.audioFile}`)
    const audio = new Audio(module.default)
    //TODO: cancel audio
    audio.addEventListener('ended', () => hideSpeechBubble(), { once: true })
    audio.play()
  }

  function playLiveTts(message: Message) {
    window.speechSynthesis.cancel()
    speech.text = message.content
    window.speechSynthesis.speak(speech)
    speech.onend = () => hideSpeechBubble()
  }

  async function readAloud(message: Message) {
    if (message.audioFile) {
      try {
        await playFile(message)
      } catch (e) {
        playLiveTts(message)
      }
    } else {
      playLiveTts(message)
    }
  }

  return {
    readAloud
  }
}

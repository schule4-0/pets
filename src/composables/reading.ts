import type { Message } from '@/config/mascotMessages'
import { useMascotStore } from '@/stores/useMascotStore'

export function useReading() {
  const speech = new SpeechSynthesisUtterance()
  speech.lang = 'de'
  speech.rate = 0.7
  speech.pitch = 1.3

  const audio = new Audio()

  function hideSpeechBubble() {
    const mascot = useMascotStore() //TODO: initialize mascot store outside this function
    setTimeout(() => {
      if (audio.paused && !window.speechSynthesis.speaking) {
        mascot.hideSpeechBubble()
      }
    }, 1500)
  }

  audio.addEventListener('ended', hideSpeechBubble)

  function cancelAudio() {
    window.speechSynthesis.cancel()
    audio.pause()
  }

  async function playFile(message: Message) {
    const module = await import(/* @vite-ignore */ `../assets/audio/mascot/${message.audioFile}`)
    audio.src = module.default
    await audio.play()
  }

  function playLiveTts(message: Message) {
    speech.text = message.content
    if (audio.paused) {
      window.speechSynthesis.speak(speech)
    }
    speech.onend = () => hideSpeechBubble()
  }

  async function readAloud(message: Message) {
    cancelAudio()
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

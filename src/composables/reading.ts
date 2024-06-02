import type { StringResourceKey } from '@/config/mascotMessages'
import { getStringRes } from '@/config/mascotMessages'
import { useMascotStore } from '@/stores/useMascotStore'

export function useReading() {
  const audioFiles = import.meta.glob('../assets/audio/mascot/*.mp3')

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

  async function playFile(filePath: string) {
    const module = await import(/* @vite-ignore */ filePath)
    audio.src = module.default
    await audio.play()
  }

  function playLiveTts(key: StringResourceKey) {
    speech.text = getStringRes(key).content
    if (audio.paused) {
      window.speechSynthesis.speak(speech)
    }
    speech.onend = () => hideSpeechBubble()
  }

  async function readAloud(key: StringResourceKey) {
    const filePath = `../assets/audio/mascot/${key}.mp3`
    cancelAudio()
    try {
      //check if file exists
      if (!audioFiles[filePath]) {
        playLiveTts(key)
      } else {
        playFile(filePath)
      }
    } catch (e) {
      playLiveTts(key)
    }
  }

  return {
    readAloud
  }
}

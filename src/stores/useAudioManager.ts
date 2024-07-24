import { defineStore } from 'pinia'
import { ref, onBeforeUnmount } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { soundMappings, type SoundIdentifier } from '@/config/soundMappings' // Import the sound mappings

interface AudioOptions {
  loop?: boolean
  volume?: number
  onFinished?: () => void
}

interface AudioInstance {
  id: string
  audio: HTMLAudioElement
  options: AudioOptions
}

export const useAudioManager = defineStore('audioManager', () => {
  const audios = ref<AudioInstance[]>([])

  const playSound = (soundIdentifier: SoundIdentifier, options: AudioOptions = {}) => {
    const soundMap = soundMappings[soundIdentifier] // Resolve the file path from the mapping
    if (!soundMap) {
      console.error(`Sound identifier "${soundIdentifier}" not found in soundMappings.`)
      return
    }

    let soundFile = ''
    if (Array.isArray(soundMap)) {
      const randomIndex = Math.floor(Math.random() * soundMap.length)
      soundFile = soundMap[randomIndex] as string
    } else {
      soundFile = soundMap as string
    }

    const audio = new Audio(soundFile)
    audio.loop = !!options.loop
    audio.volume = options.volume ?? 1.0
    const id = uuidv4()

    const handleEnded = () => {
      if (options.onFinished) {
        options.onFinished()
      }
      if (!audio.loop) {
        audios.value = audios.value.filter((a) => a.audio !== audio)
      }
    }

    audio.addEventListener('ended', handleEnded)

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          audios.value.push({ id, audio, options })
        })
        .catch((error) => {
          console.error('Error attempting to play audio:', error)
        })
    }

    return id
  }

  const stopSound = (id: string) => {
    const audioInstance = audios.value.find((a) => a.id === id)
    if (audioInstance) {
      audioInstance.audio.pause()
      audioInstance.audio.currentTime = 0
      audios.value = audios.value.filter((a) => a.id !== id)
    }
  }

  const stopAllSounds = () => {
    audios.value.forEach((a) => {
      a.audio.pause()
      a.audio.currentTime = 0
    })
    audios.value = []
  }

  onBeforeUnmount(() => {
    stopAllSounds()
  })

  return {
    audios,
    playSound,
    stopSound,
    stopAllSounds
  }
})

import { defineStore } from 'pinia'
import { ref, onBeforeUnmount } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { soundEffectMappings, type SoundIdentifier } from '@/config/soundEffectMappings'
import { useAudioContextStore } from '@/stores/useAudioContextStore'

interface AudioOptions {
  loop?: boolean
  volume?: number
  onFinished?: () => void
}

interface AudioInstance {
  id: string
  source: AudioBufferSourceNode
  gainNode: GainNode
  options: AudioOptions
}

export const useAudioManager = defineStore('audioManager', () => {
  const audioContextStore = useAudioContextStore()
  audioContextStore.initializeAudioContext()

  const audios = ref<AudioInstance[]>([])

  const playSound = async (soundIdentifier: SoundIdentifier, options: AudioOptions = {}) => {
    const soundMap = soundEffectMappings[soundIdentifier]
    if (!soundMap) {
      console.error(`Sound identifier "${soundIdentifier}" not found.`)
      alert(`Sound identifier "${soundIdentifier}" not found.`)
      return
    }

    let soundFile = ''
    if (Array.isArray(soundMap)) {
      const randomIndex = Math.floor(Math.random() * soundMap.length)
      soundFile = soundMap[randomIndex] as string
    } else {
      soundFile = soundMap as string
    }

    try {
      const audioBuffer = await audioContextStore.loadSound(soundFile)
      const source = audioContextStore.createSource(audioBuffer)

      const gainNode = audioContextStore.audioContext!.createGain()
      gainNode.gain.value = options.volume ?? 1.0

      source.loop = !!options.loop
      source.connect(gainNode).connect(audioContextStore.audioContext!.destination)

      const id = uuidv4()

      source.onended = () => {
        if (options.onFinished) {
          options.onFinished()
        }
        if (!source.loop) {
          audios.value = audios.value.filter((a) => a.source !== source)
        }
      }

      source.start()

      audios.value.push({ id, source, gainNode, options })
      return id
    } catch (error) {
      console.error('Error loading or playing audio:', error)
      alert(error)
    }
  }

  const stopSound = (id: string) => {
    const audioInstance = audios.value.find((a) => a.id === id)
    if (audioInstance) {
      audioInstance.source.stop()
      audios.value = audios.value.filter((a) => a.id !== id)
    }
  }

  const stopAllSounds = () => {
    audios.value.forEach((a) => {
      a.source.stop()
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

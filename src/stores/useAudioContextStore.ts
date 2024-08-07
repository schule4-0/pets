import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioContextStore = defineStore('audioContext', () => {
  const audioContext = ref<AudioContext | null>(null)

  const initializeAudioContext = () => {
    if (!audioContext.value) {
      audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  const decodeAudioData = async (arrayBuffer: ArrayBuffer) => {
    if (!audioContext.value) throw new Error('AudioContext not initialized.')
    return await audioContext.value.decodeAudioData(arrayBuffer)
  }

  const loadSound = async (url: string) => {
    if (!audioContext.value) throw new Error('AudioContext not initialized.')

    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    return await decodeAudioData(arrayBuffer)
  }

  const createSource = (audioBuffer: AudioBuffer) => {
    if (!audioContext.value) throw new Error('AudioContext not initialized.')

    const source = audioContext.value.createBufferSource()
    source.buffer = audioBuffer
    return source
  }

  return {
    audioContext,
    initializeAudioContext,
    loadSound,
    createSource
  }
})

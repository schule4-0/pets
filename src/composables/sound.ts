import { ref } from 'vue'

export function useSound() {
  const audio = new Audio()
  const sounds = ref<HTMLAudioElement[]>([])
  const currentSound = ref<HTMLAudioElement | null>(null)
  const isPlaying = ref(false)

  // Separate audio instance for background music
  const backgroundMusic = new Audio()
  const isBackgroundMusicPlaying = ref(false)

  // Load a list of sound URLs
  function loadSounds(soundUrls: string[]) {
    sounds.value = soundUrls.map((url) => new Audio(url))
  }

  // Play a sound from a specific file path
  async function play(filePath: string) {
    try {
      audio.pause()
      audio.loop = false
      audio.src = filePath
      await audio.play()
      isPlaying.value = true
      currentSound.value = audio

      audio.onended = () => {
        isPlaying.value = false
        currentSound.value = null
      }
    } catch (e) {
      isPlaying.value = false
      currentSound.value = null
    }
  }

  // Play a sound from a specific file path in a loop
  async function playLoop(filePath: string) {
    try {
      audio.pause()
      audio.src = filePath
      audio.loop = true
      await audio.play()
      isPlaying.value = true
      currentSound.value = audio
    } catch (e) {
      isPlaying.value = false
      currentSound.value = null
    }
  }

  // Stop the looped sound
  function stopLoop() {
    audio.loop = false
    audio.pause()
    isPlaying.value = false
    currentSound.value = null
  }

  // Play a random sound from the loaded sounds
  function playRandomSound() {
    if (isPlaying.value) {
      return
    }

    const randomIndex = Math.floor(Math.random() * sounds.value.length)
    const randomSound = sounds.value[randomIndex]

    randomSound.play()
    currentSound.value = randomSound
    isPlaying.value = true

    randomSound.onended = () => {
      currentSound.value = null
      isPlaying.value = false
    }

    randomSound.onerror = () => {
      currentSound.value = null
      isPlaying.value = false
    }
  }

  // Play background music
  async function playBackgroundMusic(filePath: string, volume: number = 1) {
    try {
      backgroundMusic.src = filePath
      backgroundMusic.loop = true
      backgroundMusic.volume = volume

      await backgroundMusic.play()
      isBackgroundMusicPlaying.value = true
    } catch (e) {
      isBackgroundMusicPlaying.value = false
    }
  }

  // Stop background music
  function stopBackgroundMusic() {
    backgroundMusic.pause()
    isBackgroundMusicPlaying.value = false
  }

  return {
    loadSounds,
    play,
    playLoop,
    stopLoop,
    playRandomSound,
    playBackgroundMusic,
    stopBackgroundMusic,
    isBackgroundMusicPlaying
  }
}

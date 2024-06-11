export function useSound() {
  const audio = new Audio()

  async function play(filePath: string) {
    try {
      audio.pause()
      audio.src = filePath
      await audio.play()
    } catch (e) {
      return
    }
  }

  return {
    play
  }
}

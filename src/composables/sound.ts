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

  async function playLoop(filePath: string) {
    try {
      audio.pause()
      audio.src = filePath
      audio.loop = true
      await audio.play()
    } catch (e) {
      return
    }
  }

  function stopLoop() {
    audio.loop = false
    audio.pause()
  }

  return {
    play,
    playLoop,
    stopLoop
  }
}

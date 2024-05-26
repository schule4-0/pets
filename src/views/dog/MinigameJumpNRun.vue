<template>
  <div class="game-container" :style="{ backgroundPositionX: `${backgroundPositionX}px` }">
    <Character :isJumping="isJumping" />
    <Obstacle :image="StoneImg" :positionX="obstaclePositionX" />

    <BtnControl type="jump" @jump="jump" bottom="10" left="100" />

    <button @click="goToNextStage">Nächstes Minigame</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Character from '@/components/JumpNRun/JumpNRunCharacter.vue'
import Obstacle from '@/components/JumpNRun/JumpNRunObstacle.vue'
import BtnControl from '@/components/JumpNRun/JumpNRunControlButton.vue'
import { useStageNavigator } from '@/composables/useNavigation'
import { useMascotStore } from '@/stores/useMascotStore'
import mascotMessages from '@/config/mascotMessages'
import StoneImg from '@/assets/jumpNrun/stone.png'

const { goToNextStage } = useStageNavigator()
const mascot = useMascotStore()
const jumpNRunMessages = mascotMessages.dog.stage3

const initialBackgroundPositionX = 0
const initialObstaclePositionX = 2000
const initialIsRunning = false
const initialIsJumping = false
const initialIsWaiting = false

let backgroundPositionX = ref(initialBackgroundPositionX)
let obstaclePositionX = ref(initialObstaclePositionX)
let isRunning = ref(initialIsRunning)
let isJumping = ref(initialIsJumping)
let isWaiting = ref(initialIsWaiting)

const run = () => {
  if (!isRunning.value && !isWaiting.value) {
    isRunning.value = true
    animate()
  }
}

const stopRun = () => {
  isRunning.value = false
}

const jump = () => {
  if (!isJumping.value && !isWaiting.value) {
    isJumping.value = true
    setTimeout(() => {
      isJumping.value = false
    }, 1000)
  }
}

const animate = () => {
  if (isRunning.value) {
    backgroundPositionX.value -= 5
    obstaclePositionX.value -= 5

    if (obstaclePositionX.value < -50) {
      obstaclePositionX.value = 2000
    }

    if (isColliding()) {
      mascot.setMessage(jumpNRunMessages.message2)
      isWaiting.value = true
      stopRun()
      setTimeout(() => {
        isWaiting.value = false
        resetGame()
      }, 1000)
      console.log('Collision detected!')
    }

    requestAnimationFrame(animate)
  }
}

const isColliding = () => {
  const characterElement = document.querySelector('.character')
  const obstacleElement = document.querySelector('.obstacle')

  if (!characterElement || !obstacleElement) return false

  const characterRect = characterElement.getBoundingClientRect()
  const obstacleRect = obstacleElement.getBoundingClientRect()

  return (
    characterRect.left < obstacleRect.right &&
    characterRect.right > obstacleRect.left &&
    characterRect.top < obstacleRect.bottom &&
    characterRect.bottom > obstacleRect.top
  )
}

const resetGame = () => {
  backgroundPositionX.value = initialBackgroundPositionX
  obstaclePositionX.value = initialObstaclePositionX
  isRunning.value = initialIsRunning
  isJumping.value = initialIsJumping
  //timeout before starting the game
  setTimeout(() => {
    run()
  }, 5000)
}

onMounted(() => {
  mascot.showMascotItem()
  mascot.setMessage(jumpNRunMessages.message1)
  mascot.showMessage()
  resetGame()
})
</script>

<style scoped>
.game-container {
  position: relative;
  background-image: url('@/assets/jumpNrun/background_jumpNrun.png');
  background-size: cover;
  background-repeat: repeat-x; /* ensures the background repeats horizontally */
  padding: 20px;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

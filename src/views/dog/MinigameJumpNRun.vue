<template>
  <div class="game-container" :style="{ backgroundPositionX: `${backgroundPositionX}px` }">
    <Character :isJumping="isJumping" />
    <Obstacle :image="StoneImg" :positionX="obstaclePositionX" />
    <BtnControl type="jump" @jump="jump" bottom="10" left="100" />
    <button @click="goToNextStage">Nächstes Minigame</button>
    <Goal v-if="isGoalVisible" :positionX="goalPositionX" />

    <PooComponent
      v-for="poo in poos"
      :key="poo.id"
      :id="poo.id"
      :positionX="poo.positionX"
      @collect="collectPoo(poo.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Character from '@/components/JumpNRun/JumpNRunCharacter.vue'
import Obstacle from '@/components/JumpNRun/ObstacleItem.vue'
import PooComponent from '@/components/JumpNRun/PooComponent.vue'
import BtnControl from '@/components/JumpNRun/ControlButton.vue'
import { useStageNavigator } from '@/composables/useNavigation'
import { useMascotStore } from '@/stores/useMascotStore'
import mascotMessages from '@/config/mascotMessages'
import StoneImg from '@/assets/jumpNrun/stone.png'
import Goal from '@/components/JumpNRun/GoalComponent.vue'

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
let pooCount = ref(0)
let collectedPooCount = ref(0)
let poos = ref<{ id: number; positionX: number }[]>([])
let isGoalVisible = ref(false)
let goalPositionX = ref((90 * window.innerWidth) / 100)
let pooIdCounter = 0
let poosToCollect = 3
let randomPooPosition = -100

const run = () => {
  if (!isWaiting.value) {
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
    }, 2000) // duration of jump animation
  }
}

const getRandomPooPosition = () => {
  const isLowerRange = Math.random() < 0.5 // Randomly choose between lower and upper range
  const percentage = isLowerRange ? Math.random() * 30 : 70 + Math.random() * 30
  return (percentage * window.innerWidth) / 100
}

const makePoo = (positionX: number) => {
  if (obstaclePositionX.value < positionX && !isGoalVisible.value) {
    stopRun()
    setTimeout(() => {
      const newPoo = { id: pooIdCounter++, positionX: (42 * window.innerWidth) / 100 }
      poos.value.push(newPoo)
      pooCount.value++
      randomPooPosition = -100
      run()
    }, 1000)
  }
}

const collectPoo = (id: number) => {
  poos.value = poos.value.filter((poo) => poo.id !== id)
  collectedPooCount.value++
}

const animate = () => {
  if (isRunning.value) {
    makePoo(randomPooPosition)
    backgroundPositionX.value -= 5
    obstaclePositionX.value -= 5
    if (poos.value.length > 0) {
      poos.value.forEach((poo) => {
        poo.positionX -= 5
      })
    }
    if (isGoalVisible.value) {
      goalPositionX.value -= 5
    }

    if (obstaclePositionX.value < -50) {
      obstaclePositionX.value = 2000
      // make poo in random position between to obstacles
      randomPooPosition = getRandomPooPosition()
      if (pooCount.value > poosToCollect - 1) {
        isGoalVisible.value = true
      }
    }

    if (isColliding()) {
      mascot.showMascotItem()
      mascot.setMessage(jumpNRunMessages.message2)
      mascot.showMessage()
      isWaiting.value = true
      stopRun()
      setTimeout(() => {
        isWaiting.value = false
        resetGame()
      }, 1000)
    }

    if (isCollidingGoal()) {
      checkWinCondition()
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

const isCollidingGoal = () => {
  const characterElement = document.querySelector('.character')
  const goalElement = document.querySelector('.goal')

  if (!characterElement || !goalElement) return false

  const characterRect = characterElement.getBoundingClientRect()
  const goalRect = goalElement.getBoundingClientRect()

  return (
    characterRect.left < goalRect.right &&
    characterRect.right > goalRect.left &&
    characterRect.top < goalRect.bottom &&
    characterRect.bottom > goalRect.top
  )
}

const checkWinCondition = () => {
  if (collectedPooCount.value === pooCount.value) {
    mascot.showMascotItem()
    mascot.setMessage(jumpNRunMessages.message3)
    mascot.showMessage()
    stopRun()
    setTimeout(() => {
      goToNextStage()
    }, 2000)
  } else {
    mascot.showMascotItem()
    mascot.setMessage(jumpNRunMessages.message4)
    mascot.showMessage()
    stopRun()
    setTimeout(() => {
      resetGame()
    }, 2000)
  }
}

const resetGame = () => {
  backgroundPositionX.value = initialBackgroundPositionX
  obstaclePositionX.value = initialObstaclePositionX
  isRunning.value = initialIsRunning
  isJumping.value = initialIsJumping
  poos.value = []
  pooCount.value = 0
  collectedPooCount.value = 0
  isGoalVisible.value = false
  setTimeout(() => {
    run()
    mascot.hideMascotItem()
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
  background-repeat: repeat-x;
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

<style scoped>
.game-container {
  position: relative;
  background-image: url('@/assets/jumpNrun/background_jumpNrun.png');
  background-size: cover;
  background-repeat: repeat-x;
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

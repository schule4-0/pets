<template>
  <div
    class="game-container"
    :style="{ backgroundPositionX: `${state.backgroundPositionX}px` }"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <Character :isJumping="state.isJumping" />
    <Obstacle :image="StoneImg" :positionX="state.obstaclePositionX" />
    <button @click="goToNextStage">Nächstes Minigame</button>
    <Goal v-if="state.isGoalVisible" :positionX="state.goalPositionX" />
    <ScoreBoard :items="state.poos" />

    <PooComponent
      v-for="poo in state.poos"
      :key="poo.id"
      :id="poo.id"
      :positionX="poo.positionX"
      :image="poo.image"
      :collected="poo.collected"
      @collect="collectPoo(poo.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import Character from '@/components/JumpNRun/JumpNRunCharacter.vue'
import Obstacle from '@/components/JumpNRun/ObstacleItem.vue'
import PooComponent from '@/components/JumpNRun/PooComponent.vue'
import { useStageNavigator } from '@/composables/useNavigation'
import { useMascotStore } from '@/stores/useMascotStore'
import StoneImg from '@/assets/jumpNrun/stone.png'
import Goal from '@/components/JumpNRun/GoalComponent.vue'
import PooImg from '@/assets/jumpNrun/poo.png'
import ScoreBoard from '@/components/ScoreBoard.vue'

const { goToNextStage } = useStageNavigator()
const mascot = useMascotStore()

interface Poo {
  id: number
  positionX: number
  image: string
  collected: boolean
}

interface State {
  backgroundPositionX: number
  obstaclePositionX: number
  isRunning: boolean
  isJumping: boolean
  isWaiting: boolean
  pooCount: number
  collectedPooCount: number
  poos: Poo[]
  isGoalVisible: boolean
  goalPositionX: number
  pooIdCounter: number
  randomPooPosition: number
}

const initialPoos = [
  {
    id: 0,
    positionX: -1000,
    image: PooImg,
    collected: false
  },
  {
    id: 1,
    positionX: -1000,
    image: PooImg,
    collected: false
  },
  {
    id: 2,
    positionX: -1000,
    image: PooImg,
    collected: false
  }
]
const initialState: State = {
  backgroundPositionX: 0,
  obstaclePositionX: 2000,
  isRunning: false,
  isJumping: false,
  isWaiting: false,
  pooCount: 0,
  collectedPooCount: 0,
  poos: initialPoos,
  isGoalVisible: false,
  goalPositionX: (90 * window.innerWidth) / 100,
  pooIdCounter: 0,
  randomPooPosition: -100
}

const state = reactive<State>({
  ...initialState
})

const run = () => {
  if (!state.isWaiting) {
    state.isRunning = true
    animate()
  }
}

const stopRun = () => {
  state.isRunning = false
}

const jump = () => {
  if (!state.isJumping && !state.isWaiting) {
    state.isJumping = true
    setTimeout(() => {
      state.isJumping = false
    }, 3000) // duration of jump animation
  }
}

let touchStartY = 0

const handleTouchStart = (event: TouchEvent) => {
  touchStartY = event.touches[0].clientY
}

const handleTouchEnd = (event: TouchEvent) => {
  const touchEndY = event.changedTouches[0].clientY
  if (touchStartY - touchEndY > 50) {
    jump()
  }
}

const getRandomPooPosition = () => {
  const isLowerRange = Math.random() < 0.5 // Randomly choose between lower and upper range
  const percentage = isLowerRange ? Math.random() * 30 : 70 + Math.random() * 30
  return (percentage * window.innerWidth) / 100
}

const makePoo = (positionX: number) => {
  if (state.obstaclePositionX < positionX && state.pooCount < state.poos.length) {
    stopRun()
    setTimeout(() => {
      state.poos[state.pooCount].positionX = (40 * window.innerWidth) / 100
      state.pooCount++
      state.randomPooPosition = -100
      run()
    }, 1000)
  }
}

const collectPoo = (id: number) => {
  const poo = state.poos.find((poo) => poo.id === id)
  if (poo) {
    poo.collected = true
  }
}

const animate = () => {
  if (state.isRunning) {
    makePoo(state.randomPooPosition)
    state.backgroundPositionX -= 5
    state.obstaclePositionX -= 5
    if (state.poos.length > 0) {
      state.poos.forEach((poo) => {
        poo.positionX -= 5
      })
    }
    if (state.isGoalVisible) {
      state.goalPositionX -= 5
    }

    if (state.obstaclePositionX < -50) {
      state.obstaclePositionX = 2000
      state.randomPooPosition = getRandomPooPosition()
      if (state.pooCount >= state.poos.length) {
        state.isGoalVisible = true
      }
    }

    if (isColliding()) {
      mascot.showMessage('STAGE3_OUTCH')
      state.isWaiting = true
      stopRun()
      setTimeout(() => {
        state.isWaiting = false
        resetGame()
      }, 1000)
    }

    if (isCollidingGoal()) {
      checkWin()
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

const checkWin = () => {
  // check if all poos are collected
  const allCollected = state.poos.every((poo) => poo.collected)
  if (allCollected) {
    mascot.showMessage('STAGE3_SUPER')
    stopRun()
    setTimeout(() => {
      goToNextStage()
    }, 2000)
  } else {
    mascot.showMessage('STAGE3_TRYAGAIN')
    stopRun()
    setTimeout(() => {
      resetGame()
    }, 2000)
  }
}

const resetGame = () => {
  //reset state
  state.backgroundPositionX = 0
  state.obstaclePositionX = 2000
  state.isRunning = false
  state.isJumping = false
  state.isWaiting = true
  state.pooCount = 0
  state.collectedPooCount = 0
  state.poos = initialPoos.map((poo) => ({ ...poo, collected: false }))
  state.isGoalVisible = false
  state.goalPositionX = (90 * window.innerWidth) / 100
  state.pooIdCounter = 0
  state.randomPooPosition = -100

  setTimeout(() => {
    state.isWaiting = false
    run()
    mascot.hideMascotItem()
  }, 5000)
}

onMounted(() => {
  mascot.showMessage('STAGE3_GOWALK')
  resetGame()
  run()
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

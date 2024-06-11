<template>
  <div class="game-container" :style="{ backgroundPositionX: `${state.backgroundPositionX}px` }">
    <Character :isJumping="state.isJumping" />
    <Obstacle :image="StoneImg" :positionX="state.obstaclePositionX" />
    <button @click="goToNextStage">Nächstes Minigame</button>
    <button @click="jump" class="btnJump">Jump</button>
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
import { reactive, onMounted, onUnmounted } from 'vue'
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
  goalPositionX: (110 * window.innerWidth) / 100,
  pooIdCounter: 0
}

const state = reactive<State>({
  ...initialState
})

let jumpTimeout: number | null = null
let makePooTimeout: number | null = null
let colissionTimeout: number | null = null
let winTimeout: number | null = null
let gameResetTimeout: number | null = null

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
    jumpTimeout = setTimeout(() => {
      state.isJumping = false
    }, 3000) // duration of jump animation
  }
}

const makePoo = () => {
  stopRun()
  makePooTimeout = setTimeout(() => {
    state.poos[state.pooCount].positionX = (40 * window.innerWidth) / 100
    state.pooCount++
    run()
  }, 1000)
}

const collectPoo = (id: number) => {
  const poo = state.poos.find((poo) => poo.id === id)
  if (poo) {
    poo.collected = true
  }
}

const animate = () => {
  if (state.isRunning) {
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

    if (state.obstaclePositionX < -100 && !state.isJumping) {
      state.obstaclePositionX = 2000
      if (state.pooCount >= state.poos.length) {
        const collectedPooCount = state.poos.filter((poo) => poo.collected).length
        console.log(collectedPooCount)
        if (collectedPooCount > 0) {
          state.isGoalVisible = true
        } else {
          mascot.showMessage('STAGE3_EXPLAINATION')
          stopRun()
          gameResetTimeout = setTimeout(() => {
            resetGame()
          }, 2000)
        }
      } else {
        makePoo()
      }
    }

    if (isColliding()) {
      mascot.showMessage('STAGE3_OUTCH')
      state.isWaiting = true
      stopRun()
      colissionTimeout = setTimeout(() => {
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
    winTimeout = setTimeout(() => {
      goToNextStage()
    }, 2000)
  } else {
    mascot.showMessage('STAGE3_TRYAGAIN')
    stopRun()
    gameResetTimeout = setTimeout(() => {
      resetGame()
    }, 2000)
  }
}

const resetGame = () => {
  //reset state
  state.backgroundPositionX = initialState.backgroundPositionX
  state.obstaclePositionX = initialState.obstaclePositionX
  state.isRunning = initialState.isRunning
  state.isJumping = initialState.isJumping
  state.isWaiting = initialState.isWaiting
  state.pooCount = initialState.pooCount
  state.collectedPooCount = initialState.collectedPooCount
  state.poos = initialState.poos.map((poo) => ({ ...poo, collected: false }))
  state.isGoalVisible = initialState.isGoalVisible
  state.goalPositionX = initialState.goalPositionX
  state.pooIdCounter = initialState.pooIdCounter

  gameResetTimeout = setTimeout(() => {
    run()
    mascot.hideMascotItem()
  }, 5000)
}

onMounted(() => {
  mascot.showMessage('STAGE3_GOWALK')
  resetGame()
})

onUnmounted(() => {
  if (jumpTimeout) clearTimeout(jumpTimeout)
  if (makePooTimeout) clearTimeout(makePooTimeout)
  if (colissionTimeout) clearTimeout(colissionTimeout)
  if (gameResetTimeout) clearTimeout(gameResetTimeout)
  if (winTimeout) clearTimeout(winTimeout)
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
.btnJump {
  position: absolute;
  bottom: 5vh;
  left: 5vh;
  padding: 5vh;
}
</style>

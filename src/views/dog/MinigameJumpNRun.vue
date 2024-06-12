<template>
  <div class="game-container" :style="{ backgroundPositionX: `${state.backgroundPositionX}px` }">
    <Character :image="state.image" :isJumping="state.isJumping" @click="startGame" />
    <Obstacle
      v-if="state.isObstacleVisible"
      :image="StoneImg"
      :positionX="state.obstaclePositionX"
    />
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
import gsap from 'gsap'
import Character from '@/components/JumpNRun/JumpNRunCharacter.vue'
import Obstacle from '@/components/JumpNRun/ObstacleItem.vue'
import PooComponent from '@/components/JumpNRun/PooComponent.vue'
import { useStageNavigator } from '@/composables/useNavigation'
import { useMascotStore } from '@/stores/useMascotStore'
import StoneImg from '@/assets/jumpNrun/stone.png'
import Goal from '@/components/JumpNRun/GoalComponent.vue'
import PooImg from '@/assets/poop.svg'
import ScoreBoard from '@/components/ScoreBoard.vue'
import RockySittingImg from '@/assets/rocky/Rocky_sitting.svg'
import RockyWalkingImg from '@/assets/rocky/Rocky_step_1.svg'
import RockyLyingBackImg from '@/assets/rocky/Rocky_lying_back.svg'
import RockyJumpingImg from '@/assets/rocky/Rocky_stand.svg'

const { goToNextStage } = useStageNavigator()
const mascot = useMascotStore()

interface Poo {
  id: number
  positionX: number
  image: string
  collected: boolean
}

interface State {
  image: string
  backgroundPositionX: number
  obstaclePositionX: number
  isRunning: boolean
  isJumping: boolean
  pooCount: number
  collectedPooCount: number
  poos: Poo[]
  isGoalVisible: boolean
  isObstacleVisible: boolean
  goalPositionX: number
  pooIdCounter: number
  isWaiting: boolean
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
  image: RockySittingImg,
  backgroundPositionX: 0,
  obstaclePositionX: 2000,
  isRunning: false,
  isJumping: false,
  pooCount: 0,
  collectedPooCount: 0,
  poos: initialPoos,
  isGoalVisible: false,
  isObstacleVisible: true,
  goalPositionX: (110 * window.innerWidth) / 100,
  pooIdCounter: 0,
  isWaiting: true
}

const state = reactive<State>({
  ...initialState
})

let makePooTimeout: number | null = null
let colissionTimeout: number | null = null
let gameResetTimeout: number | null = null

const run = () => {
  state.isWaiting = false
  state.isRunning = true
  state.image = RockyWalkingImg
  animate()
}

const stopRun = () => {
  state.isRunning = false
}

const jump = () => {
  if (!state.isJumping && state.isRunning) {
    state.isJumping = true
    state.image = RockyJumpingImg
    gsap.to(state, {
      isJumping: false,
      duration: 3,
      onComplete: () => {
        state.isJumping = false
        if (state.isRunning) {
          state.image = RockyWalkingImg
        }
      }
    })
  }
}

const makePoo = () => {
  stopRun()
  state.image = RockySittingImg
  gsap.delayedCall(1, () => {
    state.poos[state.pooCount].positionX = (40 * window.innerWidth) / 100
    state.pooCount++
    run()
  })
}

const collectPoo = (id: number) => {
  const poo = state.poos.find((poo) => poo.id === id)
  if (poo) {
    poo.collected = true
  }
}

const animate = () => {
  if (state.isRunning) {
    gsap.to(state, {
      duration: 0.01,
      onUpdate: () => {
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
            if (collectedPooCount > 0) {
              state.isObstacleVisible = false
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
          state.image = RockyLyingBackImg
          mascot.showMessage('STAGE3_OUTCH')
          stopRun()
          colissionTimeout = setTimeout(() => {
            resetGame()
          }, 2000)
        }

        if (state.goalPositionX < (50 * window.innerWidth) / 100) {
          checkWin()
        }
      },
      onComplete: animate
    })
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

const checkWin = () => {
  const allCollected = state.poos.every((poo) => poo.collected)
  if (allCollected) {
    mascot.showMessage('STAGE3_SUPER')
    stopRun()
    gsap.delayedCall(2, () => {
      goToNextStage()
    })
  } else {
    mascot.showMessage('STAGE3_TRYAGAIN')
    stopRun()
    gsap.delayedCall(2, () => {
      resetGame()
    })
  }
}

const resetGame = () => {
  //reset state
  state.image = initialState.image
  state.backgroundPositionX = initialState.backgroundPositionX
  state.obstaclePositionX = initialState.obstaclePositionX
  state.isRunning = false
  state.isJumping = initialState.isJumping
  state.pooCount = initialState.pooCount
  state.collectedPooCount = initialState.collectedPooCount
  state.poos = initialState.poos.map((poo) => ({ ...poo, collected: false }))
  state.isGoalVisible = initialState.isGoalVisible
  state.goalPositionX = initialState.goalPositionX
  state.pooIdCounter = initialState.pooIdCounter
  state.isWaiting = initialState.isWaiting
}

const startGame = () => {
  if (state.isWaiting) run()
}

onMounted(() => {
  mascot.showMessage('STAGE3_GOWALK')
  resetGame()
})

onUnmounted(() => {
  if (makePooTimeout) clearTimeout(makePooTimeout)
  if (colissionTimeout) clearTimeout(colissionTimeout)
  if (gameResetTimeout) clearTimeout(gameResetTimeout)
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

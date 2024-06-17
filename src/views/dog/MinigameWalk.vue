<template>
  <div class="game-container">
    <div class="game-path"></div>
    <div class="skyline"></div>
    <Character
      :action="characterAction"
      @click="startGame"
      ref="characterRef"
      @jump-completed="handleJumpComplete"
    />
    <Obstacle
      v-if="gameState.obstacle"
      :positionX="gameState.obstacle.positionX"
      :characterRef="characterRef"
      @collide="handleCollision"
      @jumpedOver="handleJumpedOver"
    />
    <button
      @click="handleButtonClick"
      class="btnJump"
      v-if="!isGoalVisible"
      :disabled="characterAction === 'jump'"
    >
      {{ hasGameStarted ? 'jump' : 'start' }}
    </button>
    <Goal v-if="isGoalVisible" :positionX="goalPositionX" ref="goalRef" class="goal" />
    <ScoreBoard :items="collectedPoos" />
    <PooComponent
      v-if="gameState.poo"
      :positionX="gameState.poo.positionX"
      :collected="gameState.poo.collected"
      @collect="collectPoo"
    />
    <AnimatedComponent
      v-for="(element, index) in animatedElements"
      :key="index"
      :element="element"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import Character from '@/components/minigame-walk/JumpNRunCharacter.vue'
import Obstacle from '@/components/minigame-walk/ObstacleItem.vue'
import PooComponent from '@/components/minigame-walk/PooComponent.vue'
import Goal from '@/components/minigame-walk/GoalComponent.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import AnimatedComponent from '@/components/minigame-walk/AnimatedComponent.vue'
import { useStageNavigator } from '@/composables/useNavigation'
import { useMascotStore } from '@/stores/useMascotStore'
import { useGameState } from '@/composables/useGameState'
import { useCharacterActions } from '@/composables/useCharacterActions'
import {
  useElementSpawning,
  type AnimatedComponentWithSpeedMultiplier
} from '@/composables/useElementSpawning'

const mascot = useMascotStore()
const { goToNextStage } = useStageNavigator()
const { goalPositionX, isGoalVisible, gameState, collectedPoos } = useGameState()
const { characterAction, characterRef, triggerJump, handleJumpComplete } = useCharacterActions()
const animatedElements = reactive([] as AnimatedComponentWithSpeedMultiplier[])
const { spawnElementWithConfig, spawnInitialElements, lastElementSpawnTimes } =
  useElementSpawning(animatedElements)

const goalRef = ref<InstanceType<typeof Goal> | null>(null)
const hasGameStarted = ref(false)
let collisionTimeout: number | null = null
let animationTimeline: gsap.core.Timeline | null = null
const isAnimating = ref(false)

const startGame = () => {
  if (!hasGameStarted.value) {
    run()
    hasGameStarted.value = true
  }
}

const handleButtonClick = () => {
  if (hasGameStarted.value) {
    triggerJump()
  } else {
    startGame()
  }
}

const run = () => {
  characterAction.value = 'run'
  gsap.delayedCall(2, spawnObstacle)
  animate()
}

const spawnPoo = () => {
  characterRef.value?.abortAnimation()
  characterAction.value = 'poop'
  if (characterRef.value) {
    const characterRect = characterRef.value.$el.getBoundingClientRect()
    const positionX = characterRect.left + 30
    gsap.delayedCall(0.9, () => {
      gameState.poo = { positionX, collected: false }
      gsap.delayedCall(0.4, () => {
        characterAction.value = 'run'
        animate()
      })
    })
  }
}

const spawnObstacle = () => {
  gameState.obstacle = { positionX: window.innerWidth }
}

const spawnElement = () => {
  if (gameState.pooCount < 3 && Math.random() < 0.65) {
    spawnPoo()
  } else if (!isGoalVisible.value) {
    spawnObstacle()
  }
}

const collectPoo = () => {
  if (gameState.poo) {
    gameState.poo = null
    gameState.pooCount++
    checkGoalVisibility()
    if (!isGoalVisible.value) {
      spawnObstacle()
    }
  }
}

const handleJumpedOver = () => {
  gameState.stonesJumped++
  gameState.obstacle = null
  checkGoalVisibility()
  if (!isGoalVisible.value) {
    spawnElement()
  }
}

const checkGoalVisibility = () => {
  if (gameState.pooCount >= 3 && gameState.stonesJumped >= 6) {
    isGoalVisible.value = true
    mascot.showMessage('STAGE3_SUPER')
    goalPositionX.value = window.innerWidth + 100
  }
}

const handleCollision = () => {
  characterRef.value?.abortAnimation()
  characterAction.value = 'hurt'
  mascot.showMessage('STAGE3_OUTCH')
  collisionTimeout = window.setTimeout(resetGame, 2000)
}

const animateElements = () => {
  const duration = 0.01
  const distance = 4
  animatedElements.forEach((element, index) => {
    animationTimeline?.to(
      element,
      { positionX: `-=${distance * element.speedMultiplier}`, duration },
      0
    )
    if (element.positionX < -500) {
      animatedElements.splice(index, 1)
    }
  })
}

const animateObstacles = () => {
  const duration = 0.01
  const distance = 4
  if (gameState.poo) {
    animationTimeline?.to(gameState.poo, { positionX: `-=${distance}`, duration }, 0)
  }
  if (isGoalVisible.value) {
    animationTimeline?.to(goalPositionX, { value: `-=${distance}`, duration }, 0)
  }
  if (gameState.obstacle) {
    animationTimeline?.to(gameState.obstacle, { positionX: `-=${distance}`, duration }, 0)
  }
}

const handleSpawning = () => {
  const currentTime = Date.now()
  if (currentTime - lastElementSpawnTimes.cloud > 7500) {
    spawnElementWithConfig('cloud')
    lastElementSpawnTimes.cloud = currentTime
  }
  if (currentTime - lastElementSpawnTimes.fgBush > 1000) {
    spawnElementWithConfig('fgBush')
    lastElementSpawnTimes.fgBush = currentTime
  }
  if (currentTime - lastElementSpawnTimes.bgBush > 1500) {
    spawnElementWithConfig('bgBush')
    lastElementSpawnTimes.bgBush = currentTime
  }
}

const animate = () => {
  if (isAnimating.value) return
  isAnimating.value = true
  if (animationTimeline) {
    animationTimeline.kill()
  }

  const timelineConfig = {
    onUpdate: () => {
      if (['sit', 'poop', 'hurt'].includes(characterAction.value)) {
        animationTimeline?.kill()
        isAnimating.value = false
        return
      }

      if (gameState.poo && gameState.poo.positionX < -100) {
        resetGame()
        mascot.showMessage('STAGE3_MISSED_POO')
      }

      if (isGoalVisible.value && isCollidingWithGoal()) {
        checkWin()
      }
    },
    onComplete: () => {
      isAnimating.value = false
      if (['run', 'jump'].includes(characterAction.value)) {
        animate()
      }
    }
  }

  animationTimeline = gsap.timeline(timelineConfig)
  animateElements()
  animateObstacles()
  handleSpawning()
}

const isCollidingWithGoal = () => {
  if (!characterRef.value || !goalRef.value) return false
  const characterRect = characterRef.value.$el.getBoundingClientRect()
  const goalRect = goalRef.value.$el.getBoundingClientRect()
  return (
    characterRect.left < goalRect.right &&
    characterRect.right > goalRect.left &&
    characterRect.top < goalRect.bottom &&
    characterRect.bottom > goalRect.top
  )
}

const checkWin = () => {
  characterAction.value = 'sit'
  gsap.delayedCall(2.5, goToNextStage)
}

const resetGame = () => {
  goalPositionX.value = 0
  isGoalVisible.value = false
  characterAction.value = 'sit'
  gameState.poo = null
  gameState.obstacle = null
  gameState.pooCount = 0
  gameState.stonesJumped = 0
  animatedElements.length = 0
  hasGameStarted.value = false
  spawnInitialElements()
}

onMounted(() => {
  mascot.showMessage('STAGE3_GOWALK')
  resetGame()
})

onUnmounted(() => {
  if (collisionTimeout) clearTimeout(collisionTimeout)
})
</script>

<style scoped>
.game-path {
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: url('@/assets/minigame-walk/LoopedBackground.svg');
  background-size: auto 100%;
  background-repeat: repeat-x;
  background-position: center;
  height: 100%;
  width: 100%;
  z-index: 2;
}

.game-container {
  position: relative;
  background-color: #a9e5ff;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.skyline-container {
  position: absolute;
  bottom: 30vh;
  left: 0;
  height: 50vh;
  width: 100%;
  display: flex;
}

.skyline {
  position: absolute;
  bottom: 30vh;
  left: 0;
  height: 50vh;
  width: 100%;
  background: url('@/assets/minigame-walk/skyline.svg');
  background-size: auto 100%;
  background-repeat: repeat-x;
  z-index: 0;
}

.btnJump {
  position: fixed;
  bottom: 16px;
  left: 16px;
  padding: 1.5rem 3rem;
  z-index: 100;
}
</style>
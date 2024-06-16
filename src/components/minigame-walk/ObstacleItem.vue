<template>
  <div ref="obstacle" class="obstacle" :style="{ left: `${positionX}px` }">
    <img :src="StoneImg" alt="stone" class="image" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type ComponentPublicInstance } from 'vue'
import StoneImg from '@/assets/minigame-walk/stone.png'

export interface ObstacleType {
  positionX: number
  characterRef?: ComponentPublicInstance | null
}

const props = defineProps<ObstacleType>()

const emits = defineEmits(['collide', 'jumpedOver'])

const obstacle = ref<HTMLElement | null>(null)
let animationFrameId: number

const checkCollision = () => {
  const obstacleElement = obstacle.value
  const characterElement = props.characterRef?.$el

  if (!characterElement || !obstacleElement) return false

  const characterRect = characterElement.getBoundingClientRect()
  const obstacleRect = obstacleElement.getBoundingClientRect()

  // Check if the character's bottom is above the obstacle's top during a jump
  if (characterRect.bottom < obstacleRect.top) {
    return false
  }

  return (
    characterRect.left < obstacleRect.right &&
    characterRect.right > obstacleRect.left &&
    characterRect.top < obstacleRect.bottom &&
    characterRect.bottom > obstacleRect.top
  )
}

watch(
  () => props.positionX,
  () => {
    if (props.positionX < -100) {
      emits('jumpedOver')
      cancelAnimationFrame(animationFrameId)
    } else if (checkCollision()) {
      emits('collide')
      cancelAnimationFrame(animationFrameId)
    }
  }
)
</script>

<style scoped>
.obstacle {
  position: absolute;
  bottom: 20vh;
  z-index: 4;
}
.image {
  height: 64px;
}
</style>

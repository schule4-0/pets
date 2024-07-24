<template>
  <div :class="`food-item food-item-${food.id}`" :style="{ top: `-100px`, left: `${food.left}px` }">
    <img :src="foodImg" alt="food" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted } from 'vue'
import {
  useNutritionMinigameStore,
  type Food,
  NUTRITION_GAME_FALL_DURATION
} from '@/stores/nutritionGameStore'
import imgSausage from '@/assets/sausage.svg'
import imgSteak from '@/assets/steak.svg'
import imgCarrot from '@/assets/carrot.svg'
import imgChocolate from '@/assets/chocolate.svg'
import imgPhone from '@/assets/phone.svg'
import imgPoop from '@/assets/poop.svg'
import gsap from 'gsap'
import { useMascotStore } from '@/stores/useMascotStore'
import { useAudioManager } from '@/stores/useAudioManager'

const props = defineProps<{ food: Food }>()
const audioManager = useAudioManager()
const mascot = useMascotStore()

const nutritionMinigameStore = useNutritionMinigameStore()
let animation: gsap.core.Tween | null = null

const foodImg = computed(() => {
  const goodItems = [imgSausage, imgSteak, imgCarrot]
  const badItems = [imgPhone, imgPoop, imgChocolate]

  const items = props.food.isGood ? goodItems : badItems
  const randomIndex = Math.floor(Math.random() * items.length)

  return items[randomIndex]
})

const dropFood = async () => {
  const checkCollision = () => {
    const dogBowl = document.querySelector('.dog-bowl')
    const foodElement = document.querySelector(`.food-item-${props.food.id}`)
    if (dogBowl && foodElement) {
      const bowlRect = dogBowl.getBoundingClientRect()
      const foodRect = foodElement.getBoundingClientRect()

      if (
        bowlRect.left < foodRect.right &&
        bowlRect.right > foodRect.left &&
        bowlRect.top + 50 < foodRect.bottom &&
        bowlRect.bottom > foodRect.top
      ) {
        handleCollision()
      }
    }
  }

  const handleCollision = () => {
    if (animation) {
      animation.kill() // Stop the animation
    }
    if (props.food.isGood) {
      nutritionMinigameStore.incrementScore()
      audioManager.playSound('CORRECT_FOOD')
    } else {
      nutritionMinigameStore.decrementScore()
      mascot.showMessage('STAGE2_UNHEALTHY', { showMascot: false })
    }

    nutritionMinigameStore.removeFood(props.food.id)
  }

  const handleDropEnd = () => {
    nutritionMinigameStore.removeFood(props.food.id)
  }

  await nextTick() // Wait for the DOM to update
  animation = gsap.to(`.food-item-${props.food.id}`, {
    y: window.innerHeight + 100,
    duration: NUTRITION_GAME_FALL_DURATION,
    ease: 'linear',
    onUpdate: checkCollision,
    onComplete: handleDropEnd
  })
}

onMounted(() => {
  dropFood()
})

onUnmounted(() => {
  if (animation) {
    animation.kill() // Clean up the animation on unmount
  }
})
</script>

<style scoped>
.food-item {
  position: absolute;
  height: 48px;
  width: 48px;
  transition: top 0.1s linear;
}
</style>

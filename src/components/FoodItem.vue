<template>
  <div
    v-if="visible"
    :class="`food-item food-item-${food.id}`"
    :style="{ top: `${food.top}px`, left: `${food.left}px` }"
  >
    {{ food.isGood ? '🍖' : '🍫' }}
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useGameStore, type Food } from '@/stores/nutritionGameStore'
import gsap from 'gsap'

const props = defineProps<{ food: Food }>()

const store = useGameStore()
const visible = ref(true)
let animation: gsap.core.Tween | null = null

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
        bowlRect.top < foodRect.bottom &&
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
    visible.value = false // Hide the food item

    if (props.food.isGood) {
      console.log('GOOD')
      store.incrementScore()
    } else {
      console.log('BAD')
      store.decrementScore()
    }

    store.removeFood(props.food.id)
  }

  const handleDropEnd = () => {
    if (visible.value) {
      console.log('MISSED')
      visible.value = false // Hide the food item
      store.removeFood(props.food.id)
    }
  }

  await nextTick() // Wait for the DOM to update
  animation = gsap.to(`.food-item-${props.food.id}`, {
    y: window.innerHeight,
    duration: 6,
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
  font-size: 4rem;
  transition: top 0.1s linear;
}
</style>

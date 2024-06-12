<template>
  <div class="game">
    <div style="margin: 80px 16px; width: 320px">
      <ProgressBar :progress="score" :max="MAX_NUTRITION_GAME_SCORE" />
    </div>
    <DogBowl />
    <FoodItem v-for="food in foods" :key="food.id" :food="food" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useNutritionMinigameStore, MAX_NUTRITION_GAME_SCORE } from '@/stores/nutritionGameStore'
import DogBowl from '@/components/DogBowl.vue'
import FoodItem from '@/components/FoodItem.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { storeToRefs } from 'pinia'
import { useMascotStore } from '@/stores/useMascotStore'

const mascot = useMascotStore()

const { foods, score } = storeToRefs(useNutritionMinigameStore())
const { startGame, stopGame } = useNutritionMinigameStore()

let timeoutId: number

const startGameWithDelay = () => {
  timeoutId = window.setTimeout(() => {
    startGame()
    mascot.hideMascotItem()
  }, 4000)
}

onMounted(() => {
  mascot.showMessage('STAGE2_INTRODUCTION')
  startGameWithDelay()
})

onUnmounted(() => {
  clearTimeout(timeoutId)
  stopGame()
})
</script>

<style scoped>
.game {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: antiquewhite; /* TODO: replace with background graphic */
}
</style>

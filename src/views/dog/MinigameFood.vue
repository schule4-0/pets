<template>
  <div class="game">
    <div style="position: fixed; top: 80px; left: 16px; width: 320px">
      <ProgressBar :img-src="imgFoodBowl" :progress="score" :max="MAX_NUTRITION_GAME_SCORE" />
    </div>
    <DogBowl />
    <FoodItem v-for="food in foods" :key="food.id" :food="food" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useNutritionMinigameStore, MAX_NUTRITION_GAME_SCORE } from '@/stores/nutritionGameStore'
import DogBowl from '@/components/DogBowl.vue'
import FoodItem from '@/components/FoodItem.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { storeToRefs } from 'pinia'
import { useMascotStore } from '@/stores/useMascotStore'
import imgFoodBowl from '@/assets/equipment/dogfood.svg'
import imgSausage from '@/assets/sausage.svg'
import imgSteak from '@/assets/steak.svg'
import imgCarrot from '@/assets/carrot.svg'
import { useRewardStore } from '@/stores/useRewardStore'

const mascot = useMascotStore()
const rewardStore = useRewardStore()
const { foods, score } = storeToRefs(useNutritionMinigameStore())
const { startGame, stopGame, resetGame } = useNutritionMinigameStore()

watch(score, () => {
  if (score.value >= MAX_NUTRITION_GAME_SCORE) {
    mascot.showMessage('STAGE2_FEEDING_DONE', {
      onFinished: () => rewardStore.show([imgSteak, imgCarrot, imgSausage])
    })
  }
})

onMounted(() => {
  mascot.showMessage('STAGE2_INTRODUCTION', {
    onFinished: () => {
      startGame()
      mascot.hideMascotItem()
    }
  })
})

onUnmounted(() => {
  stopGame()
  resetGame()
})
</script>

<style scoped>
.game {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: antiquewhite; /* TODO: replace with background graphic */
}
</style>

<template>
  <div class="game">
    <div style="margin: 80px 16px; width: 320px">
      <ProgressBar :img-src="imgFoodBowl" :progress="score" :max="MAX_NUTRITION_GAME_SCORE" />
    </div>
    <DogBowl @start-drag="handleStartDogBowlDrag" />
    <FoodItem v-for="food in foods" :key="food.id" :food="food" />
  </div>
  <RewardGame
    v-if="showReward"
    :solution-images="[imgCake, imgChocolate]"
    @finish="goToNextStage"
  ></RewardGame>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useNutritionMinigameStore, MAX_NUTRITION_GAME_SCORE } from '@/stores/nutritionGameStore'
import DogBowl from '@/components/DogBowl.vue'
import FoodItem from '@/components/FoodItem.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import RewardGame from '@/components/RewardCard.vue'
import { storeToRefs } from 'pinia'
import { useMascotStore } from '@/stores/useMascotStore'
import imgFoodBowl from '@/assets/equipment/dogfood.svg'
import imgCake from '@/assets/cake.svg'
import imgChocolate from '@/assets/chocolate.svg'
import { useStageNavigator } from '@/composables/useNavigation'

const { goToNextStage } = useStageNavigator()
const mascot = useMascotStore()

const { foods, score } = storeToRefs(useNutritionMinigameStore())
const { startGame, stopGame, resetGame } = useNutritionMinigameStore()

const showReward = ref(false)

watch(score, () => {
  if (score.value >= MAX_NUTRITION_GAME_SCORE) {
    showReward.value = true
  }
})

const handleStartDogBowlDrag = () => {
  startGame()
  mascot.hideMascotItem()
}

onMounted(() => {
  mascot.showMessage('STAGE2_INTRODUCTION')
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
  height: 100vh;
  overflow: hidden;
  background-color: antiquewhite; /* TODO: replace with background graphic */
}
</style>

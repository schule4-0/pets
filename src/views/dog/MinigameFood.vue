<template>
  <div class="game">
    <div style="position: fixed; top: 80px; left: 16px; width: 320px">
      <ProgressBar :img-src="imgFoodBowl" :progress="score" :max="MAX_NUTRITION_GAME_SCORE" />
    </div>
    <DogBowl @start-drag="handleStartDogBowlDrag" />
    <FoodItem v-for="food in foods" :key="food.id" :food="food" />
  </div>
  <RewardGame
    v-if="showReward"
    :solution-images="[imgMeat, imgBone]"
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
import imgBone from '@/assets/bone_border_space.png'
import imgMeat from '@/assets/meat.png'
import { useStageNavigator } from '@/composables/useNavigation'

const { goToNextStage } = useStageNavigator()
const mascot = useMascotStore()

const { foods, score } = storeToRefs(useNutritionMinigameStore())
const { startGame, stopGame, resetGame } = useNutritionMinigameStore()

const showReward = ref(false)

watch(score, () => {
  if (score.value >= MAX_NUTRITION_GAME_SCORE) {
    mascot.showMessage('STAGE2_FEEDING_DONE')
    setTimeout(() => {
      showReward.value = true
    }, 8000)
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

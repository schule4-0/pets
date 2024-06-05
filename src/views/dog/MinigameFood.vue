<template>
  <div class="game">
    <button @click="goToNextStage">Nächstes Minigame</button>
    <DogBowl />
    <FoodItem v-for="food in foods" :key="food.id" :food="food" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/nutritionGameStore'
import DogBowl from '@/components/DogBowl.vue'
import FoodItem from '@/components/FoodItem.vue'
import { storeToRefs } from 'pinia'
import { useStageNavigator } from '@/composables/useNavigation'

const { goToNextStage } = useStageNavigator()

const { foods } = storeToRefs(useGameStore())
const { startGame } = useGameStore()

onMounted(() => {
  startGame()
})
</script>

<style scoped>
.game {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>

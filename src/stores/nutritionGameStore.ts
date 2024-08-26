import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAudioManager } from './useAudioManager'
import {
  MAX_NUTRITION_GAME_SCORE,
  NUTRITION_GAME_FOOD_DROP_DELAY
} from '@/config/minigameNutritionConfig'

export interface Food {
  id: number
  left: number
  isGood: boolean
}

export const useNutritionMinigameStore = defineStore('nutritionMinigame', () => {
  const foods = ref<Food[]>([])
  const hasStarted = ref(false)
  const score = ref(0)
  let nextId = 0
  const intervalId = ref<number | null>(null)
  const audioManager = useAudioManager()
  const bgMusicId = ref<string | undefined>(undefined)

  const dropFood = () => {
    const screenWidth = window.innerWidth
    const foodWidth = 64 // 16 * 4
    const newFood: Food = {
      id: nextId++,
      left: Math.random() * (screenWidth - foodWidth * 2) + foodWidth,
      isGood: Math.random() > 0.5
    }
    foods.value.push(newFood)
  }

  const startGame = async () => {
    if (hasStarted.value) return
    bgMusicId.value = await audioManager.playSound('BG_MUSIC_NUTRITION', {
      loop: true,
      volume: 0.1
    })
    hasStarted.value = true

    if (intervalId.value === null) {
      intervalId.value = window.setInterval(() => {
        if (score.value < MAX_NUTRITION_GAME_SCORE) {
          dropFood()
        } else {
          foods.value = []
          if (intervalId.value !== null) {
            clearInterval(intervalId.value)
            intervalId.value = null
          }
        }
      }, NUTRITION_GAME_FOOD_DROP_DELAY)
    }
  }

  const stopGame = () => {
    resetGame()
  }

  const resetGame = () => {
    hasStarted.value = false

    if (bgMusicId.value) {
      audioManager.stopSound(bgMusicId.value)
    }

    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
    score.value = 0
    nextId = 0
    foods.value = []
  }

  const incrementScore = () => {
    if (score.value < MAX_NUTRITION_GAME_SCORE) {
      score.value++
    }
  }

  const decrementScore = () => {
    if (score.value > 0) {
      score.value--
    }
  }

  const removeFood = (id: number) => {
    foods.value = foods.value.filter((food) => food.id !== id)
  }

  const currentScore = computed(() => score.value)

  return {
    foods,
    score,
    startGame,
    stopGame,
    resetGame,
    incrementScore,
    decrementScore,
    removeFood,
    currentScore
  }
})

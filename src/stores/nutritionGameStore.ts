import { useSound } from '@/composables/sound'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import backgroundMusic from '@/assets/audio/backgroundMusic/minigameFood_backgroundMusic.mp3'

export interface Food {
  id: number
  left: number
  isGood: boolean
}

export const NUTRITION_GAME_FOOD_DROP_DELAY = 2000 as const
export const MAX_NUTRITION_GAME_SCORE = 5 as const
export const NUTRITION_GAME_FALL_DURATION = 5 as const
export const useNutritionMinigameStore = defineStore('nutritionMinigame', () => {
  const foods = ref<Food[]>([])
  const hasStarted = ref(false)
  const score = ref(0)
  let nextId = 0
  const intervalId = ref<number | null>(null)
  const sound = useSound()

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

  const startGame = () => {
    if (hasStarted.value) return
    sound.playBackgroundMusic(backgroundMusic, 0.5)
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
    sound.stopBackgroundMusic()
    hasStarted.value = false
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
    score.value = 0
    nextId = 0
    foods.value = []
  }

  const resetGame = () => {
    hasStarted.value = false
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

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Food {
  id: number
  top: number
  left: number
  isGood: boolean
}

export const useGameStore = defineStore('game', () => {
  const FOOD_DROP_DELAY = 1500 as const
  const NUM_GOOD_FOOD_NEEDED_FOR_WIN = 3 as const
  const foods = ref<Food[]>([])
  const score = ref(0)
  let nextId = 0
  const intervalId = ref<number | null>(null)

  const dropFood = () => {
    const screenWidth = window.innerWidth
    const foodWidth = 64 // 16 * 4
    const newFood: Food = {
      id: nextId++,
      top: 0,
      left: Math.random() * (screenWidth - foodWidth * 2) + foodWidth,
      isGood: Math.random() > 0.3
    }
    foods.value.push(newFood)
  }

  const startGame = () => {
    if (intervalId.value === null) {
      intervalId.value = window.setInterval(() => {
        if (score.value < NUM_GOOD_FOOD_NEEDED_FOR_WIN) {
          dropFood()
        } else {
          console.log('GAME COMPLETED')
          if (intervalId.value !== null) {
            clearInterval(intervalId.value)
            intervalId.value = null
          }
        }
      }, FOOD_DROP_DELAY)
    }
  }

  const incrementScore = () => {
    score.value++
  }

  const decrementScore = () => {
    score.value--
  }

  const removeFood = (id: number) => {
    foods.value = foods.value.filter((food) => food.id !== id)
  }

  const currentScore = computed(() => score.value)

  return { foods, score, startGame, incrementScore, decrementScore, removeFood, currentScore }
})

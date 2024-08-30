import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNutritionMinigameStore } from '@/stores/nutritionGameStore'
import {
  MAX_NUTRITION_GAME_SCORE,
  NUTRITION_GAME_FOOD_DROP_DELAY
} from '@/config/minigameNutritionConfig'

// Mock the useAudioManager function
vi.mock('@/stores/useAudioManager', () => ({
  useAudioManager: vi.fn().mockReturnValue({
    playSound: vi.fn().mockResolvedValue('mock-music-id'),
    stopSound: vi.fn()
  })
}))

describe('useNutritionMinigameStore', () => {
  let store: ReturnType<typeof useNutritionMinigameStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useNutritionMinigameStore()

    // Mock window methods with type assertions
    globalThis.window = Object.create(globalThis)
    globalThis.window.setInterval = vi.fn((fn: TimerHandler, timeout?: number) =>
      setInterval(fn, timeout)
    ) as unknown as typeof setInterval
    globalThis.window.clearInterval = vi.fn((id: number) =>
      clearInterval(id)
    ) as unknown as typeof clearInterval
    globalThis.window.innerWidth = 1024 // Mock window width
  })

  it('initializes with correct default values', () => {
    expect(store.foods).toEqual([])
    expect(store.score).toBe(0)
    expect(store.currentScore).toBe(0)
    expect(store.foods).toHaveLength(0)
  })

  it('starts the game and drops food', async () => {
    await store.startGame()

    // Wait for food to drop
    await new Promise((resolve) => setTimeout(resolve, NUTRITION_GAME_FOOD_DROP_DELAY + 10))

    expect(store.foods.length).toBeGreaterThan(0)
    expect(store.score).toBe(0)
    expect(store.foods[0].id).toBe(0)
    expect(store.foods[0].left).toBeGreaterThan(0)
    expect(store.foods[0].isGood).toBeDefined()
  })

  it('stops the game and resets values', async () => {
    await store.startGame()
    store.stopGame()

    expect(store.foods).toEqual([])
    expect(store.score).toBe(0)
    expect(store.currentScore).toBe(0)
  })

  it('increments and decrements the score correctly', () => {
    store.incrementScore()
    expect(store.currentScore).toBe(1)

    store.decrementScore()
    expect(store.currentScore).toBe(0)
  })

  it('does not increment score beyond max', () => {
    for (let i = 0; i < MAX_NUTRITION_GAME_SCORE + 1; i++) {
      store.incrementScore()
    }
    expect(store.currentScore).toBe(MAX_NUTRITION_GAME_SCORE)
  })

  it('removes food item by id', () => {
    const food = { id: 1, left: 50, isGood: true }
    store.foods.push(food)
    expect(store.foods).toContainEqual(food)

    store.removeFood(1)
    expect(store.foods).not.toContainEqual(food)
  })

  it('resets the game properly', async () => {
    await store.startGame()
    store.resetGame()

    expect(store.foods).toEqual([])
    expect(store.score).toBe(0)
    expect(store.currentScore).toBe(0)
  })
})

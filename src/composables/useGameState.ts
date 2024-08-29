import type { ObstacleType } from '@/components/minigame-walk/ObstacleItem.vue'
import type { PooType } from '@/components/minigame-walk/PooComponent.vue'
import imgPoo from '@/assets/images/dog/poop.svg'
import { ref, reactive, computed } from 'vue'

export const useGameState = () => {
  const goalPositionX = ref(0)
  const isGoalVisible = ref(false)
  const gameState = reactive({
    poo: null as PooType | null,
    obstacle: null as ObstacleType | null,
    pooCount: 0,
    stonesJumped: 0
  })

  const collectedPoos = computed(() => {
    const items = []
    const totalItems = 3
    for (let i = 0; i < totalItems; i++) {
      items.push({
        id: i + 1,
        collected: i < gameState.pooCount,
        image: imgPoo
      })
    }
    return items
  })

  return {
    goalPositionX,
    isGoalVisible,
    gameState,
    collectedPoos
  }
}

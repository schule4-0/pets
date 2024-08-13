<template>
  <div class="game-container">
    <ScoreBoard :items="collectableItems" />

    <div class="drop-area">
      <DropArea @droppedInArea="handleDropInArea" :image="backpackImg" width="10vw" />
    </div>

    <DraggableItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :image="item.image"
      :initialX="item.initialX"
      :initialY="item.initialY"
      :collected="item.collected"
      :is-input-blocked="isGameFinished"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import DraggableItem, { type DraggableItemType } from '@/components/DraggableItem.vue'
import DropArea from '@/components/DropArea.vue'
import backpackImg from '@/assets/equipment/backpack_closed.svg'
import { useMascotStore } from '@/stores/useMascotStore'
import { useRewardStore } from '@/stores/useRewardStore'
import ScoreBoard from '@/components/ScoreBoard.vue'
import { useAudioManager } from '@/stores/useAudioManager'
import minigameEquipmentItems, { type EquipmentItem } from '@/config/minigameEquipmentConfig'

interface DraggableEquipmentItem extends EquipmentItem, DraggableItemType {}

// Stores & Composables
const mascot = useMascotStore()
const rewardStore = useRewardStore()
const audioManager = useAudioManager()

// Reactive State
const solutionImages = ref<string[]>([])
const isGameFinished = ref(false)

const items = ref<DraggableEquipmentItem[]>(
  minigameEquipmentItems.map((dragItem) => ({ ...dragItem, collected: false }))
)

// Lifecycle methods
onMounted(() => {
  mascot.showMessage('STAGE1_BACKPACK')
  solutionImages.value = minigameEquipmentItems
    .filter((item) => item.type === 'accepted')
    .map((item) => item.image)
})

// Computed properties
const collectableItems = computed(() => items.value.filter((item) => item.type === 'accepted'))

// Methods

const collectItem = (id: number) => {
  items.value = items.value.map((item) => (item.id === id ? { ...item, collected: true } : item))

  if (collectableItems.value.every((item) => item.collected)) {
    isGameFinished.value = true
  }
}

const handleDropInArea = (id: number) => {
  const item = items.value.find((item) => item.id === id)
  if (!item) return

  if (item.type === 'accepted') {
    collectItem(id)
    audioManager.playSound('CORRECT_BLING_SOUND')
    mascot.showMessage(item.mascotMessageKey, {
      onFinished: () => {
        if (isGameFinished.value) rewardStore.show(solutionImages.value)
      }
    })
  } else {
    audioManager.playSound('DOG_HOWLING')
    mascot.showMessage(item.mascotMessageKey)
  }
}
</script>

<style scoped lang="scss">
.game-container {
  position: relative;
  background-image: url('@/assets/equipment/Room.svg');
  background-size: cover;
  background-position: center;
  padding: 1.25rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.drop-area {
  position: absolute;
  bottom: 3vw;
  left: 3vw;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vw;
  width: 20vw;
}
</style>

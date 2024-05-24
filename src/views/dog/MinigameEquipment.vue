<template>
  <div class="game-container">
    <example-component>
      <template #game-title>
        <h2>Equipment</h2>
      </template>
      <template #game-description>
        <div>Wir befinden uns im Minigame "Equipment".</div>
      </template>
    </example-component>

    <DropArea @droppedInArea="handleDropInArea" />

    <DraggableItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :type="item.type"
      :image="item.image"
      :initialX="item.initialX"
      :initialY="item.initialY"
    />

    <button @click="goToNextStage">Nächstes Minigame</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DraggableItem, { type DraggableItemType } from '@/components/DraggableItem.vue'
import DropArea from '@/components/DropArea.vue'
import ExampleComponent from '@/components/ExampleComponent.vue'
import { useStageNavigator } from '@/composables/useNavigation'
import { useMascotStore } from '@/stores/useMascotStore'
import boneImg from '../../assets/bone.png'
import bookImg from '../../assets/book.png'

const { goToNextStage } = useStageNavigator()

const mascotPopup = useMascotStore()

const items = ref<DraggableItemType[]>([
  { id: 1, type: 'accepted', image: boneImg, initialX: 10, initialY: 80 },
  { id: 2, type: 'rejected', image: bookImg, initialX: 10, initialY: 50 }
])

const removeItem = (id: number) => {
  items.value = items.value.filter((i) => i.id !== id)
}

const handleDropInArea = (item: {
  id: number
  isWithin: boolean
  type: 'accepted' | 'rejected'
}) => {
  console.log('handleDropInArea', item)
  if (item.type === 'accepted') {
    removeItem(item.id)
    mascotPopup.showMessage('Richtig!')
    console.log('Richtig!')
  } else {
    mascotPopup.showMessage('Das stimmt leider nicht!')
    console.log('Das stimmt leider nicht!')
  }
}
</script>

<style scoped>
.game-container {
  position: relative;
  background-image: url('@/assets/test-room.jpeg');
  background-size: cover;
  background-position: center;
  padding: 20px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Aligns children vertically in the center */
  align-items: center; /* Aligns children horizontally in the center */
}

.drop-area-wrapper {
  margin-bottom: 20px; /* Optional: Add some space below the DropArea */
}
</style>

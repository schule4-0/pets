<template>
  <div class="game-container">
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
import { onMounted } from 'vue'
import { useStageNavigator } from '@/composables/useNavigation'
import boneImg from '@/assets/equipment/bone.png'
import bookImg from '@/assets/equipment/book.png'
import mascotMessages from '@/config/mascotMessages'
import { useMascotStore } from '@/stores/useMascotStore'

const { goToNextStage } = useStageNavigator()

const mascot = useMascotStore()
//TODO: dynamic loading of correct messages according to route
const equipmentMessages = mascotMessages.dog.stage1
const generalMessages = mascotMessages.general.expressions

onMounted(() => {
  mascot.showMascotItem()
  mascot.setMessage(equipmentMessages.message2)
  mascot.showMessage()
})

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
    mascot.setMessage(generalMessages.correct)
  } else {
    mascot.setMessage(generalMessages.wrong)
  }
}
</script>

<style scoped>
.game-container {
  position: relative;
  background-image: url('@/assets/equipment/test-room.jpeg');
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

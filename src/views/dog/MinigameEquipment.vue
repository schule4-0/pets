<template>
  <div>
    <example-component>
      <template #game-title>
        <h2>Equipment</h2>
      </template>
      <template #game-description>
        <div>Wir befinden uns im Miniagem "Equipment".</div>
      </template>
    </example-component>

    <DropArea @droppedInArea="handleDropInArea" />
    <DraggableItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :type="item.type"
      :content="item.content"
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

const { goToNextStage } = useStageNavigator()

const mascotPopup = useMascotStore()

const items = ref<DraggableItemType[]>([
  { id: 1, type: 'accepted', content: 'Accepted', initialX: 50, initialY: 50, x: 50, y: 50 },
  { id: 2, type: 'rejected', content: 'Rejected', initialX: 50, initialY: 250, x: 50, y: 250 }
])

const removeItem = (id: number) => {
  items.value = items.value.filter((i) => i.id !== id)
}

const handleDropInArea = (item: {
  id: number
  isWithin: boolean
  type: 'accepted' | 'rejected'
}) => {
  if (item.type === 'accepted') {
    removeItem(item.id)
    mascotPopup.showMessage('Richtig!')
  } else {
    mascotPopup.showMessage('Das stimmt leider nicht!')
  }
}
</script>

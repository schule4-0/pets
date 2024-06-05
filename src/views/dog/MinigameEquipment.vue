<template>
  <div class="game-container">
    <DropArea @droppedInArea="handleDropInArea" :image="backpackImg" width="10vw" />

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

    <RewardGame v-if="showReward" :solution-images="solutionImages" @finish="handleRewardFinish">
      <template #solution="{ solutionImages }">
        <div class="solution">
          <p>Rockys Utensilien</p>
          <div class="solution-images">
            <img v-for="image in solutionImages" :key="image" :src="image" class="solution-image" />
          </div>
        </div>
      </template>
    </RewardGame>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DraggableItem, { type DraggableItemType } from '@/components/DraggableItem.vue'
import DropArea from '@/components/DropArea.vue'
import RewardGame from '@/components/RewardCard.vue'
import { useStageNavigator } from '@/composables/useNavigation'
import boneImg from '@/assets/equipment/bone.png'
import bookImg from '@/assets/equipment/book.png'
import backpackImg from '@/assets/equipment/backpack.png'
import { useMascotStore } from '@/stores/useMascotStore'

const { goToNextStage } = useStageNavigator()
const mascot = useMascotStore()

onMounted(() => {
  mascot.showMessage('STAGE1_BACKPACK', 1000)
  solutionImages.value = items.value.filter(item => item.type === 'accepted').map(item => item.image)
})

const items = ref<DraggableItemType[]>([
  { id: 1, type: 'accepted', image: boneImg, initialX: 10, initialY: 80 },
  { id: 2, type: 'rejected', image: bookImg, initialX: 10, initialY: 50 }
])

const removeItem = (id: number) => {
  items.value = items.value.filter((i) => i.id !== id)
}

const checkAllAcceptedItemsRemoved = () => {
  return items.value.every(item => item.type !== 'accepted')
}

const solutionImages = ref<string[]>([])

const handleDropInArea = (item: {
  id: number
  isWithin: boolean
  type: 'accepted' | 'rejected'
}) => {
  console.log('handleDropInArea', item)
  if (item.type === 'accepted') {
    removeItem(item.id)
    mascot.showMessage('GENERAL_RIGHT')
    if (checkAllAcceptedItemsRemoved()) {
      setTimeout(() => {
        showReward.value = true
      }, 4000);
    }
  } else {
    mascot.showMessage('GENERAL_WRONG')
  }
}

const showReward = ref(false)

const handleRewardFinish = () => {
  goToNextStage()
  showReward.value = false
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
  justify-content: center;
  align-items: center;
}

.drop-area-wrapper {
  margin-bottom: 20px;
}
</style>

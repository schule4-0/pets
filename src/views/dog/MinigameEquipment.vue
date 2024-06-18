<template>
  <div class="game-container">
    <div class="drop-area-container">
      <DropArea @droppedInArea="handleDropInArea" :image="backpackImg" width="10vw" />
    </div>

    <DraggableItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :type="item.type"
      :image="item.image"
      :initialX="item.initialX"
      :initialY="item.initialY"
      :collected="item.collected"
    />

    <ScoreBoard :items="collectableItems" />

    <RewardGame
      v-if="showReward"
      :solution-images="solutionImages"
      @finish="handleRewardFinish"
    ></RewardGame>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import DraggableItem, { type DraggableItemType } from '@/components/DraggableItem.vue'
import DropArea from '@/components/DropArea.vue'
import RewardGame from '@/components/RewardCard.vue'
import { useStageNavigator } from '@/composables/useNavigation'
import bookImg from '@/assets/equipment/book.svg'
import dogFoodImg from '@/assets/equipment/dogfood.svg'
import backpackImg from '@/assets/equipment/backpack_closed.svg'
import boneImg from '@/assets/equipment/bone_border.png'
import cardGameImg from '@/assets/equipment/Cardgame.svg'
import dogleashImg from '@/assets/equipment/Dogleash.svg'
import ballImg from '@/assets/equipment/Ball.svg'
import { useMascotStore } from '@/stores/useMascotStore'
import ScoreBoard from '@/components/ScoreBoard.vue'
import { useSound } from '@/composables/sound'
import correctSound from '@/assets/audio/soundEffects/correct_answer.mp3'
import wrongSound from '@/assets/audio/soundEffects/dog_howling1.mp3'

const { goToNextStage } = useStageNavigator()
const mascot = useMascotStore()
const sound = useSound()

onMounted(() => {
  mascot.showMessage('STAGE1_BACKPACK')
  solutionImages.value = items.value
    .filter((item) => item.type === 'accepted')
    .map((item) => item.image)
})

const items = ref<DraggableItemType[]>([
  { id: 1, type: 'accepted', image: boneImg, initialX: 45, initialY: 90, collected: false },
  { id: 2, type: 'accepted', image: dogFoodImg, initialX: 24, initialY: 83, collected: false },
  { id: 3, type: 'accepted', image: ballImg, initialX: 34, initialY: 54.5, collected: false },
  { id: 4, type: 'accepted', image: dogleashImg, initialX: 72, initialY: 21.5, collected: false },
  { id: 5, type: 'rejected', image: bookImg, initialX: 60, initialY: 68, collected: false },
  { id: 6, type: 'rejected', image: cardGameImg, initialX: 85, initialY: 15.5, collected: false }
])

const collectableItems = computed(() => items.value.filter((item) => item.type === 'accepted'))

const collectItem = (id: number) => {
  items.value = items.value.map((item) => {
    if (item.id === id) {
      return { ...item, collected: true }
    }
    return item
  })
}

const checkAllAcceptedItemsRemoved = () => {
  return collectableItems.value.every(
    (item) => (item.type === 'accepted' && item.collected) || item.type === 'rejected'
  )
}

const solutionImages = ref<string[]>([])

const handleDropInArea = (item: {
  id: number
  isWithin: boolean
  type: 'accepted' | 'rejected'
}) => {
  if (item.type === 'accepted') {
    collectItem(item.id)
    sound.play(correctSound)
    mascot.showMessage('GENERAL_RIGHT')
    if (checkAllAcceptedItemsRemoved()) {
      setTimeout(() => {
        showReward.value = true
      }, 4000)
    }
  } else {
    sound.play(wrongSound)
    mascot.showMessage('STAGE1_WRONG')
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
  background-image: url('@/assets/equipment/Room.svg');
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

.drop-area-container {
  position: absolute;
  bottom: 3vw;
  left: 3vw;
  background-color: rgb(255, 255, 255, 0.7);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vw;
  width: 20vw;
}
</style>

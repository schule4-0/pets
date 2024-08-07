<template>
  <div class="container">
    <div style="position: fixed; top: 80px; left: 16px; width: 320px">
      <ProgressBar
        :img-src="progressObject.imgSrc"
        :progress="progressObject.currentProgress ?? 0"
        :max="progressObject.maxProgress"
      />
    </div>
    <div class="dog-container">
      <CareTimeDog
        @bubble-counter="handleBubbleChange"
        @water-drop-counter="handleWaterDropChange"
        :width="dogSize"
        :height="dogSize"
        @completed="() => rewardStore.show(solutionImages)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import CareTimeDog from '@/components/CareTimeDog.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { useMascotStore } from '@/stores/useMascotStore'
import imgShampoo from '@/assets/shampoo.svg'
import imgShowerHead from '@/assets/Showerhead_water.svg'
import imgDryer from '@/assets/dryer.png'
import { useCareTimeToolStore } from '@/stores/careTimeToolStore'
import { storeToRefs } from 'pinia'
import { useRewardStore } from '@/stores/useRewardStore'

const mascot = useMascotStore()

const { currentState } = storeToRefs(useCareTimeToolStore())
export type CareTimeState = 'shampooing' | 'showering' | 'drying' | 'gameCompleted'

const bubbleCounter = ref(0)
const waterDropCounter = ref(0)
const maxWaterDropCounter = ref(0)
const rewardStore = useRewardStore()
const solutionImages = ref<string[]>([])

let messageTimeOut: number

const handleBubbleChange = (counter: number) => {
  bubbleCounter.value = counter
}

const handleWaterDropChange = (counter: number) => {
  waterDropCounter.value = counter
  if (counter > maxWaterDropCounter.value) maxWaterDropCounter.value = counter
}

const progressObject = computed(() => {
  switch (currentState.value) {
    case 'shampooing':
      return { imgSrc: imgShampoo, maxProgress: 100, currentProgress: bubbleCounter.value }
    case 'showering':
      return {
        imgSrc: imgShowerHead,
        maxProgress: 100,
        currentProgress: 100 - bubbleCounter.value
      }
    case 'drying':
      return {
        imgSrc: imgDryer,
        maxProgress: maxWaterDropCounter.value,
        currentProgress: maxWaterDropCounter.value - waterDropCounter.value
      }
    default:
      return { imgSrc: imgDryer, maxProgress: 100, currentProgress: 100 }
  }
})

const dogSize = computed(() => {
  const viewWidth = window.innerWidth
  const viewHeight = window.innerHeight
  const size = Math.min(viewWidth, viewHeight) * 0.8
  return size
})

onMounted(() => {
  solutionImages.value = [imgShampoo, imgShowerHead, imgDryer]
  mascot.showMessage('STAGE4_INTRODUCTION', {
    onFinished: () => {
      mascot.showMessage('STAGE4_SHAMPOO_EXPLANATION')
    }
  })
  currentState.value = 'shampooing'
})

onUnmounted(() => {
  clearTimeout(messageTimeOut)
})
</script>

<style scoped>
.container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/BathBlank.svg');
  background-size: cover;
  background-position: center;
}

.dog-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>

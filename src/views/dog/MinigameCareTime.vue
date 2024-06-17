<template>
  <div class="container">
    <div style="position: fixed; margin: 80px 16px; width: 320px">
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
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import CareTimeDog from '@/components/CareTimeDog.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { useMascotStore } from '@/stores/useMascotStore'
import imgShampoo from '@/assets/shampoo.svg'
import imgPlaceholder from '@/assets/logo.svg'
import { useCareTimeToolStore } from '@/stores/careTimeToolStore'
import { storeToRefs } from 'pinia'

const mascot = useMascotStore()

const { currentState } = storeToRefs(useCareTimeToolStore())
export type CareTimeState = 'shampooing' | 'showering' | 'drying' | 'gameCompleted'

const bubbleCounter = ref(0)
const waterDropCounter = ref(0)
const maxWaterDropCounter = ref(0)

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
        imgSrc: imgPlaceholder,
        maxProgress: 100,
        currentProgress: 100 - bubbleCounter.value
      }
    case 'drying':
      return {
        imgSrc: imgPlaceholder,
        maxProgress: maxWaterDropCounter.value,
        currentProgress: maxWaterDropCounter.value - waterDropCounter.value
      }
    default:
      return { imgSrc: imgPlaceholder, maxProgress: 100, currentProgress: 100 }
  }
})

const dogSize = computed(() => {
  const viewWidth = window.innerWidth
  const viewHeight = window.innerHeight
  const size = Math.min(viewWidth, viewHeight) * 0.8
  return size
})

onMounted(() => {
  mascot.showMessage('STAGE4_INTRODUCTION')
})
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-color: cornsilk;
}

.dog-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

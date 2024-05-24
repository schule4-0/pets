<template>
  <div class="container">
    <div class="dog-container">
      <CareTimeDog
        :width="dogSize"
        :height="dogSize"
        :current-state="currentState"
        :on-is-showered="onIsShowered"
        :on-is-shampooed="onIsShampooed"
      />
    </div>
    <div class="toolbar-container">
      <CareTimeToolbar :current-state="currentState" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import CareTimeDog from '@/components/CareTimeDog.vue'
import CareTimeToolbar from '@/components/CareTimeToolbar.vue'

import { useMascotStore } from '@/stores/useMascotStore'
import mascotMessages from '@/config/mascotMessages'

const mascot = useMascotStore()
const careTimeMessages = mascotMessages.dog.stage3

export type CareTimeState = 'shampooing' | 'showering' | 'drying'
export type CareTimeTool = 'shampoo' | 'shower' | 'hairDryer'
const currentState = ref<CareTimeState>('shampooing')

const dogSize = computed(() => {
  const viewWidth = window.innerWidth
  const viewHeight = window.innerHeight
  const size = Math.min(viewWidth, viewHeight) * 0.8
  return size
})

onMounted(() => {
  mascot.showMascotItem()
  mascot.setMessage(careTimeMessages.introduction)
  mascot.showMessage()
})

const onIsShampooed = () => {
  mascot.showMascotItem()
  mascot.setMessage(careTimeMessages.rockyIsShapooed)
  mascot.showMessage()

  currentState.value = 'showering'
}

const onIsShowered = () => {
  mascot.showMascotItem()
  mascot.setMessage(careTimeMessages.gameCompleted)
  mascot.showMessage()

  currentState.value = 'drying'
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding: 20px;
}

.dog-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolbar-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}
</style>

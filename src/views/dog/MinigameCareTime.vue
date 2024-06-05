<template>
  <div class="container">
    <button @click="goToNextStage">Nächstes Minigame</button>
    <div class="dog-container">
      <CareTimeDog
        :width="dogSize"
        :height="dogSize"
        :current-state="currentState"
        :on-is-showered="onIsShowered"
        :on-is-shampooed="onIsShampooed"
        :on-is-dryed="onIsDryed"
        :on-is-completed="onIsCompleted"
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
import { useStageNavigator } from '@/composables/useNavigation'

const { goToNextStage } = useStageNavigator()
const mascot = useMascotStore()

export type CareTimeState = 'shampooing' | 'showering' | 'drying' | 'gameCompleted'
export type CareTimeTool = 'shampoo' | 'shower' | 'hairDryer'
const currentState = ref<CareTimeState>('shampooing')

const dogSize = computed(() => {
  const viewWidth = window.innerWidth
  const viewHeight = window.innerHeight
  const size = Math.min(viewWidth, viewHeight) * 0.8
  return size
})

onMounted(() => {
  mascot.showMessage('STAGE4_INTRODUCTION')
})

const onIsShampooed = () => {
  mascot.showMessage('STAGE4_IS_SHAMPOOED')

  currentState.value = 'showering'
}

const onIsShowered = () => {
  mascot.showMessage('STAGE4_IS_SHOWERED')

  currentState.value = 'drying'
}

const onIsDryed = () => {
  mascot.showMessage('STAGE4_IS_DRYED')

  currentState.value = 'gameCompleted'
}

const onIsCompleted = () => {
  // TODO: Do something
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

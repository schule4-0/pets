<template>
  <div class="container">
    <div class="background"></div>
    <img class="stationary-image" :src="imgLisaFullBody" alt="Lisa" style="height: 420px" />
    <img class="walking-image" :src="imgRockySitting" alt="Rocky Sitting" style="height: 230px" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useMascotStore } from '@/stores/useMascotStore'
import { useStageStore } from '@/stores/useStageStore'
import { useRouter } from 'vue-router'
import imgLisaFullBody from '@/assets/images/mascot/lisa_full_body.svg'
import imgRockySitting from '@/assets/images/dog/rocky/Rocky_sitting.svg'

const router = useRouter()
const mascot = useMascotStore()
const stageTransition = useStageStore()

onMounted(() => {
  setTimeout(() => {
    mascot.showMessage('GAME_FINISHED', {
      showMascot: false,
      onFinished: () => {
        stageTransition.startStageTransition(() => {
          router.push(`/`)
        })
      }
    })
  })
})

onUnmounted(() => {
  mascot.cancelMessage()
})
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/dog/backgrounds/bg_living_room.svg');
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.stationary-image {
  position: absolute;
  bottom: 5vh;
  left: 50%;
  z-index: 2;
}

.walking-image {
  position: absolute;
  bottom: 5vh;
  left: 40vw;
  z-index: 3;
}
</style>

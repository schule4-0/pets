<template>
  <div class="container">
    <div class="background"></div>
    <img
      class="stationary-image"
      src="@/assets/LisaFullBody.svg"
      alt="Stationary"
      style="height: 420px"
    />
    <img
      class="walking-image"
      src="@/assets/rocky/Rocky_sitting.svg"
      alt="Sitting"
      style="height: 230px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useMascotStore } from '@/stores/useMascotStore'
import { useStageStore } from '@/stores/useStageStore'
import { useStageNavigator } from '@/composables/useNavigation'
import { useRouter } from 'vue-router'

const router = useRouter()
const mascot = useMascotStore()
const stageTransition = useStageStore()

const isMounted = ref(false) // Hotfix: stop playing mascot message
let animationInterval: any
let transitionTimeout: any
let gsapAnimation: gsap.core.Tween

onMounted(() => {
  isMounted.value = true
  setTimeout(() => {
    mascot.showMessage('GAME_FINISHED')
    mascot.hideMascotItem()

    // Hotfix: should later be called in the mascots on end callback
    transitionTimeout = setTimeout(() => {
      stageTransition.startStageTransition(() => {
        router.push(`/`)
      })
    }, 20000)
  })
})

onUnmounted(() => {
  isMounted.value = false
  mascot.cancelMessage()
  clearInterval(animationInterval)
  clearTimeout(transitionTimeout)
  if (gsapAnimation) {
    gsapAnimation.kill()
  }
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
  background-image: url('@/assets/equipment/Room.svg');
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

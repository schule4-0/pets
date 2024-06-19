<template>
  <div class="container">
    <div class="background"></div>
    <img
      class="stationary-image"
      src="@/assets/LisaFullBody.svg"
      alt="Stationary"
      style="height: 220px"
    />
    <img class="walking-image" :src="currentFrame" alt="Walking" style="height: 120px" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import imgRockyStep1 from '@/assets/rocky/Rocky_step_1.svg'
import imgRockyStep2 from '@/assets/rocky/Rocky_step_2.svg'
import imgRockyStep3 from '@/assets/rocky/Rocky_step_3.svg'
import imgRockySitting from '@/assets/rocky/Rocky_sitting.svg'
import { useMascotStore } from '@/stores/useMascotStore'
import { useStageStore } from '@/stores/useStageStore'
import { useStageNavigator } from '@/composables/useNavigation'

const frames = [imgRockyStep1, imgRockyStep2, imgRockyStep3]

const mascot = useMascotStore()
const stageTransition = useStageStore()
const { goToNextStage } = useStageNavigator()

const currentFrame = ref(frames[0])
const walking = ref(true)
const isMounted = ref(false) // Hotfix: stop playing mascot message
let animationInterval: any
let transitionTimeout: any
let gsapAnimation: gsap.core.Tween

const animateWalking = () => {
  let frameIndex = 0
  animationInterval = setInterval(() => {
    if (!walking.value) {
      clearInterval(animationInterval)
      currentFrame.value = imgRockySitting
    } else {
      frameIndex = (frameIndex + 1) % frames.length
      currentFrame.value = frames[frameIndex]
    }
  }, 100)
}

const onAnimationComplete = () => {
  if (!isMounted.value) return
  walking.value = false
}

const moveWalkingImage = () => {
  gsapAnimation = gsap.fromTo(
    '.walking-image',
    { x: '-200px' },
    {
      x: '37vw',
      duration: 3.5,
      ease: 'linear',
      onComplete: onAnimationComplete
    }
  )
}

onMounted(() => {
  isMounted.value = true
  setTimeout(() => {
    mascot.showMessage(
      'ONBOARDING_PART1' /*, () => {
    animateWalking()
    moveWalkingImage()
  }*/
    )
    mascot.hideMascotItem()

    setTimeout(() => {
      animateWalking()
      moveWalkingImage()
    }, 3500)

    // Hotfix: should later be called in the mascots on end callback
    transitionTimeout = setTimeout(() => {
      stageTransition.startStageTransition(goToNextStage)
    }, 30000)
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
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #87ceeb, #f0f8ff);
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/OnboardingBackgroundPark.svg');
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.stationary-image {
  position: absolute;
  bottom: 43vh;
  left: 50%;
  z-index: 2;
}

.walking-image {
  position: absolute;
  bottom: 43vh;
  left: 0;
  transform: translateX(-200px);
  z-index: 3;
}
</style>

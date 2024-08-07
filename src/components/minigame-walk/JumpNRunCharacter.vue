<template>
  <div :class="{ character: true }" ref="characterRef">
    <img :src="currentImage" alt="character" class="character-img" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import gsap from 'gsap'
import rockySit from '@/assets/rocky/Rocky_sitting.svg'
import rockyStep1 from '@/assets/rocky/Rocky_step_1.svg'
import rockyStep2 from '@/assets/rocky/Rocky_step_2.svg'
import rockyStep3 from '@/assets/rocky/Rocky_step_3.svg'
import rockyPoop from '@/assets/rocky/Rocky_sitting.svg'
import rockyHurt from '@/assets/rocky/Rocky_lying_back.svg'

const globalConfig = {
  jumpHeight: -250,
  jumpDuration: 0.8,
  runSpeed: 0.1
}

export type CharacterActions = 'sit' | 'run' | 'jump' | 'poop' | 'hurt'
const props = defineProps<{
  action: CharacterActions
}>()

const emit = defineEmits(['jumpCompleted'])

const characterRef = ref<HTMLElement | null>(null)
const currentImage = ref('')

const images = {
  sit: rockySit,
  run: [rockyStep1, rockyStep2, rockyStep3],
  jump: rockyStep1,
  poop: rockyPoop,
  hurt: rockyHurt
}

let runningTimeline: gsap.core.Timeline | null = null
let currentAnimation: gsap.core.Timeline | null = null

const handleAction = (action: CharacterActions) => {
  if (runningTimeline) {
    runningTimeline.kill()
    runningTimeline = null
  }

  if (action === 'run') {
    runAnimation()
  } else {
    currentImage.value = images[action]
  }

  if (action === 'jump') {
    jumpAnimation()
  }
}

watch(
  () => props.action,
  (newAction) => {
    handleAction(newAction)
  },
  { immediate: true }
)

const runAnimation = () => {
  const runImages = images.run as string[]
  let currentIndex = 0

  runningTimeline = gsap.timeline({ repeat: -1 })
  runningTimeline.call(
    () => {
      currentImage.value = runImages[currentIndex]
      currentIndex = (currentIndex + 1) % runImages.length
    },
    [],
    `+=${globalConfig.runSpeed}`
  )
}

const jumpAnimation = () => {
  if (characterRef.value) {
    currentAnimation = gsap
      .timeline()
      .to(
        characterRef.value,
        {
          duration: 0.65,
          y: globalConfig.jumpHeight,
          ease: 'power2.out'
        },
        0.0
      )
      .to(
        characterRef.value,
        {
          duration: 0.4,
          ease: 'linear'
        },
        0.7
      )
      .to(
        characterRef.value,
        {
          duration: 0.3,
          y: globalConfig.jumpHeight,
          ease: 'none'
        },
        0.7
      )
      .to(
        characterRef.value,
        {
          duration: globalConfig.jumpDuration,
          y: 0,
          ease: 'power2.in',
          onComplete: () => {
            emit('jumpCompleted')
          }
        },
        0.9
      )
  }
}

const abortAnimation = () => {
  if (runningTimeline) {
    runningTimeline.kill()
    runningTimeline = null
  }
  if (currentAnimation) {
    currentAnimation.kill()
    currentAnimation = null
  }

  if (characterRef.value) {
    gsap.set(characterRef.value, { y: 0 })
  }
}

onMounted(() => {
  handleAction(props.action)
})

defineExpose({
  abortAnimation
})
</script>

<style scoped>
.character {
  position: absolute;
  bottom: 20vh;
  left: 35vw;
  z-index: 5;
}

.character-img {
  width: 20vh;
  height: 20vh;
}
</style>

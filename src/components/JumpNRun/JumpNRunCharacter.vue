<template>
  <div :class="{ character: true, jump: isJumping }" ref="characterRef">
    <img :src="image" alt="dog" class="character-img" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  image: string
  isJumping: boolean
}>()

const characterRef = ref<HTMLElement | null>(null)

watch(
  () => props.isJumping,
  (newValue) => {
    if (newValue) {
      jumpAnimation()
    }
  }
)

const jumpAnimation = () => {
  if (characterRef.value) {
    gsap.to(characterRef.value, {
      duration: 1.5,
      y: -400,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1
    })
  }
}
</script>

<style scoped>
.character {
  position: absolute;
  bottom: 20vh;
  left: 50vh;
}

.character-img {
  width: 20vh;
  height: 20vh;
}
</style>

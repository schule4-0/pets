<template>
  <div class="dog-bowl" ref="dogBowl" @mousedown="startDrag" @touchstart="startDrag">
    <img :src="imgDogBowl" alt="dogBowl" />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import imgDogBowl from '@/assets/equipment/dogfood.svg'

const emits = defineEmits(['startDrag'])
const dogBowl = ref<HTMLDivElement | null>(null)
const isDragging = ref(false)

const startDrag = (event: MouseEvent | TouchEvent) => {
  emits('startDrag')
  isDragging.value = true
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', stopDrag)
  event.preventDefault() // Prevent text selection
}

const onDrag = (event: MouseEvent | TouchEvent) => {
  if (isDragging.value && dogBowl.value) {
    let clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
    dogBowl.value.style.left = `${clientX}px`
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped>
.dog-bowl {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ew-resize;
  font-size: 5rem;
  user-select: none;

  img {
    height: 48px;
  }
}
</style>

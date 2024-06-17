<template>
  <img
    :src="element.imageSrc"
    :style="{ left: `${element.positionX}px`, ...element.customStyle }"
    class="animated-component"
  />
</template>

<script setup lang="ts">
import { type CSSProperties } from 'vue'

export interface AnimatedComponentProps {
  imageSrc: string
  positionX: number
  customStyle?: CSSProperties
}
defineProps<{ element: AnimatedComponentProps }>()
</script>

<style scoped>
.animated-component {
  position: absolute;
  z-index: 0;
}
</style>

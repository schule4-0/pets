<template>
  <div
    v-if="!props.collected"
    class="poo"
    @click="collectPoo"
    @touchstart="collectPoo"
    :style="{ left: `${props.positionX}px` }"
  >
    <img :src="PooImg" alt="Poo" class="image" />
  </div>
</template>

<script setup lang="ts">
import PooImg from '@/assets/poop.svg'

export interface PooType {
  positionX: number
  collected: boolean
}

const props = defineProps<PooType>()

const emits = defineEmits(['collect'])

const collectPoo = () => {
  emits('collect')
}
</script>

<style scoped>
.poo {
  position: absolute;
  bottom: 20vh;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: transparent;
  z-index: 4;
}

.image {
  width: 10vh;
  height: 10vh;
  pointer-events: none;
}
</style>

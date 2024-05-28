<template>
  <div class="poo" @click="collectPoo" :style="{ left: `${props.positionX}px` }">
    <img src="@/assets/jumpNrun/poo.png" alt="Poo" class="image" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  id: number
  positionX: number
}>()

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
}

.image {
  width: 20vh;
  height: 20vh;
}
</style>

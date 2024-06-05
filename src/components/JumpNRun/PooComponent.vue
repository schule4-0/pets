<template>
  <div class="poo" @click="collectPoo" :style="{ left: `${props.positionX}px` }">
    <img :src="props.image" alt="Poo" class="image" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number
  positionX: number
  image: string
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

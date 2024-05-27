<template>
  <div class="obstacle" :style="{ left: `${props.positionX}px` }">
    <img v-if="props.image" :src="props.image" alt="stone" class="image" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: string
  positionX: number
}>()
</script>

<style scoped>
.obstacle {
  position: absolute;
  bottom: 20vh;
}
.image {
  width: 10vh;
  height: 10vh;
}
</style>

<template>
  <div class="goal" :style="{ left: `${props.positionX}px` }">
    <img src="@/assets/recapQuiz/Dogfood.svg" alt="goal" class="image" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  positionX: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
.goal {
  position: absolute;
  bottom: 18vh;
  z-index: 5;
}
.image {
  width: 64px;
}
</style>

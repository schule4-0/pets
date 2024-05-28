<template>
  <div class="goal" :style="{ left: `${props.positionX}px` }">
    <img src="@/assets/jumpNrun/goal.png" alt="goal" class="image" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

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
  bottom: 20vh;
}
.image {
  width: 20vh;
  height: 20vh;
}
</style>

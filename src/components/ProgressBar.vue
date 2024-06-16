<template>
  <div class="progress-container">
    <div class="circle">
      <img src="@/assets/equipment/dogfood.svg" alt="food bowl" />
    </div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: computedProgress + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  progress: number
  max: number
}>()

const computedProgress = computed(() => (props.progress / props.max) * 100)
</script>

<style scoped lang="scss">
.progress-container {
  --light-blue: #dadfff;
  display: flex;
  align-items: center;

  .circle {
    border: 2px solid var(--s40-color-primary);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: var(--light-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    img {
      width: 38px;
      height: 38px;
    }
  }

  .progress-bar {
    border: 2px solid var(--s40-color-primary);
    display: flex;
    align-items: center;
    padding-right: 4px;
    flex-grow: 1;
    height: 26px;
    background-color: var(--light-blue);
    margin-left: -10px;
    border-radius: 0 16px 16px 0;
    overflow: hidden;
    position: relative;

    .progress {
      transition: width ease-out 0.5s;
      height: 16px;
      background-color: var(--s40-color-primary);
      border-radius: 0 16px 16px 0;
    }
  }
}
</style>

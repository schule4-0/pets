<template>
  <transition name="slide-up">
    <div v-if="show" class="toast">
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  show: boolean;
  message: string;
}>();
</script>

<style scoped>
.toast {
  position: fixed;
  top: 93%; 
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from, .slide-up-leave-to {
  transform: translate(-50%, 100%);
  opacity: 0;
}
</style>

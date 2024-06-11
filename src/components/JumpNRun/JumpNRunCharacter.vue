<template>
  <div :class="{ character: true, jump: props.isJumping }">
    <img src="@/assets/jumpNrun/character.png" alt="dog" class="character-img" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isJumping: boolean
}>()
</script>

<style scoped>
.character {
  position: absolute;
  bottom: 20vh;
  left: 50vh;
}

.character.jump {
  animation: jump-animation 3s forwards;
}

@keyframes jump-animation {
  0% {
    bottom: 20vh;
  }
  50% {
    bottom: 60vh;
  }
  100% {
    bottom: 20vh;
  }
}

.character-img {
  width: 20vh;
  height: 20vh;
}
</style>

<template>
  <div class="scoreboard">
    <img
      v-for="item in items"
      :key="item.id"
      class="scoreboard__icon"
      :src="item.image"
      :class="{ 'scoreboard__icon--collected': item.collected }"
      alt="item"
    />
  </div>
</template>

<script setup lang="ts">
interface Item {
  id: number
  collected: boolean
  image: string
}

defineProps<{
  items: Item[]
}>()
</script>

<style scoped lang="scss">
.scoreboard {
  height: 3.5rem;
  position: fixed;
  top: 5rem;
  left: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.75rem 1.25rem;
  background-color: #ffffff;
  border: 3px solid #60668f;
  border-radius: 1.25rem;
  z-index: 100;

  &__icon {
    height: 80%;
    opacity: 0.3;
    transition: opacity 0.3s ease;

    &--collected {
      opacity: 1;
    }
  }
}
</style>

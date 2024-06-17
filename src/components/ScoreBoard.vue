<template>
  <div class="scoreboard">
    <img
      v-for="item in props.items"
      :key="item.id"
      class="icon"
      :src="item.image"
      :class="{ collected: item.collected }"
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

const props = defineProps<{
  items: Item[]
}>()
</script>

<style scoped>
.scoreboard {
  position: absolute;
  top: 80px;
  left: 20px;
  display: flex;
  gap: 20px;
  padding: 12px 20px;
  background-color: #ffffff;
  border: 2px solid black;
  border-radius: 20px;
  z-index: 100;
}

.icon {
  width: 32px;
  opacity: 0.3;
}
.icon.collected {
  opacity: 1;
}
</style>

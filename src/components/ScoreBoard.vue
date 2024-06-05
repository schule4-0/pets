<template>
  <div class="scoreboard">
    <div v-for="item in props.items" :key="item.id" class="poo-icon">
      <img :src="item.image" :class="{ collected: item.collected }" alt="item" />
    </div>
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
  top: 10px;
  left: 10px;
  display: flex;
  gap: 5px;
}
.poo-icon img {
  width: 20px;
  height: 20px;
  opacity: 0.3;
}
.poo-icon img.collected {
  opacity: 1;
}
</style>

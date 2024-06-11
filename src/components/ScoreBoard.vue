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

console.log(props.items)
</script>

<style scoped>
.scoreboard {
  position: absolute;
  top: 10vh;
  left: 10vh;
  display: flex;
  gap: 1vh;
  padding: 1vh;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.poo-icon img {
  width: 4vh;
  height: 4vh;
  opacity: 0.3;
}
.poo-icon img.collected {
  opacity: 1;
}
</style>

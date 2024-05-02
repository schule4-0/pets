<template>
  <div class="square" :class="{ active: isActive }">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.square {
  width: 100px;
  height: 100px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.active {
  background-color: #ff0000;
}
</style>

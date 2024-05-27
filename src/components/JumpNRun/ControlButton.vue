<template>
  <!-- TODO: add touch event -->
  <button
    v-if="type == 'jump'"
    @mousedown="$emit('jump')"
    @mouseup="$emit('stopJump')"
    class="btnJump"
    :style="{ left: `${props.left}vh`, bottom: `${props.bottom}vh` }"
  >
    Jump
  </button>
  <button
    v-if="type == 'run'"
    @mousedown="$emit('run')"
    @touchstart="$emit('run')"
    @touchend="$emit('stopRun')"
    @mouseup="$emit('stopRun')"
    class="btnRun"
    :style="{ left: `${props.left}vh`, bottom: `${props.bottom}vh` }"
  >
    Run
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: 'run' | 'jump'
  bottom: string
  left: string
}>()
</script>

<style scoped>
button {
  position: absolute;
  margin: 5px;
  padding: 10px;
  font-size: 16px;
}
</style>

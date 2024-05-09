<template>
  <div ref="dropArea" class="drop-area">Drop items here</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['droppedInArea'])
const dropArea = ref<HTMLElement | null>(null)

const handleDropEvent = (event: MouseEvent | TouchEvent) => {
  const clientX = event instanceof TouchEvent ? event.changedTouches[0].clientX : event.clientX
  const clientY = event instanceof TouchEvent ? event.changedTouches[0].clientY : event.clientY

  const target = event.target as HTMLElement
  const id = parseInt(target.dataset.id || '-1')
  const type = target.dataset.type as 'accepted' | 'rejected'

  const bounds = dropArea.value?.getBoundingClientRect()
  const isWithin =
    bounds &&
    clientX >= bounds.left &&
    clientX <= bounds.right &&
    clientY >= bounds.top &&
    clientY <= bounds.bottom

  if (isWithin && id !== -1) {
    emit('droppedInArea', { id, x: clientX, y: clientY, type })
  }
}

onMounted(() => {
  document.addEventListener('mouseup', handleDropEvent)
  document.addEventListener('touchend', handleDropEvent)
})

onUnmounted(() => {
  document.removeEventListener('mouseup', handleDropEvent)
  document.removeEventListener('touchend', handleDropEvent)
})
</script>

<style scoped>
.drop-area {
  width: 300px;
  height: 200px;
  border: 2px dashed grey;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
</style>

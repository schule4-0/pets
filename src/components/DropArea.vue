<template>
  <div ref="dropArea" class="drop-area">
    <img src="@/assets/backpack.png" alt="Backpack" class="drop-area" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['droppedInArea'])
const dropArea = ref<HTMLElement | null>(null)

const handleDropEvent = (event: MouseEvent | TouchEvent) => {
  let clientX = event instanceof TouchEvent ? event.changedTouches[0].clientX : event.clientX
  let clientY = event instanceof TouchEvent ? event.changedTouches[0].clientY : event.clientY
  let target = event.target as HTMLElement

  while (target && !target.dataset.id) {
    target = target.parentElement as HTMLElement
  }

  const id = parseInt(target?.dataset.id || '-1')
  const type = target?.dataset.type as 'accepted' | 'rejected'

  const bounds = dropArea.value?.getBoundingClientRect()
  const isWithin = clientX >= (bounds?.left || 0)
  clientX <= (bounds?.right || 0)
  clientY >= (bounds?.top || 0)
  clientY <= (bounds?.bottom || 0)

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
  width: 10vw;
  height: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

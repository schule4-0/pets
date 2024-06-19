<template>
  <div ref="dropArea" :style="{ width: width }" class="drop-area">
    <img :src="image" alt="Drop Area Image" :style="{ width: '100%' }" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  image: string
  width: string
}>()

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
  const isWithin =
    clientX >= (bounds?.left || 0) &&
    clientX <= (bounds?.right || 0) &&
    clientY >= (bounds?.top || 0) &&
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

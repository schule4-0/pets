<template>
  <div
    :data-id="props.id"
    :data-type="props.type"
    :class="`draggable ${props.type}`"
    @mousedown="startDrag"
    @touchstart="startDrag"
    :style="{
      left: `${position.x}px`,
      top: `${position.y}px`,
      transition: transitionStyle
    }"
    style="cursor: grab"
  >
    {{ props.content }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDraggable } from '@/composables/useDraggable'

export interface DraggableItemType {
  id: number
  type: 'accepted' | 'rejected'
  content: string
  initialX: number
  initialY: number
}
const props = defineProps<DraggableItemType>()

const position = ref({
  x: props.initialX,
  y: props.initialY
})

const { startDrag, transitionStyle } = useDraggable(position)
</script>

<style scoped>
.draggable {
  position: absolute;
  padding: 10px;
  border: 2px solid black;
  border-radius: 5px;
  user-select: none;
}
</style>

<template>
  <div
    v-if="!props.collected"
    ref="elementRef"
    :data-id="props.id"
    :data-type="props.type"
    :class="`draggable ${props.type}`"
    @mousedown="startDrag"
    @touchstart="startDrag"
    :style="{
      left: `${position.x}%`,
      top: `${position.y}%`,
      transition: transitionStyle
    }"
    style="cursor: grab"
  >
    <img
      v-if="props.image"
      :src="props.image"
      :width="width ?? '64px'"
      alt="Draggable Image"
      class="images"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDraggable } from '@/composables/useDraggable'

export interface DraggableItemType {
  id: number
  width?: string
  type: 'accepted' | 'rejected'
  image: string
  initialX: number
  initialY: number
  collected: boolean
  message?: string
}

const props = defineProps<DraggableItemType>()

const position = ref({
  x: props.initialX,
  y: props.initialY
})

// Create a ref for the element
const elementRef = ref<HTMLElement | null>(null)

// Pass the element ref to the useDraggable composable
const { startDrag, transitionStyle } = useDraggable(position, elementRef)
</script>

<style scoped>
.draggable {
  position: absolute;
  user-select: none;
}
</style>

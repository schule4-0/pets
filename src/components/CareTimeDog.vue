<template>
  <div>
    <svg
      ref="svgElement"
      :width="width"
      :height="height"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      @mousedown="startAction"
      @mousemove="performAction"
      @mouseup="stopAction"
      @touchstart.prevent="startAction"
      @touchmove.prevent="performAction"
      @touchend="stopAction"
      @touchcancel="stopAction"
    >
      <g ref="dogSvg">
        <path
          ref="dogPath"
          d="M10 100 Q 30 50, 60 50 Q 90 50, 110 70 Q 130 90, 150 90 Q 170 90, 180 100 Q 190 110, 180 130 Q 170 150, 150 150 Q 130 150, 110 130 Q 90 110, 60 110 Q 30 110, 10 100 Z"
          stroke="black"
          fill="brown"
        />
        <g ref="bubblesLayer"></g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useCareTimeBubbles } from '@/composables/useCareTimeBubbles'
import { useCareTimeDog } from '@/composables/useCareTimeDog'
import { useCareTimeToolStore } from '@/stores/careTimeToolStore'
import type { CareTimeState } from '@/views/dog/MinigameCareTime.vue'

const props = defineProps<{
  width: number
  height: number
  currentState: CareTimeState
  onIsShampooed: () => void
  onIsShowered: () => void
}>()

const toolStore = useCareTimeToolStore()

const svgElement = ref<SVGSVGElement | null>(null)
const { dogSvg, dogPath, isPointInDog } = useCareTimeDog()
const { bubblesLayer, bubblePositions, createBubble, removeBubbles } = useCareTimeBubbles()
const isActionActive = ref(false)

const getTransformedCoordinates = (event: MouseEvent | TouchEvent, svgElement: SVGSVGElement) => {
  const point = svgElement.createSVGPoint()
  if (event instanceof MouseEvent) {
    point.x = event.clientX
    point.y = event.clientY
  } else {
    const touch = event.touches[0]
    point.x = touch.clientX
    point.y = touch.clientY
  }
  const transformedPoint = point.matrixTransform(svgElement.getScreenCTM()?.inverse())
  return { x: transformedPoint.x, y: transformedPoint.y }
}

const startAction = (event: MouseEvent | TouchEvent) => {
  isActionActive.value = true
  performAction(event)
}

const performAction = (event: MouseEvent | TouchEvent) => {
  if (!isActionActive.value) return

  if (svgElement.value && dogPath.value) {
    const { x, y } = getTransformedCoordinates(event, svgElement.value)

    if (toolStore.selectedTool === 'shampoo') {
      if (isPointInDog(x, y)) {
        createBubble(x, y)
      }
    } else if (toolStore.selectedTool === 'shower') {
      removeBubbles(x, y)
    }
  }
}

watch(
  () => bubblePositions.value,
  (bubbles) => {
    if (bubbles.length === 0 && props.currentState === 'shampooing') {
      // Do nothing - Game just started
    } else if (bubbles.length === 0 && props.currentState === 'showering') {
      // All bubbles showered off
      props.onIsShowered()
    } else if (bubbles.length === 20 && props.currentState === 'shampooing') {
      // Fully shampooed dog => now switch to shower
      props.onIsShampooed()
    }
  },
  { deep: true }
)

const stopAction = () => {
  isActionActive.value = false
}
</script>

import { type Ref, nextTick, ref, computed } from 'vue'

export function useDraggable(position: Ref<{ x: number; y: number }>) {
  const initialX = position.value.x
  const initialY = position.value.y
  // State to track whether the item is returning to its original position
  const isReturning = ref(false)

  // Apply smooth transition when returning
  const transitionStyle = computed(() => {
    return isReturning.value ? 'left 0.5s ease, top 0.5s ease' : 'none'
  })

  function startDrag(event: MouseEvent | TouchEvent) {
    event.preventDefault()

    const cursorInitialX = event instanceof TouchEvent ? event.touches[0].clientX : event.clientX
    const cursorInitialY = event instanceof TouchEvent ? event.touches[0].clientY : event.clientY

    const startX = cursorInitialX - position.value.x
    const startY = cursorInitialY - position.value.y

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      moveEvent.preventDefault()

      const moveX =
        moveEvent instanceof TouchEvent ? moveEvent.touches[0].clientX : moveEvent.clientX
      const moveY =
        moveEvent instanceof TouchEvent ? moveEvent.touches[0].clientY : moveEvent.clientY

      position.value.x = moveX - startX
      position.value.y = moveY - startY
    }

    const onEnd = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onEnd)
      document.removeEventListener('touchmove', onMove as any)
      document.removeEventListener('touchend', onEnd)

      isReturning.value = true
      nextTick().then(() => {
        if (isReturning.value) {
          // Check if still needs to return after possible external handling
          position.value.x = initialX
          position.value.y = initialY

          setTimeout(() => {
            isReturning.value = false // Reset the state after transition
          }, 500) // Match this duration with the CSS transition
        }
      })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)
    document.addEventListener('touchmove', onMove as any, { passive: false })
    document.addEventListener('touchend', onEnd)
  }

  return { startDrag, transitionStyle }
}

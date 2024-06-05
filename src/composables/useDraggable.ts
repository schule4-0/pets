import { type Ref, nextTick, ref, computed, onMounted } from 'vue'

export function useDraggable(
  position: Ref<{ x: number; y: number }>,
  elementRef: Ref<HTMLElement | null>
) {
  const initialX = position.value.x
  const initialY = position.value.y
  const isReturning = ref(false)

  const transitionStyle = computed(() => {
    return isReturning.value ? 'left 0.5s ease, top 0.5s ease' : 'none'
  })

  // Track element dimensions
  const elementWidth = ref(0)
  const elementHeight = ref(0)

  onMounted(() => {
    if (elementRef.value) {
      elementWidth.value = elementRef.value.offsetWidth
      elementHeight.value = elementRef.value.offsetHeight
    }
  })

  function startDrag(event: MouseEvent | TouchEvent) {
    event.preventDefault()

    const cursorInitialX = event instanceof TouchEvent ? event.touches[0].clientX : event.clientX
    const cursorInitialY = event instanceof TouchEvent ? event.touches[0].clientY : event.clientY

    const startX = (position.value.x / window.innerWidth) * 100
    const startY = (position.value.y / window.innerHeight) * 100

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      moveEvent.preventDefault()

      const moveX =
        moveEvent instanceof TouchEvent ? moveEvent.touches[0].clientX : moveEvent.clientX
      const moveY =
        moveEvent instanceof TouchEvent ? moveEvent.touches[0].clientY : moveEvent.clientY

      position.value.x =
        ((moveX - startX) / window.innerWidth) * 100 -
        ((elementWidth.value / window.innerWidth) * 100) / 2
      position.value.y =
        ((moveY - startY) / window.innerHeight) * 100 -
        ((elementHeight.value / window.innerHeight) * 100) / 3
    }

    const onEnd = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onEnd)
      document.removeEventListener('touchmove', onMove as any)
      document.removeEventListener('touchend', onEnd)

      isReturning.value = true
      nextTick().then(() => {
        if (isReturning.value) {
          position.value.x = initialX
          position.value.y = initialY

          setTimeout(() => {
            isReturning.value = false
          }, 500)
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

import { ref, type Ref } from 'vue'
import gsap from 'gsap'

export const useBubbles = () => {
  const bubblePositions = ref<{ x: number; y: number; r: number }[]>([])
  const bubblesLayer = ref<SVGGElement | null>(null)

  const createBubble = (x: number, y: number) => {
    const minDistance = 11 // Minimum distance between bubbles

    // Check if the new bubble is too close to any existing bubble
    for (const pos of bubblePositions.value) {
      const distance = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2)
      if (distance < minDistance) {
        return // Don't create the bubble if too close to an existing one
      }
    }

    const bubble = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    const size = Math.random() * 5 + 7 // Random size between 5 and 10
    const opacity = Math.random() * 0.5 + 0.5 // Random opacity between 0.5 and 1

    bubble.setAttribute('cx', x.toString())
    bubble.setAttribute('cy', y.toString())
    bubble.setAttribute('r', size.toString())
    bubble.setAttribute('fill', 'white')
    bubble.setAttribute('opacity', opacity.toString())

    bubblesLayer.value?.appendChild(bubble)
    bubblePositions.value.push({ x, y, r: size })

    // Animate the bubble for a more realistic effect
    gsap.fromTo(bubble, { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' })
  }

  const removeBubbles = (x: number, y: number) => {
    const radius = 20 // Radius around the touch/mouse point to remove bubbles
    const bubbles = bubblesLayer.value?.querySelectorAll('circle')

    if (bubbles) {
      bubbles.forEach((bubble) => {
        const bubbleX = parseFloat(bubble.getAttribute('cx') || '0')
        const bubbleY = parseFloat(bubble.getAttribute('cy') || '0')
        const bubbleR = parseFloat(bubble.getAttribute('r') || '0')
        const distance = Math.sqrt((bubbleX - x) ** 2 + (bubbleY - y) ** 2)

        if (distance < radius) {
          gsap.to(bubble, { y: 20, opacity: 0, duration: 1, onComplete: () => bubble.remove() })
          // Remove bubble position from the array
          bubblePositions.value = bubblePositions.value.filter(
            (pos) => !(pos.x === bubbleX && pos.y === bubbleY && pos.r === bubbleR)
          )
        }
      })
    }
  }

  return {
    bubblesLayer,
    bubblePositions,
    createBubble,
    removeBubbles
  }
}

import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { useRandomSound } from '@/composables/randomSound'
import bubbleSound1 from '@/assets/audio/soundEffects/bubbles/bubble1.mp3'
import bubbleSound2 from '@/assets/audio/soundEffects/bubbles/bubble2.mp3'
import bubbleSound3 from '@/assets/audio/soundEffects/bubbles/bubble3.mp3'
import bubbleSound4 from '@/assets/audio/soundEffects/bubbles/bubble4.mp3'
import { useSound } from './sound'

export const useCareTimeBubbles = () => {
  const dogPath = ref<SVGPathElement | null>(null)

  const bubblePositions = ref<{ x: number; y: number; r: number }[]>([])
  const bubblesLayer = ref<SVGGElement | null>(null)

  const dirtPositions = ref<{ id: number; points: string }[]>([])
  const dirtLayer = ref<SVGGElement | null>(null)

  const waterDropPositions = ref<{ x: number; y: number; r: number }[]>([])
  const waterDropLayer = ref<SVGGElement | null>(null)

  const audio = useSound()
  const bubbleSounds = [bubbleSound1, bubbleSound2, bubbleSound3, bubbleSound4]

  const isPointInDog = (x: number, y: number) => {
    if (dogPath.value && dogPath.value.ownerSVGElement) {
      const point = dogPath.value.ownerSVGElement.createSVGPoint()
      point.x = x
      point.y = y
      return dogPath.value.isPointInFill(point)
    }
    return false
  }

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
    audio.playRandomSound()
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

  const generateDirtShape = (cx: number, cy: number) => {
    const numPoints = Math.floor(Math.random() * 3) + 5 // 5 to 7 points
    const angleStep = (Math.PI * 2) / numPoints
    const points = []

    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep
      const radius = Math.random() * 3 + 5 // Random radius between 5 and 8
      const x = cx + Math.cos(angle) * radius
      const y = cy + Math.sin(angle) * radius
      points.push(`${x},${y}`)
    }

    return points.join(' ')
  }

  const generateDirt = () => {
    const dirtCount = 10
    let currentCount = 0
    let id = 0

    while (currentCount < dirtCount) {
      const x = Math.random() * 200
      const y = Math.random() * 200

      if (isPointInDog(x, y)) {
        const points = generateDirtShape(x, y)
        dirtPositions.value.push({ id: id++, points })
        currentCount++
      }
    }
  }

  const removeDirt = (x: number, y: number) => {
    const radius = 20 // Radius around the touch/mouse point to remove dirt
    const dirtElements = dirtLayer.value?.querySelectorAll('polygon')

    if (dirtElements) {
      dirtElements.forEach((dirt) => {
        const points = dirt.getAttribute('points') || ''
        const pointPairs = points.split(' ').map((p) => p.split(',').map(Number))
        const distances = pointPairs.map(([dx, dy]) => Math.sqrt((dx - x) ** 2 + (dy - y) ** 2))
        const minDistance = Math.min(...distances)

        if (minDistance < radius) {
          gsap.to(dirt, { y: 20, opacity: 0, duration: 1, onComplete: () => dirt.remove() })
          // Remove dirt position from the array
          dirtPositions.value = dirtPositions.value.filter((pos) => pos.points !== points)
        }
      })
    }
  }

  const createWaterDrop = (x: number, y: number) => {
    const minDistance = 17 // Minimum distance between waterDrops

    // Check if the new waterDrop is too close to any existing waterDrop
    for (const pos of waterDropPositions.value) {
      const distance = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2)
      if (distance < minDistance) {
        return // Don't create the waterDrop if too close to an existing one
      }
    }

    const waterDrop = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    const size = Math.random() * 4 + 1 // Random size between 5 and 10
    const opacity = Math.random() * 0.3 + 0.3 // Random opacity between 0.5 and 1

    waterDrop.setAttribute('cx', x.toString())
    waterDrop.setAttribute('cy', y.toString())
    waterDrop.setAttribute('r', size.toString())
    waterDrop.setAttribute('fill', 'blue')
    waterDrop.setAttribute('opacity', opacity.toString())

    waterDropLayer.value?.appendChild(waterDrop)
    waterDropPositions.value.push({ x, y, r: size })

    // Animate the waterDrop for a more realistic effect
    gsap.fromTo(waterDrop, { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' })
  }

  const removeWaterDrops = (x: number, y: number) => {
    const radius = 20 // Radius around the touch/mouse point to remove water drops
    const waterDrops = waterDropLayer.value?.querySelectorAll('circle')

    if (waterDrops) {
      waterDrops.forEach((drop) => {
        const dropX = parseFloat(drop.getAttribute('cx') || '0')
        const dropY = parseFloat(drop.getAttribute('cy') || '0')
        const dropR = parseFloat(drop.getAttribute('r') || '0')
        const distance = Math.sqrt((dropX - x) ** 2 + (dropY - y) ** 2)

        if (distance < radius) {
          gsap.to(drop, { y: 20, opacity: 0, duration: 1, onComplete: () => drop.remove() })
          // Remove water drop position from the array
          waterDropPositions.value = waterDropPositions.value.filter(
            (pos) => !(pos.x === dropX && pos.y === dropY && pos.r === dropR)
          )
        }
      })
    }
  }

  onMounted(() => {
    generateDirt()
    audio.loadSounds(bubbleSounds)
  })

  return {
    bubblesLayer,
    bubblePositions,
    createBubble,
    removeBubbles,
    dirtLayer,
    dirtPositions,
    removeDirt,
    dogPath,
    isPointInDog,
    createWaterDrop,
    waterDropPositions,
    removeWaterDrops,
    waterDropLayer
  }
}

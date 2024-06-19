import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import bubbleSound1 from '@/assets/audio/soundEffects/bubbles/bubble1.mp3'
import bubbleSound2 from '@/assets/audio/soundEffects/bubbles/bubble2.mp3'
import bubbleSound3 from '@/assets/audio/soundEffects/bubbles/bubble3.mp3'
import bubbleSound4 from '@/assets/audio/soundEffects/bubbles/bubble4.mp3'
import { useSound } from './sound'

export const useCareTimeBubbles = () => {
  const dogPath = ref<SVGPathElement | null>(null)

  const bubblePositions = ref<{ x: number; y: number; r: number }[]>([])
  const bubblesLayer = ref<SVGGElement | null>(null)

  const dirtPositions = ref<{ id: string; path: string; fill: string }[]>([])
  const dirtLayer = ref<SVGGElement | null>(null)

  const waterDropPositions = ref<{ x: number; y: number; id: number }[]>([])
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
    const minDistance = 11 * 3 // Minimum distance between bubbles

    // Check if the new bubble is too close to any existing bubble
    for (const pos of bubblePositions.value) {
      const distance = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2)
      if (distance < minDistance) {
        return // Don't create the bubble if too close to an existing one
      }
    }

    const bubble = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    const size = Math.random() * 5 * 3 + 7 * 3 // Random size between 5 and 10
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
    const radius = 30 // Radius around the touch/mouse point to remove bubbles
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
    dirtPositions.value.push(
      {
        id: '0',
        fill: '#5B310B',
        path: 'M162.5 135C186.506 114.366 215.337 129.111 243 144.5C266.807 157.744 290.913 169.294 289.5 196.5C287.552 234.018 232.023 207.876 195 201.5C175.271 198.102 157.922 213.278 147 196.5C133.487 175.742 143.717 151.145 162.5 135Z'
      },
      {
        id: '1',
        fill: '#543110',
        path: 'M27 140C51.0059 119.366 73.514 115.265 101.177 130.654C124.983 143.898 62.6604 130.654 61.5 153C59.5518 190.518 48 165 40 175C27.4937 190.633 16.099 199.432 5.17691 182.654C-8.33577 161.896 8.21689 156.145 27 140Z'
      },
      {
        id: '2',
        fill: '#351C05',
        path: 'M107.5 248C100.777 240.92 94.3979 231.621 100.5 224C107.082 215.779 120.213 220.947 127 229C133.92 237.212 136.944 252.444 127 256.5C119.308 259.638 113.22 254.024 107.5 248Z'
      },
      {
        id: '3',
        fill: '#372311',
        path: 'M398.5 1.5C419.005 6.6258 435.184 17.5523 438 38.5C441.908 67.5682 399.715 63.8506 377.5 83C357.734 100.038 355.832 133.697 330 130C297.913 125.408 314.61 75.5271 330 47C345.247 18.736 367.344 -6.2882 398.5 1.5Z'
      }
    )
  }

  const removeDirt = (x: number, y: number) => {
    const correctedX = x - 50
    const correctedY = y - 135
    const dirtElements = dirtLayer.value?.querySelectorAll('path')

    if (dirtElements) {
      dirtElements.forEach((dirt) => {
        const dirtBoundingBox = dirt.getBBox()

        // Check if the coordinates (x, y) are inside the bounding box
        if (
          correctedX >= dirtBoundingBox.x &&
          correctedX <= dirtBoundingBox.x + dirtBoundingBox.width &&
          correctedY >= dirtBoundingBox.y &&
          correctedY <= dirtBoundingBox.y + dirtBoundingBox.height
        ) {
          // Animate the dirt removal and then remove it from the DOM
          gsap.to(dirt, { opacity: 0, duration: 1, onComplete: () => dirt.remove() })

          // Remove dirt position from the array using id
          const dirtId = dirt.getAttribute('id')
          if (dirtId) {
            dirtPositions.value = dirtPositions.value.filter((pos) => pos.id.toString() !== dirtId)
          }
        }
      })
    }
  }

  const createWaterDrop = (x: number, y: number) => {
    const minDistance = 18 * 3 // Minimum distance between waterDrops

    // Check if the new waterDrop is too close to any existing waterDrop
    for (const pos of waterDropPositions.value) {
      const distance = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2)
      if (distance < minDistance) {
        return // Don't create the waterDrop if too close to an existing one
      }
    }

    const id = waterDropPositions.value.length
    const width = Math.random() * 28 + 10
    const opacity = Math.random() * 0.3 + 0.3 // Random opacity between 0.5 and 1

    // Create the group element to contain the water drop
    const svgNS = 'http://www.w3.org/2000/svg'
    const gElement = document.createElementNS(svgNS, 'g')
    gElement.classList.add('waterdrop-container')
    gElement.setAttribute('data-water-drop-id', id.toString())
    gElement.setAttribute('opacity', opacity.toString())
    gElement.setAttribute('transform', `translate(${x}, ${y - 32})`)

    // Define the paths
    const paths = [
      'M24.2598 44.4761C24.2343 44.4989 24.2087 44.5218 24.1829 44.5446C18.9842 49.1225 11.0009 49.1225 5.80116 44.5452C5.7751 44.5224 5.74903 44.4996 5.7231 44.4761C1.80879 40.9866 -0.341062 35.7425 0.0442703 30.6212C0.52047 24.2882 4.52506 18.7892 8.2275 13.5324C11.1575 9.37142 14.0689 4.84956 14.9918 0.000488281C15.9141 4.84956 18.8261 9.37142 21.7561 13.5324C25.4581 18.7892 29.4634 24.2882 29.9394 30.6212C30.3243 35.7425 28.1745 40.9866 24.2598 44.4761Z',
      'M24.2599 44.4763C24.2346 44.4991 24.2086 44.5219 24.1833 44.5435C18.9845 49.122 11.001 49.122 5.80149 44.5454C5.7755 44.5226 5.7495 44.4991 5.7235 44.4763C2.38305 41.4983 0.327622 37.2421 0.0361328 32.8763C1.46001 35.0782 3.24995 37.0322 5.43401 38.4496C8.43783 40.3988 12.2381 41.2448 15.6729 40.2574C19.2158 39.2389 22.0821 36.325 23.4135 32.8611C24.745 29.3966 24.6225 25.458 23.4382 21.9397C22.0184 17.7195 19.1987 14.1549 16.9264 10.3316C15.1164 7.28522 14.3403 4.71178 14.8844 0.651626C14.9136 0.434373 14.9502 0.217903 14.9915 0.0026731C14.9917 0.00176 14.9919 0.000913098 14.992 0C15.9144 4.8494 18.8258 9.37106 21.7564 13.5318C25.4582 18.789 29.4635 24.2877 29.9395 30.6207C30.3243 35.742 28.1745 40.986 24.2599 44.4763Z',
      'M4.23946 30.9811C3.11373 30.9385 2.24625 29.9597 2.33654 28.8273C2.51122 26.6371 3.37295 24.493 4.56601 22.6324C5.70771 20.8522 7.1149 19.4011 8.47158 17.5001C8.91092 16.8845 9.79664 16.8221 10.3173 17.3693L10.3367 17.3895C10.755 17.8292 10.7871 18.5149 10.4081 18.9894C7.81196 22.2393 6.31707 25.4457 6.2956 29.0012C6.28881 30.1276 5.35562 31.0232 4.23946 30.9811Z',
      'M13.0105 14.1382C13.0105 14.7895 12.487 15.3175 11.8412 15.3175C11.1954 15.3175 10.6719 14.7895 10.6719 14.1382C10.6719 13.487 11.1954 12.959 11.8412 12.959C12.487 12.959 13.0105 13.487 13.0105 14.1382Z'
    ]
    const colors = ['#00BDEC', '#00A2DF', '#5FC9E0', '#5FC9E0']

    // Create and append the path elements
    paths.forEach((d, i) => {
      const path = document.createElementNS(svgNS, 'path')
      path.setAttribute('d', d)
      path.setAttribute('fill', colors[i])
      gElement.appendChild(path)
    })

    // Append the group element to the main SVG layer
    if (waterDropLayer.value) {
      waterDropLayer.value.appendChild(gElement)
    }
    waterDropPositions.value.push({ x, y, id })

    // Animate the waterDrop for a more realistic effect
    gsap.fromTo(gElement, { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' })
  }

  const parseTransform = (transform: any) => {
    const match = transform.match(/matrix\([^,]+,[^,]+,[^,]+,[^,]+,([^,]+),\s*([^)]+)\)/)
    if (match) {
      return {
        x: parseFloat(match[1]),
        y: parseFloat(match[2])
      }
    }
    return null
  }

  const removeWaterDrops = (x: number, y: number) => {
    const radius = 30 // Radius around the touch/mouse point to remove water drops
    const waterDrops = waterDropLayer.value?.querySelectorAll('.waterdrop-container')

    if (waterDrops) {
      waterDrops.forEach((drop) => {
        const transform = drop.getAttribute('transform')
        if (transform) {
          const position = parseTransform(transform)
          if (position) {
            const dropX = position.x
            const dropY = position.y + 32 // Adjusting for the initial translation in createWaterDrop
            const distance = Math.sqrt((dropX - x) ** 2 + (dropY - y) ** 2)

            if (distance < radius) {
              gsap.to(drop, { y: 20, opacity: 0, duration: 1, onComplete: () => drop.remove() })

              // Remove water drop position from the array
              waterDropPositions.value = waterDropPositions.value.filter(
                (pos) => !(pos.id === parseFloat(drop.getAttribute('data-water-drop-id') || '0'))
              )
            }
          }
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

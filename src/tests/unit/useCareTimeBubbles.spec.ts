import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { useCareTimeBubbles } from '@/composables/useCareTimeBubbles'

// Properly mock GSAP with named exports
vi.mock('gsap', async () => {
  const actual = await vi.importActual<typeof import('gsap')>('gsap')
  return {
    ...actual,
    fromTo: vi.fn(),
    to: vi.fn()
  }
})

// Mock getBBox for SVGGraphicsElement
beforeEach(() => {
  ;(SVGGraphicsElement.prototype as any).getBBox = () => ({
    x: 0,
    y: 0,
    width: 100,
    height: 100
  })
})

describe('useCareTimeBubbles', () => {
  let composable: ReturnType<typeof useCareTimeBubbles>

  beforeEach(() => {
    composable = useCareTimeBubbles()
  })

  it('should create a bubble and add it to the bubblesLayer', () => {
    const x = 100
    const y = 200

    // Mock SVG elements
    const bubbleLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    composable.bubblesLayer.value = bubbleLayer

    const created = composable.createBubble(x, y)
    expect(created).toBe(true)
    expect(composable.bubblePositions.value.length).toBe(1)
    expect(composable.bubblePositions.value[0].x).toBe(x)
    expect(composable.bubblePositions.value[0].y).toBe(y)
    expect(bubbleLayer.childElementCount).toBe(1)
  })

  it('should not create a bubble if too close to an existing one', () => {
    const x1 = 100
    const y1 = 200
    const x2 = 110
    const y2 = 210

    composable.bubblePositions.value = [{ x: x1, y: y1, r: 10 }]

    const created = composable.createBubble(x2, y2)
    expect(created).toBe(false)
    expect(composable.bubblePositions.value.length).toBe(1)
  })

  it('should create a water drop and add it to the waterDropLayer', () => {
    const x = 100
    const y = 200

    const waterDropLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    composable.waterDropLayer.value = waterDropLayer

    composable.createWaterDrop(x, y)
    expect(composable.waterDropPositions.value.length).toBe(1)
    expect(composable.waterDropPositions.value[0].x).toBe(x)
    expect(composable.waterDropPositions.value[0].y).toBe(y)
    expect(waterDropLayer.childElementCount).toBe(1)
  })
})

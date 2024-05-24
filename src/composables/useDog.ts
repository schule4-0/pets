import { ref } from 'vue'

export const useDog = () => {
  const dogSvg = ref<SVGGElement | null>(null)
  const dogPath = ref<SVGPathElement | null>(null)

  const isPointInDog = (x: number, y: number) => {
    if (dogPath.value) {
      const point = dogPath.value.ownerSVGElement.createSVGPoint()
      point.x = x
      point.y = y
      return dogPath.value.isPointInFill(point)
    }
    return false
  }

  return {
    dogSvg,
    dogPath,
    isPointInDog
  }
}

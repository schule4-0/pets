import imgCloud from '@/assets/images/dog/backgrounds/minigame-walk/cloud.svg'
import imgBgPlant1 from '@/assets/images/dog/backgrounds/minigame-walk/background-plants/bg_plant1.svg'
import imgBgPlant2 from '@/assets/images/dog/backgrounds/minigame-walk/background-plants/bg_plant2.svg'
import imgFgPlant1 from '@/assets/images/dog/backgrounds/minigame-walk/foreground-plants/fg_plant1.svg'
import imgFgPlant2 from '@/assets/images/dog/backgrounds/minigame-walk/foreground-plants/fg_plant2.svg'
import type { AnimatedComponentProps } from '@/components/minigame-walk/AnimatedComponent.vue'
import type { CSSProperties } from 'vue'
import { getRandomItem } from '@/utils/arrayUtils'

export interface AnimatedComponentWithSpeedMultiplier extends AnimatedComponentProps {
  speedMultiplier: number
}

export const useElementSpawning = (animatedElements: AnimatedComponentWithSpeedMultiplier[]) => {
  const lastElementSpawnTimes = {
    cloud: Date.now(),
    fgBush: Date.now(),
    bgBush: Date.now()
  }

  const getRandomY = () => Math.floor(Math.random() * (window.innerHeight / 4))

  const spawnElementWithConfig = (type: 'cloud' | 'fgBush' | 'bgBush', offsetX = 0) => {
    const positionX = window.innerWidth + Math.random() * 200 + offsetX
    let imageSrc = ''
    let speedMultiplier = 1
    let customStyle: CSSProperties = {}

    switch (type) {
      case 'fgBush':
        imageSrc = getRandomItem([imgFgPlant1, imgFgPlant2])
        speedMultiplier = 1.2
        customStyle = {
          bottom: `${20 + Math.floor(Math.random() * (window.innerHeight / 10))}px`,
          height: '48px',
          zIndex: 3
        }
        break
      case 'bgBush':
        imageSrc = getRandomItem([imgBgPlant1, imgBgPlant2])
        speedMultiplier = 0.8
        customStyle = {
          bottom: '30vh',
          height: '128px',
          zIndex: 3
        }
        break
      case 'cloud':
        imageSrc = imgCloud
        speedMultiplier = 0.2
        customStyle = {
          top: `${getRandomY()}px`,
          height: '96px',
          zIndex: 0
        }
        break
    }

    animatedElements.push({ imageSrc, positionX, speedMultiplier, customStyle })
  }

  const spawnInitialElements = () => {
    const initialCloudPositions = [80, 700, 1100]
    initialCloudPositions.forEach((positionX) => {
      spawnElementWithConfig('cloud', positionX - window.innerWidth)
    })

    const initialBgBushPositions = [-50, 840]
    initialBgBushPositions.forEach((positionX) => {
      spawnElementWithConfig('bgBush', positionX - window.innerWidth)
    })

    const initialFgBushPositions = [50, 700, 1100]
    initialFgBushPositions.forEach((positionX) => {
      spawnElementWithConfig('fgBush', positionX - window.innerWidth)
    })
  }

  return {
    spawnElementWithConfig,
    spawnInitialElements,
    lastElementSpawnTimes
  }
}

import bookImg from '@/assets/images/dog/items-for-human/book.svg'
import feedingBowlImg from '@/assets/images/dog/food/dogfood.svg'
import boneImg from '@/assets/images/dog/equipment/bone.png'
import cardGameImg from '@/assets/images/dog/items-for-human/cardgame.svg'
import ballImg from '@/assets/images/dog/equipment/ball.svg'
import type { MascotMessageKey } from '@/config/mascotMessages'

export interface EquipmentItem {
  id: number
  type: 'accepted' | 'rejected'
  image: string
  initialX: number
  initialY: number
  mascotMessageKey: MascotMessageKey
}

const minigameEquipmentItems: EquipmentItem[] = [
  {
    id: 1,
    type: 'accepted',
    image: boneImg,
    initialX: 45,
    initialY: 90,
    mascotMessageKey: 'STAGE1_BONE'
  },
  {
    id: 2,
    type: 'accepted',
    image: feedingBowlImg,
    initialX: 24,
    initialY: 83,
    mascotMessageKey: 'STAGE1_FEEDING_BOWL'
  },
  {
    id: 3,
    type: 'accepted',
    image: ballImg,
    initialX: 34,
    initialY: 54.5,
    mascotMessageKey: 'STAGE1_BALL'
  },
  {
    id: 5,
    type: 'rejected',
    image: bookImg,
    initialX: 60,
    initialY: 68,
    mascotMessageKey: 'STAGE1_WRONG'
  },
  {
    id: 6,
    type: 'rejected',
    image: cardGameImg,
    initialX: 85,
    initialY: 15.5,
    mascotMessageKey: 'STAGE1_WRONG'
  }
]

export default minigameEquipmentItems

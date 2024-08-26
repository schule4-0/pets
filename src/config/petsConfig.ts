import dogImg from '@/assets/images/thumbnails/thumbnail_dog.png'
import bunnyImg from '@/assets/images/thumbnails/thumbnail_bunny.png'
import catImg from '@/assets/images/thumbnails/thumbnail_bunny.png'

export interface Pet {
  name: string
  image: string
  englishName: string
  isImplemented: boolean
}

const pets: Pet[] = [
  { name: 'Hund', image: dogImg, englishName: 'dog', isImplemented: true },
  { name: 'Kaninchen', image: bunnyImg, englishName: 'rabbit', isImplemented: false },
  { name: 'Katze', image: catImg, englishName: 'cat', isImplemented: false }
]

export default pets

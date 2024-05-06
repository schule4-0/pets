import dogImg from '@/assets/dog.png';
import bunnyImg from '@/assets/bunny.png';
import catImg from '@/assets/cat.png';

export interface Pet {
  name: string;
  image: string;
  englishName: string;
}

const pets: Pet[] = [
  { name: 'Hund', image: dogImg, englishName:'dog'},
  { name: 'Kaninchen', image: bunnyImg, englishName: 'rabbit'},
  { name: 'Katze', image: catImg, englishName: 'cat' },
  { name: 'Fisch', image: dogImg, englishName: 'fish' }
];

export default pets;

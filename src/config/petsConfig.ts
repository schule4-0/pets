import dogImg from '@/assets/dog.png';
import bunnyImg from '@/assets/bunny.png';
import catImg from '@/assets/cat.png';

export interface Pet {
  name: string;
  image: string;
  englishName: string; // for routing?
}

const pets: Pet[] = [
  { name: 'Hund', image: dogImg, englishName:'dog'},
  { name: 'Kaninchen', image: bunnyImg, englishName: 'rabbit'},
  { name: 'Katze', image: catImg, englishName: 'cat' }, // placeholder image
  { name: 'Fisch', image: dogImg, englishName: 'fish' } // placeholder image
  // Add more pets here
];

export default pets;

interface Pet {
  name: string;
  image: string;
  englishName: string; // for routing?
}

const pets: Pet[] = [
  { name: 'Hund', image: 'src/assets/dog.png', englishName:'dog'},
  { name: 'Kaninchen', image: 'src/assets/bunny.png', englishName: 'rabbit'},
  { name: 'Katze', image: 'src/assets/dog.png', englishName: 'cat' }, // placeholder image
  { name: 'Fisch', image: 'src/assets/bunny.png', englishName: 'fish' } // placeholder image
  // Add more pets here
];

export default pets;

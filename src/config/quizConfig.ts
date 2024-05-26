import dogImg from '@/assets/dog.png';
import bunnyImg from '@/assets/bunny.png';
import catImg from '@/assets/cat.png';

export interface Answer {
  text: string;
  image: string;
}

export interface Quiz {
  question: string;
  answers: Answer[];
  correctAnswer: string;
}

const quizData: Quiz[] = [
  {
    question: 'Was sollte in der Tasche für Rocky sein?',
    answers: [
      { text: 'Ball', image: dogImg },
      { text: 'Buch', image: bunnyImg },
      { text: 'Hundebett', image: catImg }
    ],
    correctAnswer: 'Ball' 
  },
  {
    question: 'Welches Futter soll in Rockys Napf gelegt werden, um ihn zu füttern?',
    answers: [
      { text: 'Kuchen', image: dogImg },
      { text: 'Schokolade', image: bunnyImg },
      { text: 'Hundefutter', image: catImg }
    ],
    correctAnswer: 'Hundefutter'
  },
  {
    question: 'Was muss man beim Spazierengehen mitnehmen?',
    answers: [
      { text: 'Handy', image: dogImg },
      { text: 'Leine', image: bunnyImg },
      { text: 'Kartenspiel', image: catImg }
    ],
    correctAnswer: 'Leine'
  },
  {
    question: 'Wie bekommt man Rocky wieder sauber, wenn er schmutzig ist?',
    answers: [
      { text: 'Seife', image: dogImg },
      { text: 'Spielzeug', image: bunnyImg },
      { text: 'Hundeknochen', image: catImg }
    ],
    correctAnswer: 'Seife'
  }
];

export default quizData;

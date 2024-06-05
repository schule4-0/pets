import dogImg from '@/assets/dog.png'
import bunnyImg from '@/assets/bunny.png'
import catImg from '@/assets/cat.png'

export interface Answer {
  text: string
  image: string
  isCorrect: boolean
}

export interface Quiz {
  question: string
  answers: Answer[]
}

const quizData: Quiz[] = [
  {
    question: 'Was sollte in der Tasche für Rocky sein, um mit ihm zu spielen?',
    answers: [
      { text: 'Ball', image: dogImg, isCorrect: true },
      { text: 'Buch', image: bunnyImg, isCorrect: false },
      { text: 'Hundebett', image: catImg, isCorrect: false }
    ]
  },
  {
    question: 'Welches Futter soll in Rockys Napf gelegt werden, um ihn zu füttern?',
    answers: [
      { text: 'Kuchen', image: dogImg, isCorrect: false },
      { text: 'Schokolade', image: bunnyImg, isCorrect: false },
      { text: 'Hundefutter', image: catImg, isCorrect: true }
    ]
  },
  {
    question: 'Was muss man beim Spazierengehen mitnehmen, damit Rocky nicht einfach wegläuft?',
    answers: [
      { text: 'Handy', image: dogImg, isCorrect: false },
      { text: 'Leine', image: bunnyImg, isCorrect: true },
      { text: 'Kartenspiel', image: catImg, isCorrect: false }
    ]
  },
  {
    question: 'Wie bekommt man Rocky wieder sauber, wenn er schmutzig ist?',
    answers: [
      { text: 'Seife', image: dogImg, isCorrect: true },
      { text: 'Spielzeug', image: bunnyImg, isCorrect: false },
      { text: 'Hundeknochen', image: catImg, isCorrect: false }
    ]
  }
]

export default quizData

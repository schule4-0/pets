import ballImg from '@/assets/recapQuiz/Ball.svg'
import bookImg from '@/assets/recapQuiz/Book.svg'
import dogBedImg from '@/assets/recapQuiz/Dogbed.svg'

import cakeImg from '@/assets/recapQuiz/Cake.svg'
import chocolateImg from '@/assets/recapQuiz/Chocolate.svg'
import dogFoodImg from '@/assets/recapQuiz/Dogfood.svg'

import phoneImg from '@/assets/recapQuiz/Phone.svg'
import leashImg from '@/assets/recapQuiz/Dogleash.svg'
import cardGameImg from '@/assets/recapQuiz/Cardgame.svg'

import soapImg from '@/assets/recapQuiz/Shampoo_2.svg'
import toyImg from '@/assets/recapQuiz/Frisbee.svg'
import boneImg from '@/assets/equipment/bone.png'

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
      { text: 'Ball', image: ballImg, isCorrect: true },
      { text: 'Buch', image: bookImg, isCorrect: false },
      { text: 'Hundebett', image: dogBedImg, isCorrect: false }
    ]
  },
  {
    question: 'Welches Futter soll in Rockys Napf gelegt werden, um ihn zu füttern?',
    answers: [
      { text: 'Kuchen', image: cakeImg, isCorrect: false },
      { text: 'Schokolade', image: chocolateImg, isCorrect: false },
      { text: 'Hundefutter', image: dogFoodImg, isCorrect: true }
    ]
  },
  {
    question: 'Was muss man beim Spazierengehen mitnehmen, damit Rocky nicht einfach wegläuft?',
    answers: [
      { text: 'Handy', image: phoneImg, isCorrect: false },
      { text: 'Leine', image: leashImg, isCorrect: true },
      { text: 'Kartenspiel', image: cardGameImg, isCorrect: false }
    ]
  },
  {
    question: 'Wie bekommt man Rocky wieder sauber, wenn er schmutzig ist?',
    answers: [
      { text: 'Seife', image: soapImg, isCorrect: true },
      { text: 'Spielzeug', image: toyImg, isCorrect: false },
      { text: 'Hundeknochen', image: boneImg, isCorrect: false }
    ]
  }
]

export default quizData

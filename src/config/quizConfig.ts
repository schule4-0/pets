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
  isIncorrect: number
}

export interface Quiz {
  question: string
  answers: Answer[]
}

const quizData: Quiz[] = [
  {
    question: 'Was sollte in der Tasche für Rocky sein? Ein Ball, Bücher oder ein Hundebett?',
    answers: [
      { text: 'Ball', image: ballImg, isCorrect: true, isIncorrect: 0 },
      { text: 'Buch', image: bookImg, isCorrect: false, isIncorrect: 1 },
      { text: 'Hundebett', image: dogBedImg, isCorrect: false, isIncorrect: 2 }
    ]
  },
  {
    question:
      'Welches Futter sollte in Rockys Napf gelegt werden, um ihn zu füttern? Kuchen, Schokolade oder Hundefutter?',
    answers: [
      { text: 'Kuchen', image: cakeImg, isCorrect: false, isIncorrect: 1 },
      { text: 'Schokolade', image: chocolateImg, isCorrect: false, isIncorrect: 2 },
      { text: 'Hundefutter', image: dogFoodImg, isCorrect: true, isIncorrect: 0 }
    ]
  },
  {
    question:
      'Was muss man beim Spazierengehen mitnehmen? Ein Handy, eine Leine oder ein Kartenspiel?',
    answers: [
      { text: 'Handy', image: phoneImg, isCorrect: false, isIncorrect: 1 },
      { text: 'Leine', image: leashImg, isCorrect: true, isIncorrect: 0 },
      { text: 'Kartenspiel', image: cardGameImg, isCorrect: false, isIncorrect: 2 }
    ]
  },
  {
    question:
      'Wie bekommt man Rocky wieder sauber wenn er schmutzig ist? Mit Seife, mit Spielzeug oder mit einem Hundeknochen?',
    answers: [
      { text: 'Seife', image: soapImg, isCorrect: true, isIncorrect: 0 },
      { text: 'Spielzeug', image: toyImg, isCorrect: false, isIncorrect: 1 },
      { text: 'Hundeknochen', image: boneImg, isCorrect: false, isIncorrect: 2 }
    ]
  }
]

export default quizData

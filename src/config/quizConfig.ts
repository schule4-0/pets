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

import type { MascotMessageKey } from './mascotMessages'

export interface Answer {
  text: string
  image: string
  isCorrect: boolean
  mascotMessageKey: MascotMessageKey
}

export interface Quiz {
  mascotMessageKey: MascotMessageKey
  answers: Answer[]
}

const quizData: Quiz[] = [
  {
    mascotMessageKey: 'STAGE5_QUESTION1',
    answers: [
      {
        text: 'Ball',
        image: ballImg,
        isCorrect: true,
        mascotMessageKey: 'STAGE5_CORRECT1'
      },
      {
        text: 'Buch',
        image: bookImg,
        isCorrect: false,
        mascotMessageKey: 'STAGE5_INCORRECT1_1'
      },
      {
        text: 'Hundebett',
        image: dogBedImg,
        isCorrect: false,
        mascotMessageKey: 'STAGE5_INCORRECT1_2'
      }
    ]
  },
  {
    mascotMessageKey: 'STAGE5_QUESTION2',
    answers: [
      {
        text: 'Kuchen',
        image: cakeImg,
        isCorrect: false,
        mascotMessageKey: 'STAGE5_INCORRECT2_1'
      },
      {
        text: 'Schokolade',
        image: chocolateImg,
        isCorrect: false,
        mascotMessageKey: 'STAGE5_INCORRECT2_2'
      },
      {
        text: 'Hundefutter',
        image: dogFoodImg,
        isCorrect: true,
        mascotMessageKey: 'STAGE5_CORRECT2'
      }
    ]
  },
  {
    mascotMessageKey: 'STAGE5_QUESTION3',
    answers: [
      {
        text: 'Handy',
        image: phoneImg,
        isCorrect: false,
        mascotMessageKey: 'STAGE5_INCORRECT3_1'
      },
      {
        text: 'Leine',
        image: leashImg,
        isCorrect: true,
        mascotMessageKey: 'STAGE5_CORRECT3'
      },
      {
        text: 'Kartenspiel',
        image: cardGameImg,
        isCorrect: false,
        mascotMessageKey: 'STAGE5_INCORRECT3_2'
      }
    ]
  },
  {
    mascotMessageKey: 'STAGE5_QUESTION4',
    answers: [
      {
        text: 'Seife',
        image: soapImg,
        isCorrect: true,
        mascotMessageKey: 'STAGE5_CORRECT4'
      },
      {
        text: 'Spielzeug',
        image: toyImg,
        isCorrect: false,
        mascotMessageKey: 'STAGE5_INCORRECT4_1'
      },
      {
        text: 'Hundeknochen',
        image: boneImg,
        isCorrect: false,
        mascotMessageKey: 'STAGE5_INCORRECT4_2'
      }
    ]
  }
]

export default quizData

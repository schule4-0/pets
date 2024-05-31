export type FaceExpression = 'happy' | 'sad' | 'neutral'

export type Message = {
  content: string
  faceExpression?: FaceExpression
}

type CollectionItem = {
  [key: string]: Message
}

type MessageCollection = {
  [key: string]: CollectionItem
}

export type MascotMessages = {
  [key: string]: MessageCollection
}

const mascotMessages: MascotMessages = {
  general: {
    expressions: {
      wrong: {
        content: 'Das war leider falsch. Versuche es doch nochmal'
      },
      correct: {
        content: 'Das war richtig. Gut gemacht!'
      }
    }
  },
  dog: {
    stage1: {
      message1: {
        content: 'Hallo, ich bin dein Helfer'
      },
      message2: {
        content: 'Packe alles, was Rocky benötigt in den Rucksack'
      }
    },
    stage2: {
      message1: {
        content: '2.Spiel'
      }
    },
    quiz: {
      correct: {
        content: 'Gut gemacht! Drücke auf den Pfeil.'
      },
      inCorrect1: {
        content: 'Damit kann Rocky nicht spielen. Versuch es doch noch einmal.'
      },
      inCorrect2: {
        content: 'Das sollte Rocky nicht essen. Versuch es doch noch einmal.'
      },
      inCorrect3: {
        content: 'Das kann man nicht an Rocky anbringen. Versuch es doch noch einmal.'
      },
      inCorrect4: {
        content: 'Damit kann man Rocky nicht sauber bekommen. Versuch es doch noch einmal.'
      },
      question1: {
        content: 'Was sollte in der Tasche für Rocky sein, um mit ihm zu spielen?'
      },
      question2: {
        content: 'Welches Futter soll in Rockys Napf gelegt werden, um ihn zu füttern?'
      },
      question3: {
        content: 'Was muss man beim Spazierengehen mitnehmen, damit Rocky nicht einfach wegläuft?'
      },
      question4: {
        content: 'Wie bekommt man Rocky wieder sauber, wenn er schmutzig ist?'
      }
    }
  }
}
export default mascotMessages

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
    }
  }
}
export default mascotMessages

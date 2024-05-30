export type FaceExpression = 'happy' | 'sad' | 'neutral'

export type Message = {
  content: string
  faceExpression?: FaceExpression
  audioFile?: string
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
        content: 'Das war leider falsch. Versuche es doch nochmal',
        audioFile: 'eeb3bd28e3be06eeaa839cc5bad03cb0.mp3'
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
        content: 'Packe alles, was Rocky benötigt in den Rucksack',
        audioFile: 'a9e0f348d1d144a2956e44152419034e.mp3'
      }
    },
    stage2: {
      message1: {
        content: '2.Spiel'
      }
    },
    stage3: {
      message1: {
        content: 'Gehen wir Gassi! Aber pass auf, dass Rocky nicht gegen Steine läuft!'
      },
      message2: {
        content: 'Aua! Das hat weh getan. Versuche es noch einmal!'
      },
      message3: {
        content: 'Super! Du hast es geschafft!'
      },
      message4: {
        content: 'Schade, du hast wohl ein paar Hundehaufen übersehen. Versuche es noch einmal!'
      }
    }
  }
}
export default mascotMessages

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
    stage3: {
      introduction: {
        content:
          'Oh je! Rockys Fell ist ja voller Schmutz, so können wir ihn nicht im Haus rumlaufen lassen. Los, lass uns Rocky waschen damit sein Fell wieder richtig toll glänzt!'
      },
      rockyIsShapooed: {
        content: 'Rocky ist jetzt mit genug Shapoo eingedeckt, Zeit ihn abzuwaschen!'
      },
      gameCompleted: {
        content: 'Wow Rocky ist jetzt wieder blitzblank! Nun müssen wir ihn nur noch abtrocknen.'
      }
    }
  }
}
export default mascotMessages

type FaceExpression = 'HAPPY' | 'SAD' | 'NEUTRAL'

export type Message = {
  content: string
  faceExpression?: FaceExpression
}

export type StringResourceKey = keyof typeof stringResources

const stringResources = {
  GENERAL_WRONG: {
    content: 'Das war leider falsch. Versuche es doch nochmal',
    faceExpression: 'SAD'
  },
  GENERAL_RIGHT: {
    content: 'Das war richtig. Gut gemacht!'
  },
  STAGE1_BACKPACK: {
    content: 'Packe alles, was Rocky benötigt in den Rucksack'
  },
  STAGE3_GOWALK: {
    content: 'Gehen wir Gassi! Aber pass auf, dass Rocky nicht gegen Steine läuft!'
  },
  STAGE3_OUTCH: {
    content: 'Aua! Das hat weh getan. Versuche es noch einmal!'
  },
  STAGE3_SUPER: {
    content: 'Super! Du hast es geschafft!'
  },
  STAGE3_TRYAGAIN: {
    content: 'Schade, du hast wohl ein paar Hundehaufen übersehen. Versuche es noch einmal!'
  },
  STAGEQUIZ_INCORRECT1: {
    content: 'Damit kann Rocky nicht spielen. Versuch es doch noch einmal.'
  },
  STAGEQUIZ_INCORRECT2: {
    content: 'Das sollte Rocky nicht essen. Versuch es doch noch einmal.'
  },
  STAGEQUIZ_INCORRECT3: {
    content: 'Das kann man nicht an Rocky anbringen. Versuch es doch noch einmal.'
  },
  STAGEQUIZ_INCORRECT4: {
    content: 'Damit kann man Rocky nicht sauber bekommen. Versuch es doch noch einmal.'
  },
  STAGEQUIZ_CORRECT: {
    content: 'Gut gemacht. Drücke auf den Pfeil.'
  }
} as const

export function getStringRes(key: StringResourceKey): Message {
  return stringResources[key]
}

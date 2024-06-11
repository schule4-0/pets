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
  REWARD_ROCKY_HAPPY: {
    content: 'Wau wau! Hier siehst du nochmal, was Rocky braucht.'
  },
  REWARD_GIVE_BONE: {
    content: 'Super gemacht! Gib Rocky einen Knochen!'
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
  STAGE3_EXPLAINATION: {
    content:
      'Versuche alle Hundehaufen einzusammeln. Es ist wichtig, dass wir die Umwelt sauber halten.'
  },
  STAGE4_INTRODUCTION: {
    content:
      'Oh je! Rockys Fell ist ja voller Schmutz, so können wir ihn nicht im Haus rumlaufen lassen. Los, lass uns Rocky waschen damit sein Fell wieder richtig toll glänzt!'
  },
  STAGE4_IS_SHAMPOOED: {
    content: 'Rocky ist jetzt mit genug Shapoo eingedeckt, Zeit ihn abzuwaschen!'
  },
  STAGE4_IS_SHOWERED: {
    content: 'Wow Rocky ist jetzt wieder blitzblank! Nun müssen wir ihn nur noch abtrocknen.'
  },
  STAGE4_IS_DRYED: {
    content: 'Rocky is dryed now!'
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

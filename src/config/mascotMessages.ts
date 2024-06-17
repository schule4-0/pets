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
  STAGE2_INTRODUCTION: {
    content:
      'Hilf Rocky, das richtige Futter zu fangen! Du kannst den Fressnapf hin und her bewegen. Achte dabei darauf, nur das Futter zu fangen, was Rocky auch fressen darf! Los geht’s!'
  },
  STAGE3_GOWALK: {
    content: 'Gehen wir Gassi! Aber pass auf, dass Rocky nicht gegen Steine läuft!'
  },
  STAGE3_OUTCH: {
    content: 'Aua! Das hat weh getan. Versuche es noch einmal!'
  },
  STAGE3_MISSED_POO: {
    content: 'Oh nein! Du hast einen Hundehaufen übersehen!'
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
  STAGE5_QUESTION1: {
    content: 'Was sollte in der Tasche für Rocky sein? Ein Ball, Bücher oder ein Hundebett?'
  },
  STAGE5_QUESTION2: {
    content:
      'Welches Futter sollte in Rockys Napf gelegt werden, um ihn zu füttern? Kuchen, Schokolade oder Hundefutter?'
  },
  STAGE5_QUESTION3: {
    content:
      'Was muss man beim Spazierengehen mitnehmen? Ein Handy, eine Leine oder ein Kartenspiel?'
  },
  STAGE5_QUESTION4: {
    content:
      'Wie bekommt man Rocky wieder sauber wenn er schmutzig ist? Mit Seife, mit Spielzeug oder mit einem Hundeknochen?'
  },
  STAGE5_INCORRECT1_1: {
    content:
      'Obwohl Bücher toll sind, um zu lesen, braucht Rocky etwas, mit dem er spielen kann, wenn er draußen ist.'
  },
  STAGE5_INCORRECT1_2: {
    content:
      'Ein Hundebett ist toll für zu Hause, aber es passt nicht in eine Tasche für unterwegs.'
  },
  STAGE5_INCORRECT2_1: {
    content: 'Kuchen ist für Menschen und kann für Rocky ungesund sein.'
  },
  STAGE5_INCORRECT2_2: {
    content: 'Schokolade kann Hunden schaden.'
  },
  STAGE5_INCORRECT3_1: {
    content: 'Ein Handy ist praktisch für Menschen, aber Rocky kann es nicht benutzen.'
  },
  STAGE5_INCORRECT3_2: {
    content:
      'Ein Kartenspiel ist etwas, das man drinnen spielt. Es hilft nicht beim Spazierengehen mit Rocky.'
  },
  STAGE5_INCORRECT4_1: {
    content: 'Spielzeug ist toll zum Spielen, aber es macht ihn nicht sauber.'
  },
  STAGE5_INCORRECT4_2: {
    content: 'Ein Hundeknochen ist ein tolles Spielzeug für Rocky, aber macht ihn nicht sauber.'
  },
  STAGE5_CORRECT1: {
    content: 'Ja das ist richtig! Mit einem Ball kann Rocky spielen'
  },
  STAGE5_CORRECT2: {
    content:
      'Hundefutter ist speziell für Hunde gemacht und enthält alles, was Rocky braucht, um gesund und stark zu bleiben!'
  },
  STAGE5_CORRECT3: {
    content: 'Genau! Die Leine ist dafür da, dass Rocky immer schön bei uns bleibt.'
  },
  STAGE5_CORRECT4: {
    content: 'Spitze! Mit Seife bekommen wir alles sauber.'
  },
  STAGE5_FINISH: {
    content: 'Toll gemacht! Du hast alle Fragen richtig beantwortet. Du kennst Rocky wirklich gut!'
  }
} as const

export function getStringRes(key: StringResourceKey): Message {
  return stringResources[key]
}

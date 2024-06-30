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
  REWARD_EXPLANATION: {
    content:
      'Rocky liebt es nach erledigten Aufgaben mit einem Knochen belohnt zu werden. Ziehe den Knochen zu Rocky.'
  },
  REWARD_ROCKY_HAPPY: {
    content: 'Hier siehst du nochmal die richtigen Antworten.'
  },
  REWARD_GIVE_BONE: {
    content: 'Super gemacht! Gib Rocky einen Knochen!'
  },
  ONBOARDING_PART1: {
    content: 'Hallo, ich bin Lisa und ich möchte dir jemanden ganz Besonderen vorstellen'
  },
  ONBOARDING_PART2: {
    content:
      'Das ist Rocky, mein treuer und fröhlicher Hund. Es ist ein wunderschöner Morgen, und Rocky ist voller Energie. Ich habe jedoch eine Menge Dinge zu erledigen und brauche dringend deine Hilfe. Du wirst einen Tag voller Spaß mit Rocky erleben. Es warten viele spannende Aufgaben, die du zusammen mit Rocky bewältigen wirst. Doch bevor ihr loszieht, müsst ihr zuerst noch Rockys Rucksack packen.'
  },
  STAGE1_BACKPACK: {
    content:
      'Oben links siehst du die Gegenstände, die ihr  für den Tag benötigt. Finde sie und ziehe sie in den Rucksack.'
  },
  STAGE1_WRONG: {
    content: 'Gute Idee, aber das steht leider nicht auf der Liste. Versuchs nochmal!'
  },
  STAGE1_BALL: {
    content: 'Spitze! Mit dem Ball kann Rocky spielen und Spaß haben.'
  },
  STAGE1_FEEDING_BOWL: {
    content:
      'Ja, der Fressnapf ist wichtig, damit Rocky sein Futter und Wasser daraus essen und trinken kann.'
  },
  STAGE1_TREATS: {
    content:
      'Sehr gut! Leckerli sind kleine Belohnungen für Rocky, wenn er etwas gut gemacht hat. Sie machen ihn glücklich!'
  },
  STAGE1_TOYS: {
    content:
      'Genau! Das Spielzeug ist zum Spielen da. Rocky hat Spaß damit und es hilft ihm, sich nicht zu langweilen.'
  },
  STAGE1_BONE: {
    content:
      'Richtig! Der Knochen ist ein leckeres Kauspielzeug für Rocky. Er kann darauf herumkauen und seine Zähne sauber halten.'
  },
  STAGE1_PLASTIC_BAG: {
    content:
      'Klasse! Die Plastiktüte brauchen wir, um Rockys Haufen aufzuheben, wenn wir spazieren gehen. So bleibt die Umgebung sauber.'
  },
  STAGE1_ALL_PACKED: {
    content: 'Spitze! Jetzt hast du alles, was Rocky braucht.'
  },
  STAGE2_TIME_TO_FEED: {
    content:
      'Nun ist es Zeit, Rocky zu füttern. Lass uns doch schauen, was Rocky heute essen möchte!'
  },
  STAGE2_INTRODUCTION: {
    content:
      'Hilf Rocky, das richtige Futter zu fangen! Du kannst den Fressnapf hin- und herbewegen. Achte dabei darauf, nur das Futter zu fangen, was Rocky auch fressen darf! Los geht’s!'
  },
  STAGE2_UNHEALTHY: {
    content: 'Das darf Rocky leider nicht essen. Das ist ungesund für ihn'
  },
  STAGE2_UNHEALTHY2: {
    content: 'Das darf Rocky leider nicht essen. Es ist nicht gut für Hunde'
  },
  STAGE2_FEEDING_DONE: {
    content: 'Das hast du toll gemacht! Jetzt ist Rocky satt und bereit für den Spaziergang'
  },
  STAGE3_GOWALK: {
    content:
      'Bist du bereit für einen Spaziergang? Los geht’s! Achte  darauf, Hindernissen auszuweichen und Hundehaufen, die Rocky hinterlässt,  einzusammeln. Tippe auf Rocky, damit er losläuft. Siehst du ein Hindernis, tippst auf den Knopf unten links. Um die Hundehaufen aufzusammeln, berühre sie mit  deinem Finger'
  },
  STAGE3_WAS_CLOSE: {
    content: 'Hmm… Das war knapp! Versuch es noch einmal, du schaffst das bestimmt!'
  },
  STAGE3_OUTCH: {
    content:
      'Hoppla! Achte darauf, dass Rocky den Hindernissen ausweicht, damit er sich nicht wehtut.'
  },
  STAGE3_MISSED_POO: {
    content:
      'Oh, du hast da etwas übersehen. Denk daran, alle Hundehaufen einzusammeln, damit der Weg sauber bleibt.'
  },
  STAGE3_SUPER: {
    content: 'Das hast du super gemacht!'
  },
  STAGE3_GREAT_WALK: {
    content:
      'Das war ein toller Spaziergang! Rocky ist aber ein bisschen schmutzig geworden. Lass uns nach Hause gehen und ihn gemeinsam sauber machen.'
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
  STAGE4_SHAMPOO_EXPLANATION: {
    content:
      'Zuerst müssen wir Rocky einseifen, damit der ganze Schmutz und die Bakterien aus seinem Fell entfernt werden. Wische mit deinem Finger hin und her, um Rocky einzuseifen.'
  },
  STAGE4_IS_SHAMPOOED: {
    content:
      'Spitze! Jetzt müssen wir die Seife wieder abwaschen. Das ist wichtig, damit keine Seifenreste in Rockys Fell bleiben. Ziehe den Duschkopf zu Rocky und wische wieder hin und her um ihn abzuwaschen.'
  },
  STAGE4_IS_SHOWERED: {
    content:
      'Wow Rocky ist jetzt wieder blitzblank! Nun müssen wir ihn nur noch abtrocknen. Ziehe den Föhn zu Rocky und trockne ihn damit gründlich ab'
  },
  STAGE4_WASHING_DONE: {
    content:
      'Wunderbar, du bist ein richtiger Tierexperte! Da Rocky so brav beim Waschen war, sollten wir ihm eine Belohnung geben!'
  },
  STAGE5_INTRODUCTION: {
    content:
      'Du hast dich wunderbar um Rocky gekümmert - vielen Dank! Jetzt wollen wir mal schauen, wie gut du Rocky auch kennst. Bist du bereit dein Wissen zu testen? Na dann lass uns mit dem Quiz starten!'
  },
  STAGE5_QUESTION1: {
    content: 'Was sollte in der Tasche für Rocky sein?'
  },
  STAGE5_QUESTION2: {
    content: 'Welches Futter sollte in Rockys Napf gelegt werden, um ihn zu füttern?'
  },
  STAGE5_QUESTION3: {
    content: 'Was muss man beim Spazierengehen mitnehmen?'
  },
  STAGE5_QUESTION4: {
    content: 'Wie bekommt man Rocky wieder sauber wenn er schmutzig ist?'
  },
  STAGE5_INCORRECT1_1: {
    content:
      'Obwohl Bücher toll sind, um zu lesen, braucht Rocky etwas, mit dem er spielen kann, wenn er draußen ist.'
  },
  STAGE5_INCORRECT1_2: {
    content:
      'Ein Hundebett ist toll für zu Hause, aber es passt nicht in deine Tasche für unterwegs.'
  },
  STAGE5_INCORRECT2_1: {
    content: 'Kuchen ist für Menschen und kann für Rocky ungesund sein.'
  },
  STAGE5_INCORRECT2_2: {
    content: 'Schade, Schokolade schadet den Hunden.'
  },
  STAGE5_INCORRECT3_1: {
    content: 'Ein Handy ist zwar praktisch für uns Menschen, aber Rocky kann es nicht benutzen.'
  },
  STAGE5_INCORRECT3_2: {
    content:
      'Ein Kartenspiel ist etwas, mit dem man drinnen spielt. Es hilft nicht beim Spazierengehen mit Rocky.'
  },
  STAGE5_INCORRECT4_1: {
    content:
      'Spielzeug ist toll zum Spielen, aber um Rocky sauber zu bekommen brauchen wir etwas anderes.'
  },
  STAGE5_INCORRECT4_2: {
    content: 'Ein Hundeknochen ist ein tolles Spielzeug für Rocky, aber macht ihn nicht sauber.'
  },
  STAGE5_CORRECT1: {
    content: 'Ja das ist richtig! Mit einem Ball kann Rocky spielen'
  },
  STAGE5_CORRECT2: {
    content:
      'Hundefutter ist speziell für Hunde gemacht und enthält alles, was Rocky braucht, um gesund und stark zu bleiben. Toll!'
  },
  STAGE5_CORRECT3: {
    content: 'Genau! Die Leine ist dafür da, dass Rocky immer schön bei uns bleibt.'
  },
  STAGE5_CORRECT4: {
    content: 'Spitze! Mit Seife bekommen wir alles wieder sauber.'
  },
  STAGE5_FINISH: {
    content:
      'Toll gemacht! Du hast alle Fragen richtig beantwortet. Du kennst Rocky wirklich wirklich gut!'
  },
  GAME_FINISHED: {
    content:
      'Du hast großartig geholfen! Rocky ist dank dir jetzt glücklich und zufrieden. Wir hatten heute viel Spaß miteinander und freuen uns schon aufs nächste Mal!'
  }
} as const

export function getStringRes(key: StringResourceKey): Message {
  return stringResources[key]
}

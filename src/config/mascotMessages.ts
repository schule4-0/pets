import GENERAL_WRONG from '@/assets/audio/mascot/GENERAL_WRONG.mp3'
import GENERAL_RIGHT from '@/assets/audio/mascot/GENERAL_RIGHT.mp3'
import REWARD_EXPLANATION from '@/assets/audio/mascot/REWARD_EXPLANATION.mp3'
import REWARD_GIVE_BONE from '@/assets/audio/mascot/REWARD_GIVE_BONE.mp3'
import ONBOARDING from '@/assets/audio/mascot/ONBOARDING.mp3'
import STAGE1_BACKPACK from '@/assets/audio/mascot/STAGE1_BACKPACK.mp3'
import STAGE1_WRONG from '@/assets/audio/mascot/STAGE1_WRONG.mp3'
import STAGE1_BALL from '@/assets/audio/mascot/STAGE1_BALL.mp3'
import STAGE1_FEEDING_BOWL from '@/assets/audio/mascot/STAGE1_FEEDING_BOWL.mp3'
import STAGE1_TREATS from '@/assets/audio/mascot/STAGE1_TREATS.mp3'
import STAGE1_TOYS from '@/assets/audio/mascot/STAGE1_TOYS.mp3'
import STAGE1_BONE from '@/assets/audio/mascot/STAGE1_BONE.mp3'
import STAGE1_PLASTIC_BAG from '@/assets/audio/mascot/STAGE1_PLASTIC_BAG.mp3'
import STAGE1_ALL_PACKED from '@/assets/audio/mascot/STAGE1_ALL_PACKED.mp3'
import STAGE2_TIME_TO_FEED from '@/assets/audio/mascot/STAGE2_TIME_TO_FEED.mp3'
import STAGE2_INTRODUCTION from '@/assets/audio/mascot/STAGE2_INTRODUCTION.mp3'
import STAGE2_UNHEALTHY from '@/assets/audio/mascot/STAGE2_UNHEALTHY.mp3'
import STAGE2_UNHEALTHY2 from '@/assets/audio/mascot/STAGE2_UNHEALTHY2.mp3'
import STAGE2_FEEDING_DONE from '@/assets/audio/mascot/STAGE2_FEEDING_DONE.mp3'
import STAGE3_GOWALK from '@/assets/audio/mascot/STAGE3_GOWALK.mp3'
import STAGE3_WAS_CLOSE from '@/assets/audio/mascot/STAGE3_WAS_CLOSE.mp3'
import STAGE3_OUTCH from '@/assets/audio/mascot/STAGE3_OUTCH.mp3'
import STAGE3_MISSED_POO from '@/assets/audio/mascot/STAGE3_MISSED_POO.mp3'
import STAGE3_SUPER from '@/assets/audio/mascot/STAGE3_SUPER.mp3'
import STAGE3_GREAT_WALK from '@/assets/audio/mascot/STAGE3_GREAT_WALK.mp3'
import STAGE4_INTRODUCTION from '@/assets/audio/mascot/STAGE4_INTRODUCTION.mp3'
import STAGE4_SHAMPOO_EXPLANATION from '@/assets/audio/mascot/STAGE4_SHAMPOO_EXPLANATION.mp3'
import STAGE4_IS_SHAMPOOED from '@/assets/audio/mascot/STAGE4_IS_SHAMPOOED.mp3'
import STAGE4_IS_SHOWERED from '@/assets/audio/mascot/STAGE4_IS_SHOWERED.mp3'
import STAGE4_WASHING_DONE from '@/assets/audio/mascot/STAGE4_WASHING_DONE.mp3'
import STAGE5_INTRODUCTION from '@/assets/audio/mascot/STAGE5_INTRODUCTION.mp3'
import STAGE5_QUESTION1 from '@/assets/audio/mascot/STAGE5_QUESTION1.mp3'
import STAGE5_QUESTION2 from '@/assets/audio/mascot/STAGE5_QUESTION2.mp3'
import STAGE5_QUESTION3 from '@/assets/audio/mascot/STAGE5_QUESTION3.mp3'
import STAGE5_QUESTION4 from '@/assets/audio/mascot/STAGE5_QUESTION4.mp3'
import STAGE5_INCORRECT1_1 from '@/assets/audio/mascot/STAGE5_INCORRECT1_1.mp3'
import STAGE5_INCORRECT1_2 from '@/assets/audio/mascot/STAGE5_INCORRECT1_2.mp3'
import STAGE5_INCORRECT2_1 from '@/assets/audio/mascot/STAGE5_INCORRECT2_1.mp3'
import STAGE5_INCORRECT2_2 from '@/assets/audio/mascot/STAGE5_INCORRECT2_2.mp3'
import STAGE5_INCORRECT3_1 from '@/assets/audio/mascot/STAGE5_INCORRECT3_1.mp3'
import STAGE5_INCORRECT3_2 from '@/assets/audio/mascot/STAGE5_INCORRECT3_2.mp3'
import STAGE5_INCORRECT4_1 from '@/assets/audio/mascot/STAGE5_INCORRECT4_1.mp3'
import STAGE5_INCORRECT4_2 from '@/assets/audio/mascot/STAGE5_INCORRECT4_2.mp3'
import STAGE5_CORRECT1 from '@/assets/audio/mascot/STAGE5_CORRECT1.mp3'
import STAGE5_CORRECT2 from '@/assets/audio/mascot/STAGE5_CORRECT2.mp3'
import STAGE5_CORRECT3 from '@/assets/audio/mascot/STAGE5_CORRECT3.mp3'
import STAGE5_CORRECT4 from '@/assets/audio/mascot/STAGE5_CORRECT4.mp3'
import STAGE5_FINISH from '@/assets/audio/mascot/STAGE5_FINISH.mp3'
import GAME_FINISHED from '@/assets/audio/mascot/GAME_FINISHED.mp3'

type FaceExpression = 'HAPPY' | 'SAD' | 'NEUTRAL'

export interface MascotMessage {
  content: string
  audioSrc: string
  faceExpression?: FaceExpression
}

export type MascotMessageKey = keyof typeof mascotMessages

const mascotMessages = {
  GENERAL_WRONG: {
    content: 'Das war leider falsch. Versuche es doch nochmal',
    audioSrc: GENERAL_WRONG,
    faceExpression: 'SAD'
  },
  GENERAL_RIGHT: {
    content: 'Das war richtig. Gut gemacht!',
    audioSrc: GENERAL_RIGHT
  },
  REWARD_EXPLANATION: {
    content:
      'Rocky liebt es nach erledigten Aufgaben mit einem Knochen belohnt zu werden. Ziehe den Knochen zu Rocky.',
    audioSrc: REWARD_EXPLANATION
  },
  REWARD_GIVE_BONE: {
    content: 'Super gemacht! Gib Rocky einen Knochen!',
    audioSrc: REWARD_GIVE_BONE
  },
  ONBOARDING: {
    content:
      'Hallo, ich bin Lisa und ich möchte dir jemanden ganz Besonderen vorstellen. Das ist Rocky, mein treuer und fröhlicher Hund. Es ist ein wunderschöner Morgen, und Rocky ist voller Energie. Ich habe jedoch eine Menge Dinge zu erledigen und brauche dringend deine Hilfe. Du wirst einen Tag voller Spaß mit Rocky erleben. Es warten viele spannende Aufgaben, die du zusammen mit Rocky bewältigen wirst. Doch bevor ihr loszieht, müsst ihr zuerst noch Rockys Rucksack packen.',
    audioSrc: ONBOARDING
  },
  STAGE1_BACKPACK: {
    content:
      'Oben links siehst du die Gegenstände, die ihr  für den Tag benötigt. Finde sie und ziehe sie in den Rucksack.',
    audioSrc: STAGE1_BACKPACK
  },
  STAGE1_WRONG: {
    content: 'Gute Idee, aber das steht leider nicht auf der Liste. Versuchs nochmal!',
    audioSrc: STAGE1_WRONG
  },
  STAGE1_BALL: {
    content: 'Spitze! Mit dem Ball kann Rocky spielen und Spaß haben.',
    audioSrc: STAGE1_BALL
  },
  STAGE1_FEEDING_BOWL: {
    content:
      'Ja, der Fressnapf ist wichtig, damit Rocky sein Futter und Wasser daraus essen und trinken kann.',
    audioSrc: STAGE1_FEEDING_BOWL
  },
  STAGE1_TREATS: {
    content:
      'Sehr gut! Leckerli sind kleine Belohnungen für Rocky, wenn er etwas gut gemacht hat. Sie machen ihn glücklich!',
    audioSrc: STAGE1_TREATS
  },
  STAGE1_TOYS: {
    content:
      'Genau! Das Spielzeug ist zum Spielen da. Rocky hat Spaß damit und es hilft ihm, sich nicht zu langweilen.',
    audioSrc: STAGE1_TOYS
  },
  STAGE1_BONE: {
    content:
      'Richtig! Der Knochen ist ein leckeres Kauspielzeug für Rocky. Er kann darauf herumkauen und seine Zähne sauber halten.',
    audioSrc: STAGE1_BONE
  },
  STAGE1_PLASTIC_BAG: {
    content:
      'Klasse! Die Plastiktüte brauchen wir, um Rockys Haufen aufzuheben, wenn wir spazieren gehen. So bleibt die Umgebung sauber.',
    audioSrc: STAGE1_PLASTIC_BAG
  },
  STAGE1_ALL_PACKED: {
    content: 'Spitze! Jetzt hast du alles, was Rocky braucht.',
    audioSrc: STAGE1_ALL_PACKED
  },
  STAGE2_TIME_TO_FEED: {
    content:
      'Nun ist es Zeit, Rocky zu füttern. Lass uns doch schauen, was Rocky heute essen möchte!',
    audioSrc: STAGE2_TIME_TO_FEED
  },
  STAGE2_INTRODUCTION: {
    content:
      'Hilf Rocky, das richtige Futter zu fangen! Du kannst den Fressnapf hin- und herbewegen. Achte dabei darauf, nur das Futter zu fangen, was Rocky auch fressen darf! Los geht’s!',
    audioSrc: STAGE2_INTRODUCTION
  },
  STAGE2_UNHEALTHY: {
    content: 'Das darf Rocky leider nicht essen. Das ist ungesund für ihn',
    audioSrc: STAGE2_UNHEALTHY
  },
  STAGE2_UNHEALTHY2: {
    content: 'Das darf Rocky leider nicht essen. Es ist nicht gut für Hunde',
    audioSrc: STAGE2_UNHEALTHY2
  },
  STAGE2_FEEDING_DONE: {
    content: 'Das hast du toll gemacht! Jetzt ist Rocky satt und bereit für den Spaziergang',
    audioSrc: STAGE2_FEEDING_DONE
  },
  STAGE3_GOWALK: {
    content:
      'Bist du bereit für einen Spaziergang? Los geht’s! Achte  darauf, Hindernissen auszuweichen und Hundehaufen, die Rocky hinterlässt,  einzusammeln. Tippe auf Rocky, damit er losläuft. Siehst du ein Hindernis, tippst auf den Knopf unten links. Um die Hundehaufen aufzusammeln, berühre sie mit  deinem Finger',
    audioSrc: STAGE3_GOWALK
  },
  STAGE3_WAS_CLOSE: {
    content: 'Hmm… Das war knapp! Versuch es noch einmal, du schaffst das bestimmt!',
    audioSrc: STAGE3_WAS_CLOSE
  },
  STAGE3_OUTCH: {
    content:
      'Hoppla! Achte darauf, dass Rocky den Hindernissen ausweicht, damit er sich nicht wehtut.',
    audioSrc: STAGE3_OUTCH
  },
  STAGE3_MISSED_POO: {
    content:
      'Oh, du hast da etwas übersehen. Denk daran, alle Hundehaufen einzusammeln, damit der Weg sauber bleibt.',
    audioSrc: STAGE3_MISSED_POO
  },
  STAGE3_SUPER: {
    content: 'Das hast du super gemacht!',
    audioSrc: STAGE3_SUPER
  },
  STAGE3_GREAT_WALK: {
    content:
      'Das war ein toller Spaziergang! Rocky ist aber ein bisschen schmutzig geworden. Lass uns nach Hause gehen und ihn gemeinsam sauber machen.',
    audioSrc: STAGE3_GREAT_WALK
  },
  STAGE4_INTRODUCTION: {
    content:
      'Oh je! Rockys Fell ist ja voller Schmutz, so können wir ihn nicht im Haus rumlaufen lassen. Los, lass uns Rocky waschen damit sein Fell wieder richtig toll glänzt!',
    audioSrc: STAGE4_INTRODUCTION
  },
  STAGE4_SHAMPOO_EXPLANATION: {
    content:
      'Zuerst müssen wir Rocky einseifen, damit der ganze Schmutz und die Bakterien aus seinem Fell entfernt werden. Wische mit deinem Finger hin und her, um Rocky einzuseifen.',
    audioSrc: STAGE4_SHAMPOO_EXPLANATION
  },
  STAGE4_IS_SHAMPOOED: {
    content:
      'Spitze! Jetzt müssen wir die Seife wieder abwaschen. Das ist wichtig, damit keine Seifenreste in Rockys Fell bleiben. Ziehe den Duschkopf zu Rocky und wische wieder hin und her um ihn abzuwaschen.',
    audioSrc: STAGE4_IS_SHAMPOOED
  },
  STAGE4_IS_SHOWERED: {
    content:
      'Wow Rocky ist jetzt wieder blitzblank! Nun müssen wir ihn nur noch abtrocknen. Ziehe den Föhn zu Rocky und trockne ihn damit gründlich ab',
    audioSrc: STAGE4_IS_SHOWERED
  },
  STAGE4_WASHING_DONE: {
    content:
      'Wunderbar, du bist ein richtiger Tierexperte! Da Rocky so brav beim Waschen war, sollten wir ihm eine Belohnung geben!',
    audioSrc: STAGE4_WASHING_DONE
  },
  STAGE5_INTRODUCTION: {
    content:
      'Du hast dich wunderbar um Rocky gekümmert - vielen Dank! Jetzt wollen wir mal schauen, wie gut du Rocky auch kennst. Bist du bereit dein Wissen zu testen? Na dann lass uns mit dem Quiz starten!',
    audioSrc: STAGE5_INTRODUCTION
  },
  STAGE5_QUESTION1: {
    content: 'Was sollte in der Tasche für Rocky sein?',
    audioSrc: STAGE5_QUESTION1
  },
  STAGE5_QUESTION2: {
    content: 'Welches Futter sollte in Rockys Napf gelegt werden, um ihn zu füttern?',
    audioSrc: STAGE5_QUESTION2
  },
  STAGE5_QUESTION3: {
    content: 'Was muss man beim Spazierengehen mitnehmen?',
    audioSrc: STAGE5_QUESTION3
  },
  STAGE5_QUESTION4: {
    content: 'Wie bekommt man Rocky wieder sauber wenn er schmutzig ist?',
    audioSrc: STAGE5_QUESTION4
  },
  STAGE5_INCORRECT1_1: {
    content:
      'Obwohl Bücher toll sind, um zu lesen, braucht Rocky etwas, mit dem er spielen kann, wenn er draußen ist.',
    audioSrc: STAGE5_INCORRECT1_1
  },
  STAGE5_INCORRECT1_2: {
    content:
      'Ein Hundebett ist toll für zu Hause, aber es passt nicht in deine Tasche für unterwegs.',
    audioSrc: STAGE5_INCORRECT1_2
  },
  STAGE5_INCORRECT2_1: {
    content: 'Kuchen ist für Menschen und kann für Rocky ungesund sein.',
    audioSrc: STAGE5_INCORRECT2_1
  },
  STAGE5_INCORRECT2_2: {
    content: 'Schade, Schokolade schadet den Hunden.',
    audioSrc: STAGE5_INCORRECT2_2
  },
  STAGE5_INCORRECT3_1: {
    content: 'Ein Handy ist zwar praktisch für uns Menschen, aber Rocky kann es nicht benutzen.',
    audioSrc: STAGE5_INCORRECT3_1
  },
  STAGE5_INCORRECT3_2: {
    content:
      'Ein Kartenspiel ist etwas, mit dem man drinnen spielt. Es hilft nicht beim Spazierengehen mit Rocky.',
    audioSrc: STAGE5_INCORRECT3_2
  },
  STAGE5_INCORRECT4_1: {
    content:
      'Spielzeug ist toll zum Spielen, aber um Rocky sauber zu bekommen brauchen wir etwas anderes.',
    audioSrc: STAGE5_INCORRECT4_1
  },
  STAGE5_INCORRECT4_2: {
    content: 'Ein Hundeknochen ist ein tolles Spielzeug für Rocky, aber macht ihn nicht sauber.',
    audioSrc: STAGE5_INCORRECT4_2
  },
  STAGE5_CORRECT1: {
    content: 'Ja das ist richtig! Mit einem Ball kann Rocky spielen',
    audioSrc: STAGE5_CORRECT1
  },
  STAGE5_CORRECT2: {
    content:
      'Hundefutter ist speziell für Hunde gemacht und enthält alles, was Rocky braucht, um gesund und stark zu bleiben. Toll!',
    audioSrc: STAGE5_CORRECT2
  },
  STAGE5_CORRECT3: {
    content: 'Genau! Die Leine ist dafür da, dass Rocky immer schön bei uns bleibt.',
    audioSrc: STAGE5_CORRECT3
  },
  STAGE5_CORRECT4: {
    content: 'Spitze! Mit Seife bekommen wir alles wieder sauber.',
    audioSrc: STAGE5_CORRECT4
  },
  STAGE5_FINISH: {
    content:
      'Toll gemacht! Du hast alle Fragen richtig beantwortet. Du kennst Rocky wirklich wirklich gut!',
    audioSrc: STAGE5_FINISH
  },
  GAME_FINISHED: {
    content:
      'Du hast großartig geholfen! Rocky ist dank dir jetzt glücklich und zufrieden. Wir hatten heute viel Spaß miteinander und freuen uns schon aufs nächste Mal!',
    audioSrc: GAME_FINISHED
  }
} as const

export function getMascotMessage(key: MascotMessageKey): MascotMessage {
  return mascotMessages[key]
}

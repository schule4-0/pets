import CLICK from '@/assets/audio/soundEffects/click.mp3'
import CORRECT_FOOD from '@/assets/audio/soundEffects/bite.mp3'
import BG_MUSIC_NUTRITION from '@/assets/audio/backgroundMusic/minigameFood_backgroundMusic.mp3'
import SHOWER from '@/assets/audio/soundEffects/water.mp3'
import DRYER from '@/assets/audio/soundEffects/dryer.mp3'
import CORRECT_BLING_SOUND from '@/assets/audio/soundEffects/correct_answer.mp3'
import DOG_HOWLING from '@/assets/audio/soundEffects/dog_howling1.mp3'
import DOG_JUMP from '@/assets/audio/soundEffects/jump.mp3'
import DOG_WALK from '@/assets/audio/soundEffects/walk.mp3'
import BG_MUSIC_WALK from '@/assets/audio/backgroundMusic/minigameWalk_backgroundMusic.mp3'
import DOG_BARK from '@/assets/audio/soundEffects/bark.mp3'
import BUBBLE_SOUND_1 from '@/assets/audio/soundEffects/bubbles/bubble1.mp3'
import BUBBLE_SOUND_2 from '@/assets/audio/soundEffects/bubbles/bubble2.mp3'
import BUBBLE_SOUND_3 from '@/assets/audio/soundEffects/bubbles/bubble3.mp3'
import BUBBLE_SOUND_4 from '@/assets/audio/soundEffects/bubbles/bubble4.mp3'

export const soundMappings = {
  CLICK,
  CORRECT_FOOD,
  BG_MUSIC_NUTRITION,
  SHOWER,
  DRYER,
  CORRECT_BLING_SOUND,
  DOG_HOWLING,
  DOG_JUMP,
  DOG_WALK,
  BG_MUSIC_WALK,
  DOG_BARK,
  RANDOM_BUBBLES: [BUBBLE_SOUND_1, BUBBLE_SOUND_2, BUBBLE_SOUND_3, BUBBLE_SOUND_4]
} as const

export type SoundIdentifier = keyof typeof soundMappings

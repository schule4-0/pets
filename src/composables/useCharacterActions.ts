import { ref, watch } from 'vue'
import type { CharacterActions } from '@/components/minigame-walk/JumpNRunCharacter.vue'
import type JumpNRunCharacter from '@/components/minigame-walk/JumpNRunCharacter.vue'
import { useAudioManager } from '@/stores/useAudioManager'

export const useCharacterActions = () => {
  const audioManager = useAudioManager()
  const currentActionSoundId = ref<string | undefined>(undefined)

  const characterAction = ref<CharacterActions>('sit')
  const characterRef = ref<InstanceType<typeof JumpNRunCharacter> | null>(null)

  const triggerJump = () => {
    if (characterAction.value !== 'jump') {
      characterAction.value = 'jump'
    }
  }

  const handleJumpComplete = () => {
    if (characterAction.value !== 'hurt') {
      characterAction.value = 'run'
    }
  }

  // Play audio based on character action
  watch(characterAction, async (newAction) => {
    if (currentActionSoundId.value) {
      audioManager.stopSound(currentActionSoundId.value)
      currentActionSoundId.value = undefined
    }

    switch (newAction) {
      case 'sit':
        // No sound
        break
      case 'run':
        currentActionSoundId.value = await audioManager.playSound('DOG_WALK', { loop: true })
        break
      case 'jump':
        currentActionSoundId.value = await audioManager.playSound('DOG_JUMP')
        break
      case 'poop':
        // No sound
        break
      case 'hurt':
        currentActionSoundId.value = await audioManager.playSound('DOG_HOWLING')
        break
    }
  })

  return {
    characterAction,
    characterRef,
    triggerJump,
    handleJumpComplete
  }
}

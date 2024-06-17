import { ref } from 'vue'
import type { CharacterActions } from '@/components/minigame-walk/JumpNRunCharacter.vue'
import type JumpNRunCharacter from '@/components/minigame-walk/JumpNRunCharacter.vue'

export const useCharacterActions = () => {
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

  return {
    characterAction,
    characterRef,
    triggerJump,
    handleJumpComplete
  }
}

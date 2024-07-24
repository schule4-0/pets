<template>
  <div class="pet-card" @click="handlePetSelected" :class="{ locked: props.isLocked }">
    <div class="pet-card-image-container">
      <img :src="pet.image" :alt="pet.name" />
      <div v-if="props.isLocked" class="lock-overlay">
        <img :src="iconLock" alt="locked" />
      </div>
    </div>
    <div class="pet-card-title-container">
      <h4>{{ pet.name }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pet } from '@/config/petsConfig'
import { useRouter } from 'vue-router'
import iconLock from '@/assets/icon_lock.svg'
import { useAudioManager } from '@/stores/useAudioManager'

const props = defineProps<{
  pet: Pet
  isLocked: boolean
}>()

const router = useRouter()
const audioManager = useAudioManager()

const handlePetSelected = () => {
  if (!props.isLocked) {
    audioManager.playSound('CLICK')
    router.push(`/pets/${props.pet.englishName}/stages/0`)
  }
}
</script>

<style scoped>
.pet-card {
  width: 100%;
  max-width: 300px;
  background-color: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
}

.pet-card.locked {
  pointer-events: none;

  .pet-card-title-container {
    opacity: 0.6;
  }
}

.pet-card-image-container {
  width: 100%;
  height: 200px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(136, 136, 136, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 58px;
    height: 58px;
  }
}

.pet-card-title-container {
  background-color: #ffffff;
  width: 100%;
  padding: 12px 24px;
  font-size: 24px;
  color: var(--s40-color-primary);
}
</style>

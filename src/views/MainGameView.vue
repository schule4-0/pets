<template>
  <main>
    <div class="transition-overlay" :class="{ darken: isStageOverlayActive }"></div>
    <!-- Main game content displayed through router-view -->
    <div class="game-content">
      <RouterView />
    </div>

    <!-- Overlay content positioned at corners over the game content -->
    <div class="overlay-top-left">
      <div class="navigation">
        <button @click="goBack" class="navigationButtons">
          <img src="@/assets/icons/icon_back.svg" />
        </button>
        <h2>Minispiel</h2>
        <button @click="goNext" class="navigationButtons">
          <!-- should be removed, because of cheating? -->
          <img src="@/assets/icons/icon_next.svg" />
        </button>
      </div>
      <div class="overlay-top-right">
        <button @click="openModal" class="navigationButtons">
          <img src="@/assets/icons/icon_close.svg" />
        </button>
      </div>
    </div>
    <div v-if="mascot.showMascot" class="mascot">
      <mascot-item :quizAppearance="false" />
    </div>
    <div class="modal">
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Möchtest du das Spiel beenden?</h2>
          <button @click="goBackToHome" class="modal-button">Ja</button>
          <button @click="closeModal" class="modal-button">Nein</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import MascotItem from '@/components/MascotItem.vue'
import { useStageNavigator } from '@/composables/useNavigation'
import { useMascotStore } from '@/stores/useMascotStore'
import clickSound from '@/assets/audio/soundEffects/click.mp3'
import { useStageStore } from '@/stores/useStageStore'
import { storeToRefs } from 'pinia'
import { useAudioManager } from '@/stores/useAudioManager'

const router = useRouter()
const mascot = useMascotStore()
const { isActive: isStageOverlayActive } = storeToRefs(useStageStore())
const audioManager = useAudioManager()

const { goToNextStage, goToPreviousStage } = useStageNavigator()

const showModal = ref(false)

function goNext() {
  audioManager.playSound('CLICK')
  goToNextStage()
}
function goBack() {
  audioManager.playSound('CLICK')
  goToPreviousStage()
}

function goBackToHome() {
  audioManager.playSound('CLICK')
  router.push(`/`)
}

const openModal = () => {
  audioManager.playSound('CLICK')
  showModal.value = true
}

const closeModal = () => {
  audioManager.playSound('CLICK')
  showModal.value = false
}
</script>

<style scoped lang="scss">
main {
  position: relative;
  width: 100%;
  height: 100vh;

  .game-content {
    position: absolute;
    display: flex;
    justify-content: center;
    text-align: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}

.transition-overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  opacity: 0;
  background-color: #000;
  transition: opacity 1.25s linear;
  pointer-events: none;
}

.transition-overlay.darken {
  opacity: 1;
}

$overlay-color: transparent;
$overlay-padding: 10px;
@mixin overlay-position($top: null, $right: null, $bottom: null, $left: null) {
  position: fixed;
  display: flex;
  align-items: center;
  padding: $overlay-padding;
  z-index: 1000;
  background: $overlay-color;
  color: #444967;
  top: $top;
  right: $right;
  bottom: $bottom;
  left: $left;
}

.overlay-top-left {
  @include overlay-position(5px, null, null, 0);
}
.overlay-top-right {
  @include overlay-position(0, 0, null, null);
}

button {
  margin: 0 10px;
}

.mascot {
  position: fixed;
  bottom: 20px;
  right: 1%;
  z-index: 1050;
  opacity: 1;
}

.navigation {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
}

.navigationButtons {
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background: var(--s40-color-primary);
  opacity: 0.7;
  padding: 15px;

  img {
    width: 20px;
    height: 20px;
    object-fit: fill;
    display: block;
  }
}

.modal-button {
  padding: 15px 20px 15px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 10px;
  background: var(--s40-color-primary);
  color: var(--vt-c-white);
  border: none;
  font-size: 14px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--s40-color-contrast);
  padding: 20px;
  border-radius: 5px;
  position: relative;
  width: 450px;
  text-align: center;
}
</style>

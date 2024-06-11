<template>
  <main>
    <!-- Main game content displayed through router-view -->
    <div class="game-content">
      <RouterView />
    </div>

    <!-- Overlay content positioned at corners over the game content -->
    <div class="overlay-top-left">
      <div class="navigation">
        <button @click="goBack" class="goBackButton">
          <img src="@/assets/icon_arrows (1).png" />
          <!-- for demonstration only, later with icon -->
        </button>
        <h2>Game</h2>
        <button @click="goToNextStage" class="goNextButton">
          <img src="@/assets/icon_arrows (1).png" />
          <!-- for demonstration only, later with icon -->
        </button>
      </div>
      <div class="overlay-top-right">
        <button @click="goBackToHome" class="closeButton">
          <img src="@/assets/CloseButtonNew.png" />
          <!-- for demonstration only, later with icon -->
        </button>
      </div>
    </div>
    <div class="mascot">
      <mascot-item />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MascotItem from '@/components/MascotItem.vue'
import { useStageNavigator } from '@/composables/useNavigation'

const router = useRouter()

const { goToNextStage } = useStageNavigator()

function goBack() {
  router.back()
}

function goBackToHome() {
  router.push(`/`)
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
  right: 5%;
  z-index: 1050;
  opacity: 1;
}

.navigation {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
}

.goBackButton {
  cursor: pointer;
  padding: 5px;
  background: #95a2f3;
  border: none;
  border-radius: 15px;

  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    display: block;
    transform: rotate(180deg);
  }
}

.goNextButton {
  cursor: pointer;
  padding: 5px;
  background: #95a2f3;
  border: none;
  border-radius: 15px;

  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    display: block;
  }
}

.closeButton {
  cursor: pointer;
  border: none;
  padding: 0;
  background: none;

  img {
    width: 48px;
    height: 48px;
    border-radius: 15px;
    object-fit: cover;
    display: block;
  }
}
</style>

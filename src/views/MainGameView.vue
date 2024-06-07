<template>
  <main>
    <!-- Main game content displayed through router-view -->
    <div class="game-content">
      <RouterView />
    </div>

    <!-- Overlay content positioned at corners over the game content -->
    <div class="overlay-top-left">
      <button @click="goBackToHome" class="closeButton">
        <img src="@/assets/CloseButton.png" />
      </button>
    </div>
    <div class="overlay-top-right">
      <!--for demonstration only-->
      <button @click="toggleMascot">Maskottchen</button>
      <button @click="toggleSpeechBubble">Sprechblase</button>
    </div>
    <div class="mascot">
      <mascot-item />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMascotStore } from '@/stores/useMascotStore'
import MascotItem from '@/components/MascotItem.vue'

const router = useRouter()
const mascot = useMascotStore()

function goBackToHome() {
  router.push(`/`)
}

//for demonstration only
function toggleMascot() {
  if (mascot.showMascot) {
    mascot.hideMascotItem()
  } else {
    mascot.showMascotItem()
  }
}
//for demonstration only
function toggleSpeechBubble() {
  if (mascot.speechBubbleShown) {
    mascot.hideSpeechBubble()
  } else {
    mascot.showSpeechBubble()
  }
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

$overlay-color: rgba(0, 0, 0, 0.8);
$overlay-color-left: transparent;
$overlay-padding: 10px;
@mixin overlay-position($top: null, $right: null, $bottom: null, $left: null, $color: null) {
  position: fixed;
  display: flex;
  align-items: center;
  padding: $overlay-padding;
  z-index: 1000;
  background: $color;
  color: white;
  top: $top;
  right: $right;
  bottom: $bottom;
  left: $left;
}

.overlay-top-left {
  @include overlay-position(5px, null, null, 0, $overlay-color-left);
}
.overlay-top-right {
  @include overlay-position(0, 0, null, null, $overlay-color);
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

.closeButton {
  cursor: pointer;
  border: none;
  padding: 0;
  background: none;

  img {
    width: 45px;
    height: 45px;
    border-radius: 5px;
    object-fit: cover;
    display: block;
  }
}
</style>

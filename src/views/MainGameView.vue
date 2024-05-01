<template>
  <main>
    <!-- Mascot -->
    <transition name="slide-up">
      <div v-if="popup.show" class="mascot">{{ popup.message }}</div>
    </transition>

    <!-- Main game content displayed through router-view -->
    <div class="game-content">
      <RouterView />
    </div>

    <!-- Overlay content positioned at corners over the game content -->
    <div class="overlay-top-left">
      <button @click="goBack">Zurück</button>
    </div>
    <div class="overlay-top-right">
      <button @click="showMascot('Hi! Ich bin das Maskottchen!')">Maskottchen öffnen</button>
    </div>
    <div class="overlay-bottom-left">
      <button>Overlay button 3</button>
    </div>
    <div class="overlay-bottom-right">
      <button>Overlay button 4</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMascotStore } from '@/stores/useMascotStore'

const router = useRouter()
const popup = useMascotStore()

function goBack() {
  router.back()
}

function showMascot(message: string) {
  popup.showMessage(message)
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
$overlay-padding: 10px;
@mixin overlay-position($top: null, $right: null, $bottom: null, $left: null) {
  position: fixed;
  display: flex;
  align-items: center;
  padding: $overlay-padding;
  z-index: 1000;
  background: $overlay-color;
  color: white;
  top: $top;
  right: $right;
  bottom: $bottom;
  left: $left;
}

.overlay-top-left {
  @include overlay-position(0, null, null, 0);
}
.overlay-top-right {
  @include overlay-position(0, 0, null, null);
}
.overlay-bottom-left {
  @include overlay-position(null, null, 0, 0);
}
.overlay-bottom-right {
  @include overlay-position(null, 0, 0, null);
}

button {
  margin: 0 10px;
}

.mascot {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  z-index: 1050;
  opacity: 1;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, 100%);
}
</style>

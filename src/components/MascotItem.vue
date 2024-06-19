<template>
  <div
    @click="mascot.readMessageAgain"
    :class="quizAppearance ? 'mascot-container-quiz' : 'mascot-container-default'"
  >
    <transition name="appear">
      <div
        v-if="mascot.speechBubbleShown"
        :class="quizAppearance ? 'speech-bubble-quiz' : 'speech-bubble-default'"
      >
        <p>{{ mascot.currentMessageString }}</p>
      </div>
    </transition>
    <img src="../assets/mascot/Lisa.svg" alt="Lisa" />
  </div>
</template>

<script setup lang="ts">
import { useMascotStore } from '@/stores/useMascotStore'
const mascot = useMascotStore()

defineProps<{
  quizAppearance: Boolean
}>()
</script>

<style scoped lang="scss">
@mixin mascot-container($flex-direction, $align-items) {
  display: flex;
  flex-direction: $flex-direction;
  align-items: $align-items;
  -webkit-tap-highlight-color: transparent;

  img {
    width: 200px;
  }
}
@mixin speech-bubble($max-width, $margin-right) {
  position: relative;
  max-width: $max-width;
  padding: 20px;
  margin-bottom: 20px;
  margin-right: $margin-right;
  background: var(--s40-color-primary);
  border: 3px solid #3a3e56;
  border-radius: 30px 30px 3px 30px;

  p {
    //TODO: use design system
    color: white;
    -webkit-user-select: none;
    user-select: none;
    font-size: 24px;
    line-height: 1.3;
  }
}

.mascot-container-default {
  @include mascot-container(column, flex-end);
}

.mascot-container-quiz {
  @include mascot-container(row, flex-start);
  justify-content: flex-end;
  width: 900px;
}

.speech-bubble-default {
  @include speech-bubble(340px, 50px);
}

.speech-bubble-quiz {
  @include speech-bubble(700px, 20px);
}

.appear-enter-active {
  animation: bounce-in 0.5s;
}
.appear-leave-active {
  transition: all 0.5s ease;
}
.appear-leave-to {
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>

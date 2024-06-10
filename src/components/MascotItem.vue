<template>
  <div v-if="mascot.showMascot" @click="mascot.readMessageAgain" class="mascot-container">
    <transition name="appear">
      <!--TODO: add transition-->
      <div v-if="mascot.speechBubbleShown" class="speech-bubble">
        <p>{{ mascot.messageString }}</p>
      </div>
    </transition>
    <img src="../assets/mascot/Max_happy.svg" alt="Max_happy" />
  </div>
</template>

<script setup lang="ts">
import { useMascotStore } from '@/stores/useMascotStore'
const mascot = useMascotStore()
</script>

<style scoped lang="scss">
.mascot-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  -webkit-tap-highlight-color: transparent;
  img {
    min-width: 150px;
  }
}

.mascot {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  img {
    width: 40px;
  }
}

.mascot-image {
  width: 75px;
  height: 150px;
  background-color: white;
  border: 2px solid black;
  border-radius: 50px;
}

.speech-bubble {
  position: relative;
  max-width: 300px;
  padding: 20px;
  margin-bottom: 20px;
  color: black;
  background-color: #e1efc8;
  border: 2px solid #324e00;
  border-radius: 10px;

  p {
    //TODO: use design system
    -webkit-user-select: none;
    user-select: none;
    font-size: 25px;
  }

  &:after {
    border: 1em solid transparent;
    border-top-color: #e1efc8;
    content: '';
    margin-left: -1em;
    position: absolute;
    top: 100%;
    left: 87%;
    width: 0;
    height: 0;
  }
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

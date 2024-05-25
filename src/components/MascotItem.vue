<template>
  <div v-if="mascot.showMascot" @click="mascot.readMessageAgain" class="mascot-container">
    <transition>
      <!--TODO: add transition-->
      <div v-if="mascot.speechBubbleShown" class="speech-bubble">
        <p>{{ mascot.message.content }}</p>
      </div>
    </transition>
    <img v-if="!mascot.speechBubbleShown" src="../assets/icon_audio.svg" alt="Audio" />
    <div class="mascot"></div>
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

  img {
    align-self: center;
    width: 40px;
  }
}

.mascot {
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
    //TODO: use desgin system
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
</style>

<template>
  <div v-if="mascot.showMascot" @click="readMessage" class="mascot-container">
    <transition>
      <!--TODO: add transition-->
      <div v-if="mascot.messageShown" class="speech-bubble">
        <p>{{ mascot.message.content }}</p>
      </div>
    </transition>
    <img v-if="mascot.messageShown" src="../assets/icon_audio.svg" alt="Audio" />
    <div class="mascot"></div>
  </div>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMascotStore } from '@/stores/useMascotStore'

const mascot = useMascotStore()
const { messageShown, message } = storeToRefs(mascot)

const speech = new SpeechSynthesisUtterance()
speech.lang = 'de'
speech.rate = 0.7
speech.pitch = 1.3

//read the message aloud when a message is shown or the message changes
//TODO: replace with mascot.$subscribe
watch([messageShown, message], readMessage)

function readMessage() {
  if (mascot.messageShown && mascot.message) {
    window.speechSynthesis.cancel()
    speech.text = mascot.message.content
    window.speechSynthesis.speak(speech)
  }
}
</script>
<style scoped lang="scss">
.mascot-container {
  padding: 10px;
}

.mascot {
  width: 50px;
  height: 100px;
  background-color: white;
  border: 2px solid black;
  border-radius: 50px;
}

.speech-bubble {
  max-width: 300px;
  padding: 20px 10px 0px;
  color: black;
  background-color: #e1efc8;
  border: 2px solid #324e00;
  border-radius: 10px;

  &:after {
    //TODO: implement speech bubble correctly
    border: 1em solid transparent;
    border-top-color: #ddd;
    content: '';
    margin-left: -1em;
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 0;
  }
}
</style>

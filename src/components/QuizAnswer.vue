<template>
  <div
    class="answer-card"
    :class="{
      correct: wasClicked && answer.isCorrect,
      incorrect: wasClicked && !answer.isCorrect
    }"
    @click="selectAnswer"
  >
    <img :src="answer.image" :alt="answer.text" class="answer-image" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Answer } from '@/config/quizConfig'

const props = defineProps<{
  answer: Answer
}>()

const emit = defineEmits(['answer-selected'])
const wasClicked = ref(false)

const selectAnswer = () => {
  if (!wasClicked.value) {
    wasClicked.value = true
    emit('answer-selected', props.answer.isCorrect)
  } else {
    wasClicked.value = false
  }
}

watch(
  () => props.answer,
  () => {
    wasClicked.value = false
  },
  { immediate: true }
)
</script>

<style scoped>
.answer-card {
  margin-top: 70px;
  background-color: gainsboro;
  border-radius: 60px;
  padding: 40px;
  cursor: pointer;
}

.answer-card.correct {
  background-color: #b0dc64;
}

.answer-card.incorrect {
  background-color: #ffa4a4;
}

.answer-image {
  width: 180px;
  height: 180px;
  object-fit: contain;
}
</style>

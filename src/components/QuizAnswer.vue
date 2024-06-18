<template>
  <div
    class="answer-card"
    :class="{
      correct: wasClicked && answer.isCorrect,
      incorrect: (wasClicked && !answer.isCorrect) || (!answer.isCorrect && correctAnswerSelected)
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
  correctAnswerSelected: boolean
}>()

const emit = defineEmits(['answer-selected'])
const wasClicked = ref(false)

const selectAnswer = () => {
  if (!wasClicked.value) {
    wasClicked.value = true
    emit('answer-selected', props.answer.isCorrect, props.answer.isIncorrect)
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
  margin-top: 40px;
  background-color: var(--vt-c-white);
  border-radius: 60px;
  padding: 50px;
  cursor: pointer;
  border: 3px solid #60668F;
}

.answer-card.correct {
  background-color: #b0dc64;
}

.answer-card.incorrect {
  background-color: #ffa4a4;
}

.answer-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
}
</style>

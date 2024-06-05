<template>
  <div
    class="answer-card"
    :class="{
      correct: (wasClicked && answer.isCorrect) /*|| (answer.isCorrect && correctAnswerSelected)*/,
      incorrect: (wasClicked && !answer.isCorrect) || (!answer.isCorrect && correctAnswerSelected)
    }"
    @click="selectAnswer"
  >
    <img :src="answer.image" :alt="answer.text" class="answer-image" />
    <h3>{{ answer.text }}</h3>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
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
  margin-top: 50px;
  background-color: gainsboro;
  border-radius: 20px;
  padding: 30px;
  cursor: pointer;
  transition: transform 0.2s;
}

.answer-card:hover {
  transform: scale(1.05);
}

.answer-card.correct {
  background-color: lightgreen;
}

.answer-card.incorrect {
  background-color: lightcoral;
}

.answer-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
}
</style>

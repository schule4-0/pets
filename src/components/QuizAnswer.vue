<template>
  <div class="answer-card" 
       :class="{ correct: isCorrect, incorrect: isIncorrect }"
       @click="selectAnswer">
    <img :src="answer.image" :alt="answer.text" class="answer-image" />
    <h3>{{ answer.text }}</h3>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Answer } from '@/config/quizConfig';

const props = defineProps<{
  answer: Answer;
  isCorrect: boolean;
  isIncorrect: boolean;
}>();

const emit = defineEmits(['answer-selected']);

const selectAnswer = () => {
  if (!props.isCorrect && !props.isIncorrect) {
    emit('answer-selected', props.answer.text);
  }
};
</script>

<style scoped>
.answer-card {
  margin-top: 30px;
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
  cursor: not-allowed;
}

.answer-card.incorrect {
  background-color: lightcoral;
  cursor: not-allowed;
}

.answer-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
}
</style>
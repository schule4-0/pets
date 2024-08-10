<template>
  <div
    class="answer-card"
    :class="{
      'answer-card--correct': wasClicked && answer.isCorrect,
      'answer-card--incorrect': wasClicked && !answer.isCorrect,
      'answer-card--other-incorrect': !wasClicked && correctAnswerSelected && !answer.isCorrect
    }"
    @click="selectAnswer"
  >
    <figure class="answer-figure">
      <img :src="answer.image" :alt="answer.text" class="answer-image" />
    </figure>
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
  if (!wasClicked.value && !props.correctAnswerSelected) {
    wasClicked.value = true
    emit('answer-selected', props.answer)
  }
}

// Reset `wasClicked` whenever the answer prop changes
watch(
  () => props.answer,
  () => {
    wasClicked.value = false
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.answer-card {
  margin-top: 2.5rem;
  background-color: var(--vt-c-white);
  border-radius: 3.75rem;
  padding: 3.125rem;
  cursor: pointer;
  border: 3px solid #60668f;

  &--correct {
    background-color: #b0dc64;
  }

  &--incorrect,
  &--other-incorrect {
    background-color: #ffa4a4;
  }
}

.answer-figure {
  margin: 0;
  padding: 0;
}

.answer-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
}
</style>

<template>
  <div class="question">
    <h1>{{ question }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { Quiz } from '@/config/quizConfig'

const props = defineProps<{
  question: Quiz['question']
}>()
</script>

<style scoped>
.question {
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 50px;
  text-align: center;
  background-color: var(--s40-color-primary);
  border-radius: 30px 30px 30px 0px;
  padding: 15px;
  color: var(--s40-color-contrast);
  width: 900px;
}
</style>

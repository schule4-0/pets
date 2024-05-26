<template>
  <div class="question">
    <h1>{{ question }}</h1>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Quiz } from '@/config/quizConfig'

const props = defineProps<{
  question: Quiz["question"];
}>();
</script>

<style scoped>
.question {
  font-size: 20px;
  margin-bottom: 40px;
  margin-top: 20px;
  text-align: center;
  background-color: lightgreen;
  border-radius: 20px;
  padding: 10px;
}
</style>
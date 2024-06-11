<template>
  <div class="question">
    <h1>{{ question }}</h1>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
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
  background-color: #646bee;
  border-radius: 20px 20px 3px 20px;
  padding: 15px;
  color: #f2f5f8;
}
</style>

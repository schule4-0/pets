<template>
  <div class="question">
    <img src="@/assets/icon_audio.svg" alt="Audio" />
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
  font-size: 20px;
  margin-bottom: 30px;
  margin-top: 30px;
  text-align: center;
  background-color: lightgreen;
  border-radius: 20px;
  padding: 15px;
}

img {
  float: right;
}
</style>

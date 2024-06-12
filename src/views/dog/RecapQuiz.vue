<template>
  <div class="question-section">
    <div class="progress-bar">
      <button
        v-for="(answered, index) in progress"
        :key="index"
        :class="{ answered: answered }"
        class="progress-buttons"
      >
        <img src="@/assets/icons/icon_check.svg" />
      </button>
    </div>

    <QuestionComponent :question="currentQuestion.question" />

    <div class="answers-container">
      <AnswerComponent
        v-for="(answer, index) in currentQuestion.answers"
        :key="index"
        :answer="answer"
        :correctAnswerSelected="correctAnswerSelected"
        @answer-selected="handleAnswerSelected"
      />
    </div>

    <!-- <button @click="nextQuestion" :class="{ 'next-button': true, visible: isAnswerSelected }">
      <img src="@/assets/icon_arrow.png" />
    </button> -->
  </div>

  <div class="modal">
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>
          Toll gemacht! Du hast alle Fragen richtig beantwortet. Du kennst Rocky wirklich gut!
        </h2>
        <button @click="finishQuiz" class="finish-button">Beenden</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import QuestionComponent from '@/components/QuizQuestion.vue'
import AnswerComponent from '@/components/QuizAnswer.vue'
import { useMascotStore } from '@/stores/useMascotStore'
import quizData from '@/config/quizConfig'
import { useRouter } from 'vue-router'
import type { StringResourceKey } from '@/config/mascotMessages'

const currentQuestionIndex = ref(0)
const isAnswerSelected = ref(false)
const correctAnswerSelected = ref(false)

const mascot = useMascotStore()

const router = useRouter()
const showModal = ref(false)

const currentQuestion = computed(() => {
  return quizData[currentQuestionIndex.value]
})

const handleAnswerSelected = (isCorrect: boolean) => {
  if (isCorrect) {
    isAnswerSelected.value = true
    correctAnswerSelected.value = true
    mascot.showMessage('STAGEQUIZ_CORRECT')
  } else {
    const currentAnswerNumber = currentQuestionIndex.value + 1
    const currentAnswerMessage = `STAGEQUIZ_INCORRECT${currentAnswerNumber}` as StringResourceKey
    mascot.showMessage(currentAnswerMessage)
  }
}

const nextQuestion = () => {
  isAnswerSelected.value = false
  correctAnswerSelected.value = false

  if (currentQuestionIndex.value < quizData.length - 1) {
    currentQuestionIndex.value++
    mascot.hideMascotItem()
  } else {
    showModal.value = true
  }
}

const finishQuiz = () => {
  router.push(`/`)
}

const progress = computed(() => {
  const progressArray = []
  for (let i = 0; i < quizData.length; i++) {
    if (i <= currentQuestionIndex.value) {
      progressArray[i] = true
    } else {
      progressArray[i] = false
    }
  }
  return progressArray
})
</script>

<style scoped>
.question-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 70%;
  margin-right: 300px;

  img {
    width: 5%;
    margin-left: 98%;
    fill: var(--color-text);
  }
}

.answers-container {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.next-button {
  margin-top: 10px;
  align-self: flex-end;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: end;
  visibility: hidden;

  img {
    width: 20px;
    height: auto;
    object-fit: contain;
  }
}

.next-button.visible {
  visibility: visible;
}

.progress-bar {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.progress-buttons {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: var(--s40-color-secondary);
  border: none;
}

.progress-buttons.answered {
  background-color: var(--s40-color-primary);
  display: flex;
  justify-content: end;

  img {
    width: 18px;
    height: 28px;
    object-fit: contain;
  }
}

.finish-button {
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--vt-c-white);
  padding: 20px;
  border-radius: 5px;
  position: relative;
  width: 500px;
}
</style>

<template>
  <div class="question-section">
    <div class="progress-bar">
      <button
        v-for="(answered, index) in progress"
        :key="index"
        :class="{ answered: answered }"
        class="progress-buttons"
      ></button>
    </div>

    <QuestionComponent :question="currentQuestion.question" />

    <div class="answers-container">
      <AnswerComponent
        v-for="(answer, index) in currentQuestion.answers"
        :key="index"
        :answer="answer"
        :showCorrect="showCorrect[index]"
        :showIncorrect="showIncorrect[index]"
        @answer-selected="handleAnswerSelected(answer.text, index)"
      />
    </div>
  </div>

  <button @click="nextQuestion" :class="{ 'next-button': true, visible: isAnswerSelected }">
    <img src="@/assets/icon_arrow.png" />
  </button>

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
import mascotMessages from '@/config/mascotMessages'
import { useMascotStore } from '@/stores/useMascotStore'
import quizData from '@/config/quizConfig'
import { useRouter } from 'vue-router'

const currentQuestionIndex = ref(0)
const selectedAnswer = ref<string | null>(null)
const isAnswerSelected = ref(false)

const showCorrect = ref<boolean[]>(
  new Array(quizData[currentQuestionIndex.value].answers.length).fill(false)
)
const showIncorrect = ref<boolean[]>(
  new Array(quizData[currentQuestionIndex.value].answers.length).fill(false)
)

const mascot = useMascotStore()
const mascotMessage = mascotMessages.dog.quiz

const router = useRouter()
const showModal = ref(false)

const currentQuestion = computed(() => {
  return quizData[currentQuestionIndex.value]
})

const handleAnswerSelected = (selectedAnswerText: string, index: number) => {
  selectedAnswer.value = selectedAnswerText

  if (
    selectedAnswer.value === currentQuestion.value.correctAnswer &&
    selectedAnswer.value === selectedAnswerText
  ) {
    showCorrect.value[index] = true
    showIncorrect.value.fill(true)
    showIncorrect.value[index] = false

    isAnswerSelected.value = true
    mascot.showMascotItem()
    mascot.setMessage(mascotMessage.correct)
    mascot.showMessage()
  } else {
    showIncorrect.value[index] = true
    const currentAnswerNumber = currentQuestionIndex.value + 1
    const currentAnswerMessage = `inCorrect${currentAnswerNumber}`
    mascot.hideMascotItem()
    setTimeout(() => {
      mascot.showMascotItem()
      mascot.setMessage(mascotMessage[currentAnswerMessage])
      mascot.showMessage()
    }, 100)
  }
}

const nextQuestion = () => {
  isAnswerSelected.value = false
  selectedAnswer.value = null

  showCorrect.value.fill(false)
  showIncorrect.value.fill(false)

  if (currentQuestionIndex.value < quizData.length - 1) {
    currentQuestionIndex.value++
    mascot.hideMessage()
    mascot.hideMascotItem()
  } else {
    showModal.value = true
  }
}

const finishQuiz = () => {
  router.push(`/pets/dog/stages/1`)
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
  margin-right: 150px;

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
  margin-top: 30px;
  margin-bottom: 10px;
  margin-left: 150px;
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
  background-color: gainsboro;
}

.progress-buttons.answered {
  background-color: green;
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
  background: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  width: 500px;
}
</style>

<template>
  <div class="quiz-container">
    <div class="question-section">
      <img src="../../assets/icon_audio.svg" alt="Audio">
      <QuestionComponent :question="currentQuestion.question" />

      <div class="progress-bar">
        <button
        v-for="(answered, index) in progress"
        :key="index"
        :class="{ 'answered': answered }"
        class="progress-buttons"
      ></button>
      </div>

      <div class="answers-container">
        <AnswerComponent
          v-for="(answer, index) in currentQuestion.answers"
          :key="index"
          :answer="answer"
          :isCorrect= "isCorrect[index]"
          :isIncorrect="isIncorrect[index]"
          @answer-selected="handleAnswerSelected(answer.text, index)"
        />
      </div>
    </div>

    <div class="next-button-container">
        <button v-if="isAnswerSelected" @click="nextQuestion" class="next-button">
          <img src="../../assets/icon_arrow.png">
        </button>
    </div>

    <FeedbackQuizToast :show="showToast" :message="toastMessage" />

    <div class="modal">
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Toll gemacht! Du hast alle Fragen richtig beantwortet. Du kennst Rocky wirklich gut!</h2>
          <button @click="finishQuiz" class="finish-button">Beenden</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import QuestionComponent from '@/components/QuizQuestion.vue';
import AnswerComponent from '@/components/QuizAnswer.vue';
import FeedbackQuizToast from '@/components/FeedbackQuizToast.vue';
import quizData from '@/config/quizConfig';
import { useRouter } from 'vue-router';

const currentQuestionIndex = ref(0);
const selectedAnswer = ref<string | null>(null);
const isAnswerSelected = ref(false);

const isCorrect = ref<boolean[]>(new Array(quizData[currentQuestionIndex.value].answers.length).fill(false));
const isIncorrect = ref<boolean[]>(new Array(quizData[currentQuestionIndex.value].answers.length).fill(false));

const showToast = ref(false);
const toastMessage = ref('');

const router = useRouter();
const showModal = ref(false);

const currentQuestion = computed(() => {
  return quizData[currentQuestionIndex.value];
});

const handleAnswerSelected = (selectedAnswerText: string, index: number) => {
  showToast.value = true;
  selectedAnswer.value = selectedAnswerText;

  if(selectedAnswer.value === currentQuestion.value.correctAnswer && selectedAnswer.value === selectedAnswerText) {
    isCorrect.value[index] = true;
    isIncorrect.value.fill(true);
    isIncorrect.value[index] = false;
    
    isAnswerSelected.value = true;
    toastMessage.value = 'Gut gemacht! Drücke auf den Pfeil.';
  } else {
    isIncorrect.value[index] = true;
    toastMessage.value = 'Schade, das ist leider nicht richtig. Versuch es doch noch einmal.';
  }
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const nextQuestion = () => {
  isAnswerSelected.value = false;
  selectedAnswer.value = null;
  isCorrect.value.fill(false);
  isIncorrect.value.fill(false);

  if (currentQuestionIndex.value < quizData.length - 1) {
    currentQuestionIndex.value++;
  } else {
    showModal.value = true;
  }
};

const finishQuiz = () => {
  router.push(`/pets/dog/stages/1`);
};

const progress = computed(() => {
  const progressArray = [];
  for (let i = 0; i < quizData.length; i++) {
    if (i <= currentQuestionIndex.value) {
      progressArray[i] = true;
    } else {
      progressArray[i] = false;
    }
  }
  return progressArray;
});

</script>

<style scoped>
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 75%;
  background-color:antiquewhite;

  img {
      width: 5%;
      margin-left: 98%;
      fill: var(--color-text);
  }
}

.question-section {
  width: 80%;
}

.answers-container {
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap;
  gap: 10px; */
}

.next-button-container {
  margin-top: 30px;
  align-self: flex-end; 
}

.next-button {
  padding: 10px; 
  margin-right: 40px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;  
  justify-content: end; 

  img {
  width: 20px; 
  height: auto; 
  object-fit: contain; 
  }
}

.progress-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
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
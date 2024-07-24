<template>
  <div class="question-section">
    <div v-if="hasQuizIntroductionFinished" class="progress-bar">
      <button
        v-for="(answered, index) in progress"
        :key="index"
        :class="{ answered: answered }"
        class="progress-buttons"
      >
        <img src="@/assets/icons/icon_check.svg" />
      </button>
    </div>

    <MascotItem :quiz-appearance="true" />

    <div v-if="hasQuizIntroductionFinished" class="answers-container">
      <AnswerComponent
        v-for="(answer, index) in currentQuestion.answers"
        :key="index"
        :answer="answer"
        :correctAnswerSelected="correctAnswerSelected"
        @answer-selected="handleAnswerSelected"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MascotItem from '@/components/MascotItem.vue'
import AnswerComponent from '@/components/QuizAnswer.vue'
import { useMascotStore } from '@/stores/useMascotStore'
import quizData from '@/config/quizConfig'
import { onMounted } from 'vue'
import type { StringResourceKey } from '@/config/mascotMessages'
import { useStageNavigator } from '@/composables/useNavigation'
import { useAudioManager } from '@/stores/useAudioManager'

const { goToNextStage } = useStageNavigator()

const currentQuestionIndex = ref(0)
const isAnswerSelected = ref(false)
const correctAnswerSelected = ref(false)

const audioManager = useAudioManager()
const mascot = useMascotStore()

const hasQuizIntroductionFinished = ref(false)

const currentQuestion = computed(() => {
  return quizData[currentQuestionIndex.value]
})

onMounted(() => {
  mascot.showMessage('STAGE5_INTRODUCTION', {
    showMascot: false,
    onFinished: () => {
      hasQuizIntroductionFinished.value = true
      mascot.showMessage('STAGE5_QUESTION1', {
        showMascot: false
      })
    }
  })
})

const handleAnswerSelected = (isCorrect: boolean, isIncorrect: number) => {
  if (isCorrect) {
    isAnswerSelected.value = true
    correctAnswerSelected.value = true

    const currentCorrectAnswerNumber = currentQuestionIndex.value + 1
    const currentCorrectAnswerMessage =
      `STAGE5_CORRECT${currentCorrectAnswerNumber}` as StringResourceKey

    audioManager.playSound('CORRECT_BLING_SOUND')

    mascot.showMessage(currentCorrectAnswerMessage, {
      showMascot: false,
      onFinished: nextQuestion
    })
  } else {
    const currentWrongAnswerNumber = currentQuestionIndex.value + 1
    const currentWrongAnswerMessage =
      `STAGE5_INCORRECT${currentWrongAnswerNumber}_${isIncorrect}` as StringResourceKey
    audioManager.playSound('DOG_HOWLING')

    mascot.showMessage(currentWrongAnswerMessage, {
      showMascot: false,
      onFinished: () => {
        const currentQuestionNumber = currentQuestionIndex.value + 1
        const currentQuestionMessage =
          `STAGE5_QUESTION${currentQuestionNumber}` as StringResourceKey
        mascot.showMessage(currentQuestionMessage, {
          showMascot: false
        })
      }
    })
  }
}

const nextQuestion = () => {
  isAnswerSelected.value = false
  correctAnswerSelected.value = false

  if (currentQuestionIndex.value < quizData.length - 1) {
    currentQuestionIndex.value++
    const currentQuestionNumber = currentQuestionIndex.value + 1
    const currentQuestionMessage = `STAGE5_QUESTION${currentQuestionNumber}` as StringResourceKey
    mascot.showMessage(currentQuestionMessage, {
      showMascot: false
    })
  } else {
    hasQuizIntroductionFinished.value = false
    mascot.showMessage('STAGE5_FINISH', {
      showMascot: false,
      onFinished: goToNextStage
    })
  }
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

.progress-bar {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 70px;
}

.progress-buttons {
  width: 33px;
  height: 33px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: var(--s40-color-secondary);
  border: 2px solid #60668f;
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

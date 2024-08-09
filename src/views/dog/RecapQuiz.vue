<template>
  <section class="quiz-section">
    <div v-if="hasQuizIntroductionFinished" class="progress-bar">
      <div
        v-for="(question, index) in quizData"
        :key="index"
        class="progress-item"
        :class="{
          'progress-item--active': index <= currentQuestionIndex,
          'progress-item--answered': isCorrectAnswerSelected && index <= currentQuestionIndex
        }"
      >
        <img
          v-if="
            (isCorrectAnswerSelected && index == currentQuestionIndex) ||
            index < currentQuestionIndex
          "
          src="@/assets/icons/icon_check.svg"
          alt="Answered"
        />
      </div>
    </div>

    <MascotItem :quiz-appearance="true" />

    <div v-if="hasQuizIntroductionFinished" class="answers-container">
      <AnswerComponent
        v-for="(answer, index) in currentQuestion.answers"
        :key="index"
        :answer="answer"
        :correctAnswerSelected="isCorrectAnswerSelected"
        @answer-selected="handleAnswerSelected"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MascotItem from '@/components/MascotItem.vue'
import AnswerComponent from '@/components/QuizAnswer.vue'
import { useMascotStore } from '@/stores/useMascotStore'
import quizData, { type Answer } from '@/config/quizConfig'
import { useStageNavigator } from '@/composables/useNavigation'
import { useAudioManager } from '@/stores/useAudioManager'
import type { SoundIdentifier } from '@/config/soundEffectMappings'

// Store and Composables
const mascot = useMascotStore()
const audioManager = useAudioManager()
const { goToNextStage } = useStageNavigator()

// Reactive state
const currentQuestionIndex = ref(0)
const isCorrectAnswerSelected = ref(false)
const hasQuizIntroductionFinished = ref(false)

// Computed properties
const currentQuestion = computed(() => quizData[currentQuestionIndex.value])

// Lifecycle methods
onMounted(() => {
  mascot.showMessage('STAGE5_INTRODUCTION', {
    showMascot: false,
    onFinished: startQuiz
  })
})

// Methods
const startQuiz = () => {
  hasQuizIntroductionFinished.value = true
  showQuestionMessage()
}

const handleAnswerSelected = (answer: Answer) => {
  isCorrectAnswerSelected.value = answer.isCorrect

  const sound: SoundIdentifier = answer.isCorrect ? 'CORRECT_BLING_SOUND' : 'DOG_HOWLING'
  audioManager.playSound(sound)

  mascot.showMessage(answer.mascotMessageKey, {
    showMascot: false,
    onFinished: answer.isCorrect ? nextQuestion : showQuestionMessage
  })
}

const showQuestionMessage = () => {
  mascot.showMessage(currentQuestion.value.mascotMessageKey, { showMascot: false })
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < quizData.length - 1) {
    currentQuestionIndex.value++
    resetQuestionState()
    showQuestionMessage()
  } else {
    finishQuiz()
  }
}

const resetQuestionState = () => {
  isCorrectAnswerSelected.value = false
}

const finishQuiz = () => {
  hasQuizIntroductionFinished.value = false
  mascot.showMessage('STAGE5_FINISH', {
    showMascot: false,
    onFinished: goToNextStage
  })
}
</script>

<style scoped lang="scss">
.quiz-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.answers-container {
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;
}

.progress-bar {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0 4rem;

  .progress-item {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin: 0.25rem;
    background-color: var(--s40-color-secondary);
    border: 2px solid #60668f;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &--active {
      background-color: var(--s40-color-primary);
    }

    &--answered {
      background-color: var(--s40-color-primary);
    }

    img {
      width: 1.25rem;
      display: block;
    }
  }
}
</style>

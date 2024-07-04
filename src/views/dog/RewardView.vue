<template>
  <div class="reward-game-container">
    <div v-if="wasBoneGiven" class="solution">
      <h5>Das braucht Rocky:</h5>
      <div class="solution-images">
        <img v-for="image in solutionImages" :key="image" :src="image" class="solution-image" />
      </div>
    </div>

    <button v-if="wasBoneGiven && showNextButton" class="nextBtn" @click="handleNextButtonClick">
      Weiter
    </button>

    <DraggableItem
      class="boneImg"
      :id="1"
      type="accepted"
      :image="boneImg"
      :initialX="44"
      :initialY="10"
      width="120px"
      v-if="!wasBoneGiven"
      :collected="false"
    />
  </div>
  <div class="drop-area-container">
    <DropArea
      @droppedInArea="handleDropInArea"
      class="dogImg"
      :image="cartoondogImg"
      width="20vw"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DraggableItem from '@/components/DraggableItem.vue'
import DropArea from '@/components/DropArea.vue'
import { useStageNavigator } from '@/composables/useNavigation'
import boneImg from '@/assets/equipment/bone_border.png'
import cartoondogImg from '@/assets/rocky/Rocky_happy.svg'
import { useMascotStore } from '@/stores/useMascotStore'
import { useSound } from '@/composables/sound'
import barkSound from '@/assets/audio/soundEffects/bark.mp3'
import { useRewardStore } from '@/stores/useRewardStore'

const emit = defineEmits(['finish'])
const { goToNextStage } = useStageNavigator()
const mascot = useMascotStore()
const sound = useSound()
const wasBoneGiven = ref(false)
const showNextButton = ref(false)

const rewardStore = useRewardStore()

const solutionImages = ref<string[]>([])

onMounted(() => {
  mascot.showMessage('REWARD_EXPLANATION')
  solutionImages.value = rewardStore.solutionImages
})

const handleDropInArea = (item: {
  id: number
  isWithin: boolean
  type: 'accepted' | 'rejected'
}) => {
  if (item.type === 'accepted') {
    wasBoneGiven.value = true
    sound.play(barkSound)
    //mascot.showMessage('REWARD_ROCKY_HAPPY', () => displayNextButton()) // TODO: missing voice recording!
    displayNextButton()
  }
}

const displayNextButton = () => {
  showNextButton.value = true
}

const handleNextButtonClick = () => {
  if (wasBoneGiven.value) {
    emit('finish')
    goToNextStage()
  }
}
</script>

<style scoped>
.reward-game-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--s40-color-contrast) url('@/assets/RewardSysBackground.png') no-repeat center
    center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: var(--s40-color-primary);
}

.solution {
  margin-top: 75px;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  font-size: 3em;
  height: 30%;
  display: flex;
  flex-direction: column;
  width: 85%;
  align-self: center;
  border-radius: 20px;
  justify-content: space-around;
  padding-bottom: 20px;
  z-index: 201;
  font-weight: 400;
}

.solution-images {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
  height: 40%;
}

.solution-image {
  width: 90px;
}

.dogImg {
  position: relative;
  top: 0;
}

.boneImg {
  position: absolute;
  z-index: 5;
  animation: wiggle 1s ease;
}

.boneImg img {
  width: 3vh !important;
}

.nextBtn {
  height: 70px;
  width: 50%;
  align-self: center;
  background-color: var(--s40-color-primary);
  border-radius: 10px;
  font-size: 2.5em;
  font-family: Poppins;
  border: none;
  color: white;
  z-index: 201;
  margin-bottom: 20px;
}

.drop-area-container {
  position: absolute;
  bottom: 25vh;
  left: 40vw;
  justify-content: center;
  align-items: center;
  height: 20vw;
  width: 20vw;
}

@keyframes wiggle {
  0% {
    transform: rotate(-5deg) scale(1);
  }
  50% {
    transform: rotate(5deg) scale(1.5);
  }
  100% {
    transform: rotate(-5deg) scale(1);
  }
}
</style>

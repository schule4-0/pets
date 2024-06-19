<template>
  <div class="reward-game-container">
    <div v-if="wasBoneGiven" class="solution">
      <p>Das braucht Rocky:</p>
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
      :initialY="5"
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

const emit = defineEmits(['finish'])
const { goToNextStage } = useStageNavigator()
const mascot = useMascotStore()
const sound = useSound()
const wasBoneGiven = ref(false)
const showNextButton = ref(false)

defineProps<{ solutionImages: string[] }>()

onMounted(() => {
  //too much?
  //sound.play(winSound)
  //setTimeout(() => {
  mascot.showMessage('REWARD_EXPLANATION')
  //}, 3000)
})

const handleDropInArea = (item: {
  id: number
  isWithin: boolean
  type: 'accepted' | 'rejected'
}) => {
  if (item.type === 'accepted') {
    wasBoneGiven.value = true
    sound.play(barkSound)
    //TODO: activate when audio is ready
    //mascot.showMessage('REWARD_ROCKY_HAPPY', () => displayNextButton())
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

<style>
.reward-game-container {
  position: absolute;
  background-color: var(--s40-color-contrast);
  box-shadow: rgba(0, 0, 0, 0.171) 10px 10px 10px;
  width: calc(100% - 2 * 20px);
  height: 90%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--s40-color-primary);
  margin-top: 40px;
  z-index: 200;
}

.solution {
  margin-top: 30px;
  background-color: rgb(224, 224, 224);
  font-size: 3em;
  height: 30%;
  display: flex;
  flex-direction: column;
  width: 95%;
  align-self: center;
  border-radius: 20px;
  justify-content: space-around;
  padding-bottom: 20px;
  z-index: 201;
}

.solution-images {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 3vh;
  gap: 40px;
  flex-wrap: wrap;
  height: 40%;
  z-index: 201;
}

.solution-image {
  height: 80px;
}

.dogImg {
  position: relative;
  top: 0;
  z-index: 201;
}

.boneImg {
  position: absolute;
  z-index: 100;
  animation: wiggle 1s ease;

  img {
    width: 15vh !important;
  }
}

.nextBtn {
  height: 70px;
  width: 50%;
  align-self: center;
  justify-self: center;
  background-color: var(--s40-color-primary);
  border-radius: 10px;
  font-size: 2.5em;
  font-family: Jua;
  border: none;
  margin-bottom: 20px;
  color: white;
  z-index: 201;
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

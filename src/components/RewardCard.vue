<template>
  <div class="reward-game-container">

    <slot name="solution" v-if="wasBoneGiven" :solutionImages="solutionImages"></slot>

      <DraggableItem class="boneImg"
        :id="1"
        type="accepted"
        :image="boneImg"
        :initialX="50"
        :initialY="5"
        v-if="!wasBoneGiven"
      />

      <button v-if="wasBoneGiven" class="nextBtn" @click="goToNextStage">Nächstes Minigame</button>
  </div>
  
  <DropArea @droppedInArea="handleDropInArea" class="dogImg" :image="cartoondogImg" width="20vw"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DraggableItem from '@/components/DraggableItem.vue'
import DropArea from '@/components/DropArea.vue'
import { onMounted } from 'vue'
import { useStageNavigator } from '@/composables/useNavigation'
import boneImg from '@/assets/bone.png'
import cartoondogImg from '@/assets/cartoondog1.jpg'
import mascotMessages from '@/config/mascotMessages'
import { useMascotStore } from '@/stores/useMascotStore'

const { goToNextStage } = useStageNavigator()

const mascot = useMascotStore()
const wasBoneGiven = ref(false)
const props = defineProps<{ solutionImages: string[] }>()

//TODO: dynamic loading of correct messages according to route
const instructionMessage = mascotMessages.dog.stage3
const generalMessages = mascotMessages.general.expressions

onMounted(() => {
    mascot.showMascotItem()
    mascot.setMessage(instructionMessage.message1)
    mascot.showMessage()
})

const handleDropInArea = (item: {
    id: number
    isWithin: boolean
    type: 'accepted' | 'rejected'
}) => {
    if (item.type === 'accepted') {
        wasBoneGiven.value = true
        mascot.setMessage(generalMessages.rockyHappy)
    }
}

</script>

<style>
.reward-game-container {
  position: absolute;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.171) 10px 10px 10px;
  width: 95%;
  height: 90%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
}

.solution-images {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  height: 40%;
}

.solution-image {
  height: 100%;
}

.dogImg {
  position: relative;
  top: 15%;
  z-index: 1;
}

.boneImg {
  position: absolute;
  z-index: 100;
}

.nextBtn {
  height: 70px;
  width: 50%;
  align-self: center;
}
</style>

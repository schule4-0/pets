<template>
  <div class="reward-game-container">

    <slot name="solution" v-if="wasBoneGiven" :solutionImages="solutionImages"></slot>

    <div class="bottom-container">
      <DropArea @droppedInArea="handleDropInArea" :image="cartoondogImg" width="20vw"/>

      <DraggableItem class="boneImg"
        :id="1"
        type="accepted"
        :image="boneImg"
        :initialX="50"
        :initialY="80"
        v-if="!wasBoneGiven"
      />

      <button v-if="wasBoneGiven" @click="goToNextStage">Nächstes Minigame</button>
    </div>
  </div>
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
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 95%;
  height: 90%;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.171) 10px 10px 10px;
}

.bottom-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
}

.boneImg {
  width: 10%;
  height: auto;
}

.solution {
  text-align: center;
  font-size: 3rem;
  background-color: rgb(224, 224, 224);
  border-radius: 20px;
  margin: 40px;
  padding: 20px;
}

.solution-images {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 20%;
  flex-wrap: wrap;
}

.solution-image {
  margin: 20px;
  width: 50px;
  height: 100%;
}

</style>

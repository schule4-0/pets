<template>
  <div class="reward-game-container">
    <!-- Content of the RewardGame component goes here -->
    <DropArea @droppedInArea="handleDropInArea" :image="cartoondogImg" width="20vw"/>

    <DraggableItem
      :id="1"
      type="accepted"
      :image="boneImg"
      :initialX="50"
      :initialY="80"
      v-if="!wasBoneGiven"
    />

    <button @click="goToNextStage">Nächstes Minigame</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DraggableItem, { type DraggableItemType } from '@/components/DraggableItem.vue'
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

<style scoped>
.reward-game-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 90%;
  height: 90%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.171) 10px 10px 10px;
}

/* Additional styling for elements inside the RewardGame content */
.reward-game-container button {
  margin-top: 20px;
}
</style>

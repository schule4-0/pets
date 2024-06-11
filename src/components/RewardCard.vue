<template>
  <div class="reward-game-container">
    <slot name="solution" v-if="wasBoneGiven" :solutionImages="solutionImages"></slot>

    <DraggableItem
      class="boneImg"
      :id="1"
      type="accepted"
      :image="boneImg"
      :initialX="50"
      :initialY="5"
      :collected="false"
      v-if="!wasBoneGiven"
    />
  </div>

  <DropArea @droppedInArea="handleDropInArea" class="dogImg" :image="cartoondogImg" width="20vw" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DraggableItem from '@/components/DraggableItem.vue'
import DropArea from '@/components/DropArea.vue'
import { onMounted } from 'vue'
import boneImg from '@/assets/equipment/bone.png'
import cartoondogImg from '@/assets/cartoondog1.jpg'
import { useMascotStore } from '@/stores/useMascotStore'

const mascot = useMascotStore()
const wasBoneGiven = ref(false)
defineProps<{ solutionImages: string[] }>()

onMounted(() => {
  mascot.showMessage('REWARD_GIVE_BONE')
})

const handleDropInArea = (item: {
  id: number
  isWithin: boolean
  type: 'accepted' | 'rejected'
}) => {
  if (item.type === 'accepted') {
    wasBoneGiven.value = true
    mascot.showMessage('REWARD_ROCKY_HAPPY')
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

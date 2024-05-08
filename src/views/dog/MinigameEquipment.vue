<template>
  <div>
    <example-component>
      <template #game-title>
        <h2>Equipment</h2>
      </template>
      <template #game-description>
        <div>Wir befinden uns im Miniagem "Equipment".</div>
      </template>
    </example-component>

    <button @click="goToNextStage">Nächstes Minigame</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ExampleComponent from '@/components/ExampleComponent.vue'
import { useStageNavigator } from '@/composables/useNavigation'
const { goToNextStage } = useStageNavigator()
import mascotMessages from '@/config/mascotMessages'
import { useMascotStore } from '@/stores/useMascotStore'

const mascot = useMascotStore()
//TODO: dynamic loading of correct messages according to route
const equipmentMessages = mascotMessages.dog.stage1

onMounted(() => {
  mascot.setMessage(equipmentMessages.message2)
})
</script>

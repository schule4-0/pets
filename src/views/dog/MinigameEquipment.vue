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
import ExampleComponent from '@/components/ExampleComponent.vue'
import { useStageNavigator } from '@/composables/useNavigation'
const { goToNextStage } = useStageNavigator()
</script>

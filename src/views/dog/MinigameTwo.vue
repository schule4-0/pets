<template>
  <div>
    <example-component>
      <template #game-title>
        <h2>Zwei</h2>
      </template>
      <template #game-description>
        <div>Wir befinden uns im zweiten Minigame.</div>
      </template>
    </example-component>
  </div>
</template>

<script setup lang="ts">
import ExampleComponent from '@/components/ExampleComponent.vue'
</script>

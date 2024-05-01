<template>
  <div class="home-container">
    <h1>Schule 4.0 - Haustiere</h1>
    <p>Wähle ein Haustier um das Spiel zu starten:</p>
    <select v-model="selectedPet" @change="goToPetStages">
      <option disabled value="">Wähle ein Haustier</option>
      <option value="dog">Hund</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const selectedPet = ref('')
const router = useRouter()

const goToPetStages = () => {
  if (selectedPet.value) {
    router.push(`/pets/${selectedPet.value}/stages/1`)
  }
}
</script>

<style scoped>
.home-container {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

select {
  margin-top: 10px;
  padding: 8px;
  font-size: 16px;
  width: 200px;
}
</style>

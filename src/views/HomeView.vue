<template>
  <div class="home-container">
    <div class="header-box">
      <h1>Mein erstes Haustier</h1>
      <img src="../assets/icon_audio.svg" alt="Audio">
    </div>

    <p>Bereit, in die Welt der Haustiere einzutauchen?
    <br>Tippe auf das Tier, das dich am meisten interessiert!</p>
  </div>

  <div class="pet-cards">
      <PetCardComponent v-for="(pet, index) in pets" :key="index" :pet="pet" @pet-selected="handlePetSelected" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import PetCardComponent from '@/components/PetCardComponent.vue';
import pets from '@/config/petsConfig';

const router = useRouter()

const handlePetSelected = (selectedPet: any) => {
  if (selectedPet.name) {
    router.push(`/pets/${selectedPet.englishName}/stages/1`) // only works for dog
  }
};

</script>

<style scoped>
.home-container {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: 30px;
  line-height: 100%;

  h1 {
    font-size: 3rm;
    padding: 25px 0 20px 0;
  }

  p {
    padding: 20px 0;
  }

  .header-box {
    display: flex;

    img {
      width: 5%;
      margin: 15px 0 15px 40px;
    }
  }
}

.pet-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

</style>

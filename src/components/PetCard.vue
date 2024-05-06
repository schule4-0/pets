<template>
  <div class="pet-selection" @click="selectPet">
    <div class="pet-card">
      <img :src="pet.image" :alt="pet.name">
      <div class="pet-card-name">
        <p>{{ pet.name }}</p>
        <img src="../assets/icon_audio.svg" alt="Audio">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pet } from '@/config/petsConfig';
import { useRouter } from 'vue-router';

const props = defineProps<{
  pet: Pet;
}>();

const router = useRouter();

const selectPet = () => {
  handlePetSelected(props.pet);
};

const handlePetSelected = (selectedPet: Pet) => {
  if (selectedPet.name) {
    router.push(`/pets/${selectedPet.englishName}/stages/1`);
  }
};
</script>


<style scoped>
.pet-selection {
  width: 31%;
  margin-top: 20px;

  .pet-card {
    background-color: rgb(231, 231, 231);
    box-shadow: 3px 3px 15px rgb(186, 186, 186);
    border-radius: 5px;

    img {
      width: 100%;
      height: 200px;
      border-radius: 5px;
      object-fit: cover;
      background-position: center;
    }
  }

  .pet-card-name {
    font-size: 30px;
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    img {
      width: 10%;
      height: auto;
      margin: 10px 15px 15px 15px;
    }
  }
}

</style>

<template>
  <div class="pet-selection">
    <div class="pet-card" @click="selectPet">
      <img :src="pet.image" :alt="pet.name">
      <div class="pet-card-name">
        <p>{{ pet.name }}</p>
        <img src="../assets/icon_audio.svg" alt="Audio">
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  pet: { name: string; image: string };
}>();

const emit = defineEmits(['pet-selected']);

const selectPet = () => {
  emit('pet-selected', props.pet); 
};
</script>


<style scoped>
.pet-selection {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;

  .pet-card {
    background-color: rgb(231, 231, 231);
    box-shadow: 3px 3px 15px rgb(186, 186, 186);
    width: 80%;
    border-radius: 5px;
    margin: 20px;
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

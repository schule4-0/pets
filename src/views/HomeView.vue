<template>
  <div class="home-container">
    
    <div class="header-box">
      <h1>Mein erstes Haustier</h1>
      <img src="../assets/icon_audio.svg" alt="Audio">
    </div>

    <p>Bereit, in die Welt der Haustiere einzutauchen?
    <br>Tippe auf das Tier, das dich am meisten interessiert!</p>
  </div>

  <div class="pet-selection">
    <div class="pet-tile" @click="selectPet('dog')">
      <img src="../assets/dog.png" alt="Hund">
      <div class="pet-tile-name">
        <p>Der Hund</p>
        <img src="../assets/icon_audio.svg" alt="Audio">
      </div>
    </div>
    <div class="pet-tile" @click="selectPet('dog')">
      <img src="../assets/bunny.png" alt="">
      <div class="pet-tile-name">
        <p>Das Kaninchen</p>
        <img src="../assets/icon_audio.svg" alt="Audio">
      </div>
    </div>
    <div class="pet-tile" @click="selectPet('dog')">
      <img src="../assets/dog.png" alt="">
      <div class="pet-tile-name">
        <p>Die Katze</p>
        <img src="../assets/icon_audio.svg" alt="Audio">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const selectedPet = ref('')
const router = useRouter()

const selectPet = (pet: string) => {
  selectedPet.value = pet
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
  align-items: left;
  font-size: 50px;
  line-height: 100%;

  h1 {
    font-size: 80px;
    padding: 40px 0;
  }

  p {
    padding: 20px 0;
  }

  .header-box {
    display: flex;

    img {
      width: 75px;
      margin: 15px 0 15px 40px;
    }
  }
}

.pet-selection {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;

  .pet-tile {
    background-color: rgb(231, 231, 231);
    box-shadow: 3px 3px 15px rgb(186, 186, 186);
    width: 31%;
    position: relative;

    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      background-position: center;
    }
  }

  .pet-tile-name {
    font-size: 40px;
    padding: 15px;
    display: flex;
    justify-content: space-between;

    p {
      padding-top: 10px;
    }

    img {
      max-width: 10%;
      height: auto;
      margin: 15px;
    }
  }
}

</style>

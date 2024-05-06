<template>
  <div class="home-view">
    <div class="home-container">
      <div class="header-box">
        <h1>Mein erstes Haustier</h1>
        <img src="../assets/icon_audio.svg" alt="Audio">
      </div>

      <p>Bereit, in die Welt der Haustiere einzutauchen?
      <br>Tippe auf das Tier, das dich am meisten interessiert!</p>
    </div>

    <div class="pet-cards">
        <PetCardComponent v-for="(pet, index) in pets" :key="index" :pet="pet"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import PetCardComponent from '@/components/PetCard.vue';
import pets from '@/config/petsConfig';
</script>

<style scoped>
.home-view {
  padding: 40px;
}

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
    align-items: center;

    img {
      width: 5%;
      margin: 15px 0 15px 40px;
      fill: var(--color-text);
    }
  }
}

.pet-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>

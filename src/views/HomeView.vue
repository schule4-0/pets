<template>
  <div class="home-view">
    <div class="home-container">
      <h1>Mein erstes Haustier</h1>

      <p>
        Bereit, in die Welt der Haustiere einzutauchen? <br />Wähle ein Tier aus, über das du mehr
        erfahren möchtest.
      </p>
    </div>

    <div class="pet-cards">
      <PetCardComponent
        v-for="(pet, index) in pets"
        :key="index"
        :pet="pet"
        :is-locked="!pet.isImplemented"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PetCardComponent from '@/components/PetCard.vue'
import pets from '@/config/petsConfig'
</script>

<style scoped>
.home-view {
  margin: auto;
  max-width: 1080px;
  padding: 40px;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 24px;
  line-height: 1.2;

  h1 {
    font-size: 3rem;
    margin-top: 24px;
    color: var(--s40-color-primary);
  }

  p {
    margin-top: 16px;
    color: #333333;
    font-size: 1.2rem;
  }

  .header-box {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      margin-left: 15px;
    }
  }
}

.pet-cards {
  margin-top: 48px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}
</style>

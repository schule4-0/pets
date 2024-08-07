<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
  // Navigate to the "home" route on page refresh
  if (router.currentRoute.value.name !== 'home') {
    router.replace({ name: 'home' })
  }
})
</script>

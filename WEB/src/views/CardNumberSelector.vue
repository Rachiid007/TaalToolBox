<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import CardNumber from '@/components/CardNumber.vue'
  import TheHeader from '@/components/TheHeaderFlashcards.vue'
</script>

<template>
  <!-- <MainHeader /> -->
  <div class="page">
    <TheHeader />
    <CardNumber />
  </div>
</template>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 25px;
  }
</style>

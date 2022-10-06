<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import Greetings from '@/components/Greetings.vue'
</script>

<template>
  <div class="page">
    <MainHeader />
    <Greetings />
  </div>
</template>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
  }
</style>

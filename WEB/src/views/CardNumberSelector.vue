<script setup lang="ts">
  import CardNumber from '@/components/CardNumber.vue'
  import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
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

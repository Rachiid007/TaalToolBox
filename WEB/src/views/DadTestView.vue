<script setup lang="ts">
  import Dragndrop from '@/components/testDragNDrop/dragndrop.vue'
  import TheHeaderDnd from '@/components/TheHeaderDragNDrop.vue'
</script>

<template>
  <div class="page">
    <TheHeaderDnd />
    <Dragndrop />
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

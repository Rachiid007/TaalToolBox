<script setup lang="ts">
  import LevelSelector from '@/components/testDragNDrop/levelSelector.vue'
</script>

<template>
  <div class="page">
    <LevelSelector />
  </div>
</template>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
    overflow-x: hidden;
  }
</style>

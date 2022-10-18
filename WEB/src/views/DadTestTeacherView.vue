<script setup lang="ts">
  import DragndropTeacher from '@/components/testDragNDrop/dragndropteacher.vue'
  import TheHeaderDnd from '@/components/TheHeaderDragNDrop.vue'
</script>
<template>
  <div class="page">
    <TheHeaderDnd />
    <DragndropTeacher />
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

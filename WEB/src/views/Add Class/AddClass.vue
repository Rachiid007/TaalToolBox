<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import AddClass from '@/components/Add classes/AddClass.vue'
</script>
<template>
  <div class="page">
    <Suspense>
      <MainHeader />
    </Suspense>
    <Suspense>
      <AddClass />
    </Suspense>
  </div>
</template>
<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
  }
</style>

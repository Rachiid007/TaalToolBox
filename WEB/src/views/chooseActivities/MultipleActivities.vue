<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import ChooseActivities from '@/components/activity/ChooseActivities.vue'
</script>
<template>
  <div class="page">
    <MainHeader />
    <Suspense>
      <ChooseActivities />
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

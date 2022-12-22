<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import ChooseActivities from '@/components/activity/ChooseActivities.vue'
  import { useUserStore } from '@/stores/user'
  const userStore = useUserStore()
</script>
<template>
  <div class="page">
    <Suspense>
      <MainHeader />
    </Suspense>
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

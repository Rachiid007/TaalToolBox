<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import InfoLevel from '@/components/Info level/InfoLevel.vue'
  import {useMapStore} from '@/stores/map';

  const mapStore = useMapStore()
</script>

<template>
  <div class="page">
    <!-- <MainHeader /> -->
    <Suspense>
      <InfoLevel />
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

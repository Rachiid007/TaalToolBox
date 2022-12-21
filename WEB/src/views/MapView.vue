<script setup lang="ts">
  import Map from '@/components/Map.vue'
  import useMapStore from '@/stores/map'
  import MainHeader from '@/components/headers/MainHeader.vue'
  const mapStore = useMapStore()
</script>

<template>
  <main>
    <!-- <template #data> HELLO </template> -->
    <Suspense>
      <MainHeader />
    </Suspense>
    <Suspense>
      <Map />
    </Suspense>
  </main>
</template>
<style scoped>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* overflow: hidden; */
  }
  #map {
    height: 1000px;
    width: 100%;
    max-width: 1600px;
    margin: 0;
    padding: 0;
  }
  .ol-overlaycontainer-stopevent {
    display: none;
  }
</style>

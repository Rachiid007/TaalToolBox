<script lang="ts">
  import Map from '../components/Map.vue'

  export default {
    name: 'App',
    components: {
      Map
    }
  }
</script>

<template>
  <main>
    <!-- <template #data> HELLO </template> -->
    <Map />
  </main>
</template>
<style scoped>

<style scoped>

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #map {
    height: 1000px;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .ol-overlaycontainer-stopevent {
    display: none;
  }
</style>

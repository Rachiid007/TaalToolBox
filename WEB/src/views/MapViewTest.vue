<script lang="ts">
  import TestMap from '@/components/map/TestMap.vue'

  export default {
    name: 'App',
    components: {
      TestMap
    }
  }
</script>
<template>
  <main>
    <TestMap />
  </main>
</template>
<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

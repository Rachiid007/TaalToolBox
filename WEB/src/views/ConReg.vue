<script lang="ts">
import SinLog from '../components/SinLog.vue'
import MainHeader from '../components/MainHeader.vue'

export default {
  name: 'login',
  components: {
    MainHeader,
    SinLog
    // Container
  }
}
</script>

<template>
  <div class="page">
    <MainHeader />
    <SinLog />
  </div>
</template>

<style>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

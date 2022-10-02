<script lang="ts">
import CardNumber from '../components/CardNumber.vue'
import Header from '../components/Header.vue'

export default {
  name: 'test',
  components: {
    CardNumber,
    Header
  }
}
</script>

<template>
  <div class="page">
    <Header />
    <CardNumber />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 25px;
}
</style>

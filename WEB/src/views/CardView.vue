<script lang="ts">
import Card from '../components/Card.vue'

export default {
  name: 'Card',
  components: {
    Card
    // Container
  }
}
</script>

<template>
  <!-- <Card /> -->
  <div class="container">
    <div class="contain">inside the card</div>
  </div>
</template>

<style>
.container {
  border: solid red 1px;
  margin: auto 0;
  max-width: 1600px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container {
  border: solid blue 1px;
  width: 100%;
  
}
</style>

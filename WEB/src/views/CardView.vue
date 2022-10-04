<script lang="ts">
  import Card from '../components/card/Card.vue'

  export default {
    name: 'Card',
    components: {
      'card-body': Card
      // Container
    }
  }
</script>

<template>
  <div class="big-container">
    <div class="container">
      <card-body></card-body>
    </div>
  </div>
</template>

<style scoped>
  .big-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid red 1px;
    margin: 0 auto;
    width: 100%;
    height: 100vh;
  }
  .container {
    border: solid blue 1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    max-width: 1600px;
    height: 100vh;
  }

  @media (max-width: 768px) {
    .container {
      padding: 10px;
    }
  }
</style>

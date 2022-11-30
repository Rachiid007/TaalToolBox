<script setup lang="ts">
  import StartGame from '@/components/StartGame.vue'
  import TheHeader from '@/components/TheHeader.vue'
  import Greetings from '@/components/Greetings.vue'
</script>
<template>
  <div class="big-container">
    <TheHeader>
      <div class="title">
        <p class="activity_name">Start</p>
        <img src="@/assets/logo/lightning.svg" />
        <p class="activity_name">Game</p>
      </div>
    </TheHeader>
    <div id="page">
      <StartGame />
    </div>
  </div>
</template>

<style scoped>
  .big-container {
    /* border: solid red 1px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    margin: 0 auto;
    width: 100%;
    height: 100vh;
  }
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .activity_name {
    font-family: 'Courier New', monospace;
    font-family: microsan_A;
    color: #026b30;
    font-weight: 500;
    font-size: 2em;
  }
  img {
    height: auto;
    width: 10%;
  }
  #page {
    /* border: solid red 1px; */
    width: 100%;
    height: 100%;
    display : flex ;
  }
</style>

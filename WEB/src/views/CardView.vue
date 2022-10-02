<script setup lang="ts">
import Card from '@/components/card/Card.vue'
import RemainingCard from '@/components/card/RemainingCard.vue'
</script>
<!-- Est ce qu'il yaura ou pas un header -->
<template>
  <div class="big-container">
    <div class="container">
      <div class="rest-card">
        <RemainingCard />
      </div>
      <div class="play-card">
        <Card />
        <!-- <div class="answer">inside answer card</div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.big-container {
  /* border: solid red 1px; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
}
.container {
  /* border: solid blue 1px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 1600px;
  height: 100vh;
}
.rest-card {
  /* border: solid green 1px; */
}
.play-card {
  /* border: solid red 1px; */
  flex: 0.8;
  display: flex;
  justify-content: center;
}
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  .rest-card {
    /* border: solid red 1px; */
    margin: 0;
    height: auto;
  }
  .play-card {
    flex: 0.8;
  }
}
</style>

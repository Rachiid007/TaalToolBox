<script setup lang="ts">
  import Card from '@/components/card/Card.vue'
  import RemainingCard from '@/components/card/RemainingCard.vue'
  import ButtonValidation from '@/components/card/ButtonValidation.vue'
  import { useCardStore } from '@/stores/card'
  import { computed, ref } from 'vue'
  const store = useCardStore()
  const remaining = computed(() => store.remaining)
  const card = computed(() => store.getCard())
</script>
<!-- Est ce qu'il yaura ou pas un header -->
<template>
  <div class="big-container">
    <div class="container">
      <div class="rest-card">
        <RemainingCard />
      </div>
      <div class="play-card">
        <div>
          <Card v-if="store.tableCard" />
          <div><span></span></div>
        </div>
        <!-- <div class="answer">inside answer card</div> -->
        <div class="validation-button">
          <ButtonValidation />
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
  .big-container {
    /* border: solid red 1px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    height: 100vh;
  }
  .container {
    /* border: solid blue 1px; */
    display: flex;
    align-items: center;
    justify-content: space-around;
    max-width: 1600px;
    height: auto;
  }
  /* .rest-card {
    border: solid green 1px;
  } */
  .validation-button {
    /* display: none; */
  }
  .play-card {
    /* border: solid red 1px; */
    flex: 0.6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
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

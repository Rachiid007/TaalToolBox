<script setup lang="ts">
  import Card from '@/components/card/Card.vue'
  import RemainingCard from '@/components/card/RemainingCard.vue'
  import ButtonValidation from '@/components/card/ButtonValidation.vue'
  import TheHeader from '@/components/TheHeader.vue'
  import { useCardStore } from '@/stores/card'
  import { useShowStore } from '@/stores/show'
  import { computed, ref } from 'vue'
  const store = useCardStore()
  const storeShow = useShowStore()
  const showButtonValidation = computed(() => storeShow.getShowButtonValidation())

  //pour faire remonter l'état au composant parent
  const showButtonReveal = computed(() => storeShow.getShowButtonReveal())
  const showAnswer = computed(() => storeShow.getShowAnswer())
  const remaining = computed(() => store.remaining)
  const card = computed(() => store.getCard())
</script>
<template>
  <div class="big-container">
    <TheHeader>
      <div class="title">
        <p class="activity_name">Flash</p>
        <img src="@/assets/logo/lightning.svg" />
        <p class="activity_name">Cards</p>
      </div>
    </TheHeader>
    <div class="container">
      <div class="rest-card">
        <RemainingCard />
      </div>
      <div class="play-card">
        <div class="card">
          <Card />
        </div>
        <!-- <div class="answer">inside answer card</div> -->
        <div class="validation-button">
          <ButtonValidation v-show="showButtonValidation" />
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
    /* justify-content: center; */
    margin: 0 auto;
    width: 100%;
    height: 100vh;
  }
  .container {
    /* border: solid blue 1px; */
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1600px;
    height: auto;
  }
  .rest-card {
    /* border: solid green 1px; */
  }
  .validation-button {
    /* display: none; */
    margin-top: 15px;
    margin-left: 8%;
  }
  .play-card {
    /* border: solid red 1px; */
    flex: 0.7;

    /* margin: 0 auto; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .card {
    /* border: solid red 1px; */
    margin-left: 16%;
    padding: 5px;
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
</style>

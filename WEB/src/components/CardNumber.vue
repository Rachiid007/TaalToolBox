<script setup lang="ts">
  import { useCardStore } from '@/stores/card'
  const store = useCardStore()
  const setNbrOfCardsforthegame = (cardNumber: number) => {
    store.setRemaining(cardNumber)
  }
</script>

<template>
  <div class="main">
    <div class="title">Choisissez la durée de la partie:</div>
    <div class="options">
      <div class="card">
        <div class="card_number_and_name">
          <h1 class="name">Partie courte</h1>
          <p>5 cartes</p>
        </div>
        <div class="img">
          <img src="@/assets/timer1.svg" />
        </div>
        <div class="time">
          <div style="color: #5d00ff">~5mins</div>
        </div>
        <router-link
          to="/cards"
          class="play"
          @click="setNbrOfCardsforthegame(5)"
          >JOUER</router-link
        >
      </div>
      <div class="card">
        <div class="card_number_and_name">
          <h1 class="name">Partie normale</h1>
          <p>10 cartes</p>
        </div>
        <div class="img">
          <img src="@/assets/timer2.svg" />
        </div>
        <div class="time">
          <div style="color: #02a83a">~10mins</div>
        </div>
        <router-link
          to="/cards"
          class="play"
          @click="setNbrOfCardsforthegame(10)"
          >JOUER</router-link
        >
      </div>
      <div class="card">
        <div class="card_number_and_name">
          <h1 class="name">Partie longue</h1>
          <p>20 cartes</p>
        </div>
        <div class="img">
          <img src="@/assets/timer3.svg" />
        </div>
        <div class="time">
          <div style="color: #ff0000">~20mins</div>
        </div>
        <router-link
          to="/cards"
          class="play"
          @click="setNbrOfCardsforthegame(20)"
          >JOUER</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    max-width: 1600px;
    width: 100vw;
  }
  .title {
    color: #707070;
    font-size: 2em;
    margin-top: 3%;
    text-align: center;
  }
  .options {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 3%;
    gap: 8%;
  }
  .card {
    color: #707070;
    border: 3px solid #707070;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 3% 15px 3%;
    width: 20%;
    min-width: 180px;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
  .name {
    font-size: 1.8em;
    font-weight: 100;
  }
  .time {
    font-size: 1.4em;
    margin-top: 5%;
  }
  .play {
    border: 1px solid #707070;
    width: max-content;
    color: #026b30;
    border-radius: 5px;
    padding: 10px 35% 10px 35%;
    margin-top: 30%;
  }
  .img {
    padding-top: 25%;
    height: 40%;
    width: auto;
  }
  p {
    color: #026b30;
    font-weight: bolder;
    font-size: 1.4em;
    margin-top: 10px;
  }
  img {
    height: 90%;
    width: auto;
  }

  @media (max-width: 700px) {
    .options {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 3%;
      gap: 25px;
    }
    .title {
      font-size: 8vw;
      margin-top: 3%;
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px 3% 15px 3%;
      width: 80%;
      min-width: 180px;
    }
    .card_number_and_name {
      display: flex;
      width: 100%;
      flex-direction: row;
      text-align: center;
    }
    .name {
      font-size: 5vw;
      font-weight: 100;
      width: 50%;
      text-align: left;
    }
    .time {
      font-size: 1.5em;
      margin-top: 1%;
    }
    .img {
      padding-top: 5%;
      height: auto;
      width: 20%;
      display: flex;
      justify-content: center;
    }
    .play {
      padding: 10px 35% 10px 35%;
      margin-top: 5%;
    }
    img {
      height: 80%;
      width: auto;
    }
    p {
      font-size: 5vw;
      margin-top: 0px;
      width: 50%;
      text-align: right;
    }
  }
</style>

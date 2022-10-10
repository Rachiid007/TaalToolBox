<script setup lang="ts"></script>

<template>
  <div class="big-container">
    <h2 class="title">Mot ajoutés</h2>
    <div class="container">
      <div
        class="card"
        v-for="index in 12"
        :key="index"
      >
        {{ index }}
      </div>
    </div>
    <button class="btn">Créer l'activité</button>
  </div>
</template>

<style scoped>
  .title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
  }
  .big-container {
    width: 100%;
    height: auto;
  }

  .container {
    display: flex;
    justify-content: center;
    border: 1px solid black;
    flex-wrap: wrap;
    /* flex-shrink: 0; */
  }

  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 200px;
    margin: 5px;
    border: 1px solid black;
    border-radius: 10px;
    text-align: center;
  }

  .btn {
    margin: auto;
    padding: 5px;
    font-size: 18px;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
    background-color: green;
    color: #fff;
    width: 200px;
    height: 40px;
    text-align: center;
    font-weight: bold;
  }

  .btn:hover {
    background-color: black;
  }
</style>

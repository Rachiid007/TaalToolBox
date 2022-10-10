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
  .big-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    outline: 2px solid rgb(248, 39, 248);
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    background-color: #056b30;
    color: white;
    width: 100%;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    gap: 10px;
  }

  .card {
    width: 150px;
    height: 200px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
    text-align: center;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
    background-color: #056b30;
    color: #fff;
    width: max-content;
    height: 40px;
  }

  .btn:hover {
    background-color: #000;
  }
</style>

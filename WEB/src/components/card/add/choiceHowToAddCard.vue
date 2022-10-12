<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
</script>

<template>
  <h1 class="title">Ajouter une activité</h1>
  <div class="big-container">
    <div class="container excel">
      <h2 class="sub-title">Via un fichier Excel</h2>
      <img
        src="@/assets/excel.svg"
        alt="excel"
      />
      <p>Vous pouvez ajouter vos activités en les renseignant dans un fichier Excel.</p>
      <RouterLink to="/add-card/excel">
        <button class="btn">Excel</button>
      </RouterLink>
    </div>
    <div class="container forms">
      <h2 class="sub-title">Via un formulaire</h2>
      <img
        src="@/assets/forms.svg"
        alt="google forms"
      />
      <p>Vous pouvez ajouter vos activités en les renseignant dans un formulaire.</p>
      <RouterLink to="/add-card/form">
        <button class="btn">Formulaire</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
  .big-container {
    width: 100vw;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }

  .container {
    width: 40%;
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    border: 1px solid black;
  }

  .container img {
    width: 200px;
    margin: 20px auto;
  }

  .container p {
    margin: 30px auto;
    width: 90%;
    font-size: 1.2rem;
  }

  .container .btn {
    width: 200px;
    height: 40px;
    background-color: green;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }

  .container .btn:hover {
    background-color: #000;
    color: #fff;
  }

  .title {
    font-size: 2rem;
    margin: 30px auto;
    text-align: center;
    position: relative;
  }

  .title::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 330px;
    height: 3px;
    background-color: green;
  }

  .sub-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .big-container {
      flex-direction: column;
    }

    .container {
      width: 80%;
      margin: 20px auto;
    }
  }

  @media (max-width: 480px) {
    .container {
      width: 90%;
    }
  }
</style>

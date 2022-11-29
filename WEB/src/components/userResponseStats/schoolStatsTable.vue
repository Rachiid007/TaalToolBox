<template>
    <div class="main">
    <div class="info">
      <p id="firstIn">Suivi des Apprentissages par Ecole</p>
    </div>
  </div>
  <br>
  <br>
  <div class=search>
    <span>Recherche: </span>
    <input type="text" class:input v-model="searchValue">
    </div>
    <br>
    <EasyDataTable
       buttons-pagination
      :headers="headers"
      :items="items"
      :search-field="searchField"
        :search-value="searchValue"
      alternating
      border-cell
      show-index
    />
    <br>
    <br>
  </template>
  
  <script lang="ts" setup>
  import type { Header, Item } from "vue3-easy-data-table";
  import { ref } from "vue";
  
  const searchField = ref();
  const searchValue = ref();

  const headers: Header[] = [
    { text: "ECOLE", value: "ecole", sortable: true},
    { text: "TOTALE MAITRISE", value: "maitrise", sortable: true},
    { text: "TOTALE EN ACQUIS", value: "acquis"},
    { text: "TOTALE EN APPRENTISSAGE", value: "apprentissage"},
    { text: "NOMBRE ETUDIANT JOUE", value: "nbrEtudiant", width: 200, sortable: true},
  ];
  
  const items: Item[] = [
    { ecole: "GSW", maitrise: 25, acquis:3, nbrEtudiant: 24, apprentissage: 10},
    { ecole: "LAL", maitrise: 10, acquis: 2, nbrEtudiant: 21, apprentissage: 21},
    { ecole: "BKN", maitrise: 39, acquis: 1, nbrEtudiant: 15, apprentissage: 6},
    { ecole: "MIL", maitrise: 5, acquis: 3, nbrEtudiant: 13, apprentissage: 2},
  ];
  </script>

  
<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    max-width: 1600px;
    width: 100vw;
    gap: 0px;
    /* margin-top: 0px; */
    font-family: NotoSans-Regular;
    color: #707070;
    z-index: 1;
  }
  input {
    padding: 5px;
    border: 1px solid #000;
    border-radius: 5px;
    width: 90%;
  }
  .greetings {
    margin-top: 40px;
    margin-bottom: 30px;
    font-size: 2.8em;
    color: #026b30;
    text-align: center;
  }
  .info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5%;
  }
  .search {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: left;
    gap: 5%;
  }
  .line {
    width: 1px;
    background-color: #707070;
    height: 400px;
  }
  .left_info {
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-self: flex-start;
    margin-top: 35px;
    text-align: center;
  }
  .imageLeft {
    width: 100%;
    height: auto;
    align-self: center;
  }
  .right_info {
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-self: flex-start;
    margin-top: 30px;
    text-align: center;
  }
  .imageRight {
    width: 55%;
    height: auto;
    align-self: center;
  }
  /* .image {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  } */
  p {
    font-size: 1.1em;
  }
  h1 {
    font-size: 1.5em;
  }
  #firstIn {
    opacity: 0;
    transform: translateY(15%);
    animation: fadeInBottomUp 1.5s ease 0.1s forwards;
    animation-delay: 0.2s;
  }
  #secondIn {
    opacity: 0;
    transform: translateY(15%);
    animation: fadeInBottomUp 1.5s ease 0.1s forwards;
    animation-delay: 0.5s;
  }
  #thirdIn {
    opacity: 0;
    animation: fadeIn 1.5s ease 0.1s forwards;
    animation-delay: 1.5s;
  }
  #fourthInLeft {
    opacity: 0;
    transform: translateX(-15%);
    animation: fadeInLatteral 1.5s ease 0.1s forwards;
    animation-delay: 1.5s;
  }
  #fourthInRight {
    opacity: 0;
    transform: translateX(15%);
    animation: fadeInLatteral 1.5s ease 0.1s forwards;
    animation-delay: 1.5s;
  }
  @media (max-width: 600px) {
    .greetings {
      font-size: 2em;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 50px;
    }
    .line {
      height: 1px;
      background-color: #707070;
      width: 80vw;
      display: none;
    }
    .left_info {
      width: 80%;
      display: flex;
      flex-direction: column;
      gap: 25px;
      align-self: center;
      margin-top: 35px;
    }
    .imageLeft {
      height: 100%;
      width: 100%;
    }
    .right_info {
      width: 80%;
      display: flex;
      flex-direction: column;
      gap: 30px;
      align-self: center;
    }
    .imageRight {
      height: 100%;
      width: 70%;
    }
  }
  @keyframes fadeInBottomUp {
    100% {
      opacity: 100%;
      transform: translateY(0);
    }
  }
  @keyframes fadeIn {
    100% {
      opacity: 100%;
    }
  }
  @keyframes fadeInLatteral {
    100% {
      opacity: 100%;
      transform: translateX(0);
    }
  }
</style>

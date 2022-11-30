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
    { text: "TOTAL MAITRISE", value: "maitrise", sortable: true},
    { text: "TOTAL EN ACQUIS", value: "acquis"},
    { text: "TOTAL EN APPRENTISSAGE", value: "apprentissage"},
    { text: "NOMBRE DE PARTICIPANTS", value: "nbrEtudiant", width: 200, sortable: true},
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
</style>

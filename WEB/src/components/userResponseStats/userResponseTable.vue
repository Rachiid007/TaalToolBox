<template>
    <div class="main">
    <div class="info">
      <p id="firstIn">Suivi des Apprentissages par Elève</p>
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
  </template>
  
  <script lang="ts" setup>
  import type { Header, Item } from "vue3-easy-data-table";
  import { ref } from "vue";
 
  const searchField = ref();
  const searchValue = ref();

  const headers: Header[] = [
    { text: "JOUEUR", value: "joueur",width: 200 ,sortable: true },
    { text: "CLASSE", value: "classe", sortable: true},
    { text: "TOTAL MAITRISE", value: "maitrise", sortable: true},
    { text: "TOTAL EN ACQUIS", value: "acquis"},
    { text: "TOTAL EN APPRENTISSAGE", value: "apprentissage"},
    { text: "DATE DERNIER JEUX", value: "lastPlay", width: 200, sortable: true},
  ];
  
  const items: Item[] = [
    { joueur: "Bernad C", classe: "1elec", maitrise: 25, acquis:3, lastPlay: "11/02/2022", apprentissage: 10},
    { joueur: "James A", classe: "1elec", maitrise: 10, acquis: 2, lastPlay: "12/02/2022", apprentissage: 21},
    { joueur: "Bernard D", classe: "1meca", maitrise: 39, acquis: 1, lastPlay: "15/02/2022", apprentissage: 6},
    { joueur: "Arthur T", classe: "1IT", maitrise: 5, acquis: 3, lastPlay: "17/02/2022", apprentissage: 2},
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

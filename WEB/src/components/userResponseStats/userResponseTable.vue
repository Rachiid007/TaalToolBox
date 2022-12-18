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
  <br>
  <br>
</template>

<script lang="ts"  >
import type { Header, Item } from "vue3-easy-data-table";
import { ref } from "vue";
import  statsServiceRessource  from '@/services/statsService'

const arr: Header[]=[]
export default {
name: 'EasyTable',
data: () => ({
  loaded: false,
  headers: arr,
  items:[],
  searchField:ref(),
  searchValue : ref(),
    
}),

async mounted () {
    this.searchField = ref();
       this.searchValue = ref();
       const statsS = new statsServiceRessource()
    
    const userStats = await statsS.findUsersResponseStats()
    
    const headers1: Header[] = [
      { text: "JOUEUR", value: "joueur",width: 200 ,sortable: true },
      { text: "CLASSE", value: "classe", sortable: true},
      { text: "TOTAL MAITRISE", value: "total_maitrise", sortable: true},
      { text: "TOTAL EN ACQUIS", value: "total_acquis",sortable: true},
      { text: "TOTAL EN APPRENTISSAGE", value: "total_apprentissage"},
      { text: "DATE DERNIER JEUX", value: "lastplay", width: 200, sortable: true},
    ];
  
    this.headers=headers1
    console.log( await userStats.data)
    //const items: Item[] = stats;
    this.items= await userStats.data
}}


    




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

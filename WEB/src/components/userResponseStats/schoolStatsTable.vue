<template>
  <div class="main">
  <div class="info">
    <p id="firstIn">Suivi des Apprentissages par Classe</p>
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
import { ref, onMounted, computed } from "vue";
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
    
    const classStats = await statsS.findSchoolResponseStats()
    
    

  
      const headers1: Header[] = [
        { text: "Classe", value: "name", sortable: true},
        { text: "TOTAL MAITRISE", value: "total_maitrise", sortable: true},
        { text: "TOTAL EN ACQUIS", value: "total_acquis", sortable: true},
        { text: "TOTAL EN APPRENTISSAGE", value: "total_apprentissage", sortable: true},
      ];
    this.headers=headers1

      //const items: Item[] = stats;
    this.items= await classStats.data
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

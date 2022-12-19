<script lang="ts" setup>
  import { useDadLevels } from '@/stores/dadLevels'
  import { ref } from 'vue'

  const store = useDadLevels()
  const levels = store.getData()

  const getNumberOfWords = (item: any) => {
    let count: number = 0
    for (let word in item.fields) {
      count++
    }
    return count
  }

  const handleSelection = (levelNumber: number) => {
    store.setLevel(levelNumber)
  }
</script>

<template>
  <div class="main">
    <div class="content">
      <h1 class="title">Sélectionner le niveau à jouer:</h1>
      <div class="levelsList">
        <div
          class="element"
          v-for="(items, index) in levels"
        >
          <p class="levelNumber">Niveau {{ index + 1 }}</p>
          <img
            class="levelSumm"
            :src="items.backImage"
            alt="level image"
          />
          <p class="wordNumber">{{ 'Nombre de mots: ' + getNumberOfWords(items) }}</p>
          <RouterLink
            class="loaderButton"
            @click="handleSelection(index)"
            to="/dad"
            >Charger ce niveau
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1600px;
    justify-content: center;
    align-items: center;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 35px;
    padding-top: 35px;
    width: 100%;
    align-items: center;
  }
  .title {
    margin-top: 25px;
    text-align: center;
    color: #00307e;
    font-weight: bold;
    font-size: 1.5em;
  }
  .levelsList {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    border: 2px solid #00307e;
    border-radius: 5px 5px 0 0;
    padding: 10px;
    gap: 2%;
    width: 65%;
    overflow-x: scroll;
    overflow-y: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  .levelsList::-webkit-scrollbar {
    height: 1em;
  }

  .levelsList::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  .levelsList::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  .element {
    display: flex;
    gap: 15px;
    flex-direction: column;
    border: 2px solid grey;
    border-radius: 5px;
    text-align: center;
    color: #707070;
    padding: 15px;
    min-width: 22%;
    width: 22%;
  }
  .levelNumber {
    color: #00307e;
    font-size: 1.2em;
  }
  .levelSumm {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    height: 120px;
  }
  .loaderButton {
    color: white;
    background: #00307e;
    border-radius: 5px;
    padding: 5px 10px;
  }
</style>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  // import jsonfile from '@/assets/levelData/dragndrop.json'
  import { useDadLevels } from '@/stores/dadLevels'
  import { RouterLink } from 'vue-router'

  // const store = useDadLevels()
  // const dataFromStore = store.getData()

  const background = ref()
  const wordList = ref()

  // On utilise cette ref pour stocker un boolean qui nous indique si l'utilisateur est sur un mobile ou pas
  const isNotMobile = ref(false)

  // Cette ref est utilisée pour stocker la liste de mots rangée d'une manière aléatoire
  const wordsToGen = ref([])

  // Ici on stocke le score à afficher
  const score = ref(0)
  // On stocke le nombre de bonnes réponses
  const goodFields = ref(0)
  // On stocke le nombre de mauvaises réponses
  const badFields = ref(0)
</script>

<template>
  <div class="main">
    <div class="playground">
      <div class="back">
        <img src="@/assets/images/form2mobile.png" />
      </div>
      <div class="resultCheck">
        <div class="resultcontainer">
          <div class="score">
            <p class="resultShow">Votre score est de:</p>
            <p class="result">{{ 0 }} / {{ 7 }}</p>
          </div>
          <button class="revealButton">Révéler les résultats</button>
        </div>
        <div class="answers">
          <p class="goodAnswers">Bonnes réponses: {{ '7' }}</p>
          <p class="badAnswers">Mauvaises réponses: {{ 7 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main {
    margin-top: 5px;
    max-width: 1600px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3%;
    font-family: 'NotoSans-Regular';
  }
  .playground {
    margin-top: 10px;
    display: flex;
    max-width: 100%;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    /* width: 100%; */
    flex-direction: column;
    /* outline: 1px solid red; */
    gap: 5px;
    z-index: 1;
  }
  .back {
    max-width: 100%;
    height: fit-content;
    width: 95%;
    display: flex;
    justify-content: center;
    position: relative;
    border: 2px solid #707070;
    font-size: 0.7em;
  }
  img {
    width: 100%;
    height: auto;
    max-height: 60vh;
  }
  .resultCheck {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    border: 1px solid #707070;
    /* border-radius: 5px; */
    width: 95%;
  }
  .resultcontainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    text-align: center;
    gap: 5px;
  }
  .score {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .resultShow {
    font-size: 1.1em;
    color: #00307e;
  }
  .result {
    font-size: 1.5em;
    font-weight: bold;
  }
  .revealButton {
    background: #00307e;
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
  .answers {
    display: flex;
    flex-direction: column;
  }
  .goodAnswers {
    color: green;
    text-align: center;
  }
  .badAnswers {
    color: red;
    text-align: center;
  }
</style>

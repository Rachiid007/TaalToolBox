<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  // import jsonfile from '@/assets/levelData/dragndrop.json'
  import { useDadLevels } from '@/stores/dadLevels'
  import { RouterLink } from 'vue-router'

  const store = useDadLevels()
  const dataFromStore = store.getData()

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
  const state = reactive(dataFromStore[1])

  const checkScore = () => {
    console.log('Checking score ...')
    // console.log(background.value.childNodes)
    let childList = background.value.childNodes
    let localScore = 0
    let goodAnswers = 0
    let badAnswers = 0
    // On parcour le contenu (les enfants) de la div background
    for (let child in childList) {
      // Si l'élément est une <div> avec un id (donc un champ)
      if (childList[child].id) {
        //On reset la couleur de la bordure
        childList[child].style.border = '1px solid #00307e'
        // Si la div contient à une valeur
        if (childList[child].value) {
          // On parcourt la liste qui a permit de générer les champs afin d'aller vérifier les valeurs
          for (let index in state.fields) {
            // Si l'id du champ correspond et que la valeur du select correspond également, on octroit un point
            if (state.fields[index].test == childList[child].id) {
              if (state.fields[index].rightValue == childList[child].value) {
                localScore++
                goodAnswers++
                childList[child].style.border = '2px solid green'
              } else {
                badAnswers++
                childList[child].style.border = '2px solid red'
              }
            }
          }
        }
      }
    }
    console.log('le score est de: ' + localScore)
    badFields.value = badAnswers
    goodFields.value = goodAnswers
    score.value = localScore
  }

  onMounted(() => {
    //La fonction shuffle va prendre les mots qui sont dans l'objet principal (state) et les mettres dans un ordre aléatoire
    // CE CODE VIENS D INTERNET ET DOIS ENCORE ETRE COMPRIS

    const shuffle = () => {
      let array = []
      for (let item in state.fields) {
        array.push(state.fields[item].rightValue)
      }
      let currentIndex = array.length,
        randomIndex

      // Temps qu'il y a des éléments à mélanger
      while (currentIndex != 0) {
        // On prend un index d'un élément qui reste
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // Et on le swap avec l'index actuel
        ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
      }
      // On ajoute un id pour chaque mot pour pouvoir assigner les ids des <p> par la suite
      for (let i = 0; i < array.length; i++) {
        wordsToGen.value.push({ word: array[i] })
      }
    }
    shuffle()
  })
</script>

<template>
  <div class="main">
    <div class="playground">
      <div
        class="back"
        id="back"
        ref="background"
      >
        <img
          :src="state.backImage"
          alt="image for the exercice"
        />
        <select
          :id="item.number.toString()"
          class="container"
          v-for="item in state.fields"
          :style="{ top: item.top, left: item.left, width: item.width, height: item.height }"
        >
          <option
            value=""
            selected
            disabled
            hidden
          >
            Choisissez
          </option>
          <option
            :value="choice.word"
            v-for="choice in wordsToGen"
          >
            {{ choice.word }}
          </option>
        </select>
      </div>
      <div class="resultCheck">
        <div class="resultcontainer">
          <div class="score">
            <p class="resultShow">Votre score est de:</p>
            <p class="result">{{ score }} / {{ state.fields.length }}</p>
          </div>
          <button
            class="revealButton"
            @click="checkScore"
          >
            Révéler les résultats
          </button>
        </div>
        <div class="answers">
          <p class="goodAnswers">Bonnes réponses: {{ goodFields }}</p>
          <p class="badAnswers">Mauvaises réponses: {{ badFields }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main {
    margin-top: 5px;
    max-width: 1000px;
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

  /* container correspond à un input */
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    gap: 5%;
    width: 250px;
    height: 22px;
    border: 2px solid #00307e;
    /* border-radius: 5px; */
    position: absolute;
    background-color: white;
    overflow: hidden;
    font-size: 100%;
    appearance: none;
  }

  .container:focus,
  .container:active,
  .container:focus-visible {
    border: 2px solid #0162fe;
    outline: none;
  }

  .container option {
    text-align: center;
  }
  .container option:checked {
    background-color: #00307e;
    color: white;
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

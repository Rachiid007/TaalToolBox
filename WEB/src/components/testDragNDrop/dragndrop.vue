<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import jsonfile from '@/assets/levelData/dragndrop.json'
  const background = ref()
  const wordList = ref()

  // Cette ref est utilisée pour stocker la liste de mots rangée d'une manière aléatoire
  const wordsToGen = ref([])

  // Ici on stocke le score à afficher
  const score = ref(0)
  // On stocke le nombre de bonnes réponses
  const goodFields = ref(0)
  // On stocke le nombre de mauvaises réponses
  const badFields = ref(0)
  const state = reactive(jsonfile[1])

  // fonction appellée quand on drop le mot dans la div
  const dropped = (event: any) => {
    // console.log('dropped !')
    event.preventDefault()
    // Si la div dans laquelle on a drop le mot n'est une div faite pour acceuillir un mot on remet le mot dans la liste des mots en bas de l'écran
    if (event.target.className != 'container' && event.target.className != 'wordList') {
      let data = event.dataTransfer.getData('text')
      wordList.value.appendChild(document.getElementById(data))
      return 0
    } else if (event.target.firstChild) {
      return 0
    }
    let data = event.dataTransfer.getData('text')
    event.target.appendChild(document.getElementById(data))
  }
  const draggedOver = (event: any) => {
    // console.log('draggedOver !')
    event.preventDefault()
  }
  const dragStarted = (event: any) => {
    // console.log('dragStarted !')
    event.dataTransfer.setData('text', event.target.id)
  }
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
        // Si la div contient un <p>
        if (childList[child].firstChild) {
          // On parcourt la liste qui a permit de générer les champs afin d'aller vérifier les valeurs
          for (let index in state.fields) {
            // Si le numéro du champ correspond et que la valeur du champ <p> correspond également, on octroit un point
            if (state.fields[index].test == childList[child].id) {
              if (state.fields[index].rightValue == childList[child].firstChild.textContent) {
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
        wordsToGen.value.push({ id: i, word: array[i] })
      }
    }
    shuffle()
  })
</script>

<template>
  <div class="main">
    <div
      class="playground"
      :ondrop="dropped"
      :ondragover="draggedOver"
    >
      <div
        ref="background"
        id="back"
        class="back"
      >
        <img
          :src="state.backImage"
          alt="image for the exercice"
        />
        <div
          :id="item.number.toString()"
          class="container"
          :ondrop="dropped"
          :ondragover="draggedOver"
          :style="{ top: item.top, left: item.left, width: item.width, height: item.height }"
          v-for="item in state.fields"
        ></div>
      </div>
      <div class="wordListContainer">
        <p class="wordListTitle">Mots à placer</p>
        <div
          ref="wordList"
          class="wordList"
          id="wordList"
        >
          <p
            :id="'drag' + item.id.toString()"
            draggable="true"
            :ondragstart="dragStarted"
            class="text"
            v-for="item in wordsToGen"
          >
            {{ item.word }}
          </p>
        </div>
        <div class="resultCheck">
          <div class="resultcontainer">
            <p class="resultShow">Votre score est de:</p>
            <p class="result">{{ score }} / {{ state.fields.length }}</p>
            <div>
              <p
                v-if="goodFields | badFields"
                class="goodAnswers"
              >
                Nombre de bonnes réponses: {{ goodFields }}
              </p>
              <p
                v-if="goodFields | badFields"
                class="badAnswers"
              >
                Nombre de mauvaises réponses: {{ badFields }}
              </p>
            </div>
            <button
              class="revealButton"
              @click="checkScore"
            >
              Révéler les résultats
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main {
    margin-top: 35px;
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
    margin-top: 25px;
    display: flex;
    max-width: 100%;
    width: 95%;
    height: 100%;
    justify-content: center;
    /* align-items: center; */
    /* width: 100%; */
    flex-direction: row;
    /* outline: 1px solid red; */
    gap: 45px;
    z-index: 1;
  }
  .back {
    display: flex;
    position: relative;
    /* outline: 1px solid blue; */
    border: 2px solid #707070;
    font-size: 0.7em;
    width: max-content;
    max-width: 60%;
    min-width: 60%;
  }
  img {
    width: 100%;
    height: auto;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  .wordListContainer {
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .wordListTitle {
    text-align: center;
    color: #00307e;
    font-weight: bold;
    font-size: 1.5em;
    padding-bottom: 10px;
    border-bottom: 1px solid #707070;
  }
  .wordList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2px;
    /* justify-content: center; */
    height: max-content;
    max-height: 240px;
    min-height: 50px;
    background-color: rgb(112, 112, 112, 0.08);
    border: 1px solid #707070;
    border-radius: 5px;
    padding: 15px;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5%;
    width: 250px;
    height: 22px;
    border: 1px solid #00307e;
    border-radius: 5px;
    position: absolute;
    /* top: 41%;
    left: 28%; */
    background-color: white;
    overflow: hidden;
    p {
      color: #707070;
      width: 100%;
      font-size: 100%;
      font-weight: bold;
      border: none;
      background: white;
    }
  }
  .text {
    font-family: 'NotoSans-Regular';
    text-align: center;
    border: 1px solid grey;
    border-radius: 5px;
    cursor: move;
    font-size: 1.2em;
    width: max-content;
    height: max-content;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    color: #00307e;
    background-color: white;
  }
  .resultCheck {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    margin-top: 25px;
    /* outline: 1px solid purple; */
  }
  .resultcontainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* outline: 1px solid yellow; */
    border: 1px solid #707070;
    border-radius: 5px;
    padding: 15px;
    text-align: center;
    gap: 20px;
  }
  .resultShow {
    font-size: 1.3em;
    color: #00307e;
  }
  .result {
    font-size: 1.8em;
    font-weight: bold;
  }
  .revealButton {
    background: #00307e;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }
  .goodAnswers {
    color: green;
  }
  .badAnswers {
    color: red;
  }
</style>

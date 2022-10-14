<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import jsonfile from '@/assets/levelData/dragndrop.json'
  const background = ref()
  const wordList = ref()

  // Cette ref est utilisée pour stocker la liste de mots rangée d'une manière aléatoire
  const wordsToGen = ref([])

  // Ici on stocke le score à afficher
  const score = ref(0)
  const state = reactive(
    jsonfile[0]
    //   {
    //   fields: [],

    //   backImage: '/src/assets/images/form.png'
    // }
  )

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
    for (let child in childList) {
      if (childList[child].id && childList[child].firstChild) {
        // console.log(childList[child].firstChild.textContent)
        for (let index in state.fields) {
          if (
            state.fields[index].test == childList[child].id &&
            state.fields[index].rightValue == childList[child].firstChild.textContent
          ) {
            // console.log(state.fields[index])
            // console.log(state.fields[index].rightValue, childList[child].firstChild.textContent)
            localScore++
          }
        }
      }
    }
    console.log('le score est de: ' + localScore)
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

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
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
    </div>
    <div class="resultCheck">
      <div class="resultcontainer">
        <p class="resultShow">Votre score est de:</p>
        <p class="result">{{ score }} / {{ state.fields.length }}</p>
        <button
          class="revealButton"
          @click="checkScore"
        >
          Révéler les résultats
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main {
    margin-top: 75px;
    max-width: 1600px;
    width: 100vw;
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    justify-content: center;
    gap: 3%;
  }
  .playground {
    margin-top: 25px;
    display: flex;
    max-width: 75%;
    align-items: center;
    justify-content: center;
    /* width: 100%; */
    flex-direction: column;
    /* outline: 1px solid red; */
    gap: 45px;
    z-index: 1;
  }
  .back {
    display: flex;
    position: relative;
    /* outline: 1px solid blue; */
    border: 1px solid #707070;
    font-size: 0.7em;
  }
  .wordList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    /* outline: 1px solid green; */
    max-width: 500px;
    min-height: 50px;
    background-color: rgb(112, 112, 112, 0.1);
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
    border: 2px solid green;
    border-radius: 5px;
    position: absolute;
    /* top: 41%;
    left: 28%; */
    background-color: white;
    overflow: hidden;
  }
  .logo {
    height: auto;
    width: 150px;
    cursor: move;
  }
  .text {
    font-family: 'NotoSans-Regular';
    text-align: center;
    border: 1px solid grey;
    border-radius: 5px;
    cursor: move;
    font-size: 1.2em;
    width: max-content;
    display: flex;
    align-items: flex-start;
    justify-content: center;
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
    padding: 25px;
    text-align: center;
    gap: 25px;
  }
  .resultShow {
    font-size: 1.3em;
    color: #026b30;
  }
  .result {
    font-size: 1.8em;
    font-weight: bold;
  }
  .revealButton {
    background: #026b30;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }
</style>

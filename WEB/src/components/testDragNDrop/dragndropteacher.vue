<script setup lang="ts">
  import { ref } from 'vue'
  //   const image = ref('')
  //   const file = ref(null)
  //   const changeImage = (e: any) => {
  //     image.value = URL.createObjectURL(e.target.files[0])
  //     file.value = e.target.file[0]
  //     console.log(image.value, file.value)
  //   }
  const numberField = ref(0)
  const fieldList = ref([])
  const background = ref()
  const image = ref()
  const selectedId = ref('')
  const selectedDiv = ref()

  const selectedDivTop = ref(0)
  const selectedDivLeft = ref(0)

  const selectedDivWidth = ref(0)
  const selectedDivHeight = ref(0)

  // Les valeurs de position pour les divs
  const positions = ref({
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0
  })

  const addField = () => {
    // On push un nombre dans l'array pour ajouter une div avec le v-for
    numberField.value++
    fieldList.value.push(numberField.value)
  }

  const clicked = (e: any) => {
    //Change l'indicateur de champ sélectionné

    //Si un champ était déjà sélectionné au paravant, on le remet à la couleur de bordure initiale
    if (selectedId.value) {
      document.getElementById(selectedId.value).style.border = '2px dashed #00307e'
    }
    selectedId.value = e.target.id
    let element = document.getElementById(selectedId.value)
    element.style.border = '2px dashed red'
    selectedDivWidth.value = parseInt(getComputedStyle(element).width)
    selectedDivHeight.value = parseInt(getComputedStyle(element).height)
    selectedDivTop.value = element.offsetTop
    selectedDivLeft.value = element.offsetLeft
  }

  const dragMouseDown = (e: any) => {
    //Une fois que l'on commence le drag on assigne l'id à selectedDiv pour la suite
    selectedDiv.value = document.getElementById(e.target.id)
    // ???????
    e = e || window.event
    // ???????
    e.preventDefault()
    // On prend la position du curseur au démarage du drag
    positions.value.pos3 = e.clientX
    positions.value.pos4 = e.clientY
    // Si on relache le bouton on va appeller closeDragElement ce qui va arrêter le dragAndDrop
    document.onmouseup = closeDragElement
    // Si on maintient le bouton et que l'on bouge la souris on appelle la fonction elementDrag
    document.onmousemove = elementDrag
  }

  const elementDrag = (e: any) => {
    //???????
    e = e || window.event
    //???????
    e.preventDefault()
    // On calcule la position du pointeur (curseur):
    positions.value.pos1 = positions.value.pos3 - e.clientX
    positions.value.pos2 = positions.value.pos4 - e.clientY
    positions.value.pos3 = e.clientX
    positions.value.pos4 = e.clientY

    // On va vérifier que la div ne sorte pas de l'image

    // Pour cela on doit avoir la largeur et la hauteur de l'image ainsi que la largeur et la hauteur de la div que l'on drag
    let imageHeight = parseFloat(getComputedStyle(background.value).height.slice(0, -2))
    let imageWidth = parseFloat(getComputedStyle(background.value).width.slice(0, -2))
    let currentDivHeight = parseFloat(getComputedStyle(selectedDiv.value).height.slice(0, -2))
    let currentDivWidth = parseFloat(getComputedStyle(selectedDiv.value).width.slice(0, -2))
    if (
      //Si la valeur top ou left de la div va devenir plus petit que 0 ou égal on ne bouge pas la div => Empêche de pouvoir faire sortir la div par le coté gauche ou haut
      selectedDiv.value.offsetTop - positions.value.pos2 > 0 &&
      selectedDiv.value.offsetLeft - positions.value.pos1 > 0 &&
      // Si la largeur de la div + la position left est plus grand que la largeur de l'image, on ne peut plus la bouger => Empêche de sortir la div de l'imgae par le coté droit
      selectedDiv.value.offsetLeft - positions.value.pos1 + Math.ceil(currentDivWidth) <
        Math.trunc(imageWidth) &&
      // Si la hauteur de la div + la position top est plus grand que la hauteur de l'image, on ne peut plus bouger la div => Cela évite de sortir de l'image par le bas.
      selectedDiv.value.offsetTop - positions.value.pos2 + Math.ceil(currentDivHeight) <
        Math.trunc(imageHeight)
    ) {
      // Si on n'est pas en dehors de l'image, alors on accepte de bouger la div
      selectedDiv.value.style.top = selectedDiv.value.offsetTop - positions.value.pos2 + 'px'
      selectedDiv.value.style.left = selectedDiv.value.offsetLeft - positions.value.pos1 + 'px'
    }
    // On sauvegarde les informations de position pour les display à l'écran dans l'onglet informations
    selectedDivTop.value = selectedDiv.value.offsetTop
    selectedDivLeft.value = selectedDiv.value.offsetLeft
  }

  const closeDragElement = () => {
    // Quand le bouton est relaché on arrête le drag and drop
    document.onmouseup = null
    document.onmousemove = null
  }

  const changeSelectedWidth = (newValue: number) => {
    let div = document.getElementById(selectedId.value)
    div.style.width = newValue + 'px'
    selectedDivWidth.value = newValue
  }

  const changeSelectedHeight = (newValue: number) => {
    let div = document.getElementById(selectedId.value)
    div.style.height = newValue + 'px'
    selectedDivHeight.value = newValue
  }
</script>
<template>
  <div class="main">
    <div class="playground">
      <div
        ref="background"
        id="back"
        class="back"
      >
        <img
          src="@/assets/images/form.png"
          alt="image for the exercice"
          ref="image"
        />
        <!-- <input
          value=""
          placeholder="Valeur du champ"
          type="text"
          v-for="item in fieldList"
          class="fields"
          :id="item"
          @click="clicked"
        /> -->
        <div
          v-for="item in fieldList"
          class="fields"
          :id="'id' + item.toString()"
          @click="clicked"
          @mousedown="dragMouseDown"
        ></div>
      </div>
      <div class="controlPanel">
        <h1 class="infoHeader">Informations:</h1>
        <button
          @click="addField"
          class="addField"
        >
          + Ajouter un champ
        </button>
        <p>Id de la div sélectionnée: {{ selectedId }}</p>
        <p class="coordinates">Y: {{ selectedDivTop }}</p>
        <p class="coordinates">X: {{ selectedDivLeft }}</p>
        <div
          class="dimensionSettings"
          v-show="selectedId"
        >
          <p class="infoHeaderSub">Largeur:</p>
          <div class="dimensionContainer">
            <div
              class="triangleLeft"
              @click="changeSelectedWidth(selectedDivWidth - 1)"
            ></div>
            <input
              class="dimensionInput"
              type="number"
              v-model="selectedDivWidth"
              @change="changeSelectedWidth(selectedDivWidth)"
            />
            <div
              class="triangleRight"
              @click="changeSelectedWidth(selectedDivWidth + 1)"
            ></div>
          </div>
          <p class="infoHeaderSub">Hauteur:</p>
          <div class="dimensionContainer">
            <div
              class="triangleLeft"
              @click="changeSelectedHeight(selectedDivHeight - 1)"
            ></div>
            <input
              class="dimensionInput"
              type="number"
              v-model="selectedDivHeight"
              @change="changeSelectedHeight(selectedDivHeight)"
            />
            <div
              class="triangleRight"
              @click="changeSelectedHeight(selectedDivHeight + 1)"
            ></div>
          </div>
        </div>
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3%;
  }
  .playground {
    margin-top: 25px;
    display: flex;
    max-width: 100%;
    width: 95%;
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
    border: 1px solid #707070;
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
  .fields {
    position: absolute;
    color: red;
    border: 2px dashed #00307e;
    width: 150px;
    height: 30px;
    top: 0;
    left: 0;
    text-align: center;
    font-size: 100%;
    font-weight: bold;
    background-color: white;
    cursor: move;
    animation: divSpawning 0.5s ease;
  }
  .controlPanel {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    height: max-content;
    min-height: 50px;
    background-color: rgb(112, 112, 112, 0.05);
    border-radius: 5px;
    padding: 15px;
    gap: 15px;
    text-align: center;
  }
  .infoHeader {
    font-size: 1.3em;
    color: #00307e;
    text-align: center;
    padding-bottom: 5px;
    font-weight: 600;
  }
  .addField {
    background-color: #00307e;
    border-radius: 10px;
    padding: 10px;
    color: white;
    text-align: center;
    width: max-content;
    align-self: center;
  }
  .coordinates {
    text-align: center;
  }
  .dimensionSettings {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .infoHeaderSub {
    color: #00307e;
    font-size: 1.1em;
    font-weight: bold;
    text-align: center;
  }
  .dimensionContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10%;
    margin-bottom: 15px;
  }
  .dimensionInput {
    text-decoration: none;
    width: 45%;
    border: 1px solid #00307e;
    text-align: center;
  }
  .triangleLeft {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 20px solid #555;
    border-bottom: 10px solid transparent;
    cursor: pointer;
  }
  .triangleRight {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 20px solid #555;
    border-bottom: 10px solid transparent;
    cursor: pointer;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }

  @keyframes divSpawning {
    0% {
      border: 10px solid #00307e;
    }
    100% {
      border: 2px dashed #00307e;
    }
  }
</style>

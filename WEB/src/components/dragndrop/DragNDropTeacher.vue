<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue'
  import { useDadLevels } from '@/stores/dadLevels'
  import { useUserStore } from '@/stores/user'
  import axios from 'axios'
  import router from '@/router'
  //   const image = ref('')
  //   const file = ref(null)
  //   const changeImage = (e: any) => {
  //     image.value = URL.createObjectURL(e.target.files[0])
  //     file.value = e.target.file[0]
  //     console.log(image.value, file.value)
  //   }
  const store = useDadLevels()
  // const userStore = useUserStore()
  const addDataToStore = (data: any, type: string) => {
    store.setTempData(data, type)
  }

  const numberField = ref(0)
  const numberFieldMobile = ref(0)
  // array avec des nombre dedans, ce nbr permet de savoir le nbr de DIV
  // utilisé pour générer les champs
  const fieldList = ref<number[]>([])
  const fieldListMobile = ref<number[]>([])
  const background = ref(null)
  const image = ref()

  const imageLink = ref('')

  const selectedId = ref('')
  const selectedDiv = ref()

  const selectedDivTop = ref(0)
  const selectedDivLeft = ref(0)

  const selectedDivWidth = ref(0)
  const selectedDivHeight = ref(0)

  const selectedDivContent = ref('')

  const selectedDivContentSize = ref(0)

  //Ces deux refs sont utilisées pour afficher les erreurs quand le professeur souhaite sauvegarder l'activité
  const alertDiv = ref(false)
  const alertNoDiv = ref(false)

  //erreur lors du choix du nom de l'activité
  const alertNoName = ref('')

  // Pour savoir si la requête à réussie ou pas
  const goodRequest = ref(false)

  //Pour savoir si les données on déjà été envoyées => empêche de spam le bouton
  const pcDataSended = ref(false)

  // Les valeurs de position pour les divs quand on utilise le drag and drop
  const positions = ref({
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0
  })

  const popupDisplay = ref(false)

  const emit = defineEmits<{
    (e: 'change-page', nbrPage: number): void
  }>()

  // On va stocker ici le nom du nouveau niveau
  // const levelName = ref('')

  // const postData = (payload: any) => {
  //   console.log(payload)
  //   console.log(userStore.user.name, userStore.user.surname)
  //   let levelData = JSON.stringify(payload)
  //   let badResponse = false
  //   let dataToSend = {
  //     leveldata: levelData,
  //     levelname: levelName.value,
  //     creator: userStore.user.name + userStore.user.surname
  //   }
  //   axios
  //     .post('http://localhost:3000/drag_and_drop', dataToSend, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       alertNoName.value = "Une erreur c'est produite! Veuillez réessayer ultérieurement."
  //       badResponse = true
  //     })
  //     .then((response) => {
  //       if (!badResponse) {
  //         console.log(response)
  //         goodRequest.value = true
  //       }
  //       // router.push('/')
  //     })
  // }

  const addField = () => {
    // On push un nombre dans l'array pour ajouter une div avec le v-for
    if (pcDataSended.value) {
      numberFieldMobile.value++
      fieldListMobile.value.push(numberFieldMobile.value)
    } else {
      numberField.value++
      fieldList.value.push(numberField.value)
    }
  }

  const clicked = (e: any) => {
    //Change l'indicateur de champ sélectionné

    //Si un champ était déjà sélectionné au paravant, on le remet à la couleur de bordure initiale
    if (selectedId.value) {
      let element: any = document.getElementById(selectedId.value)
      element.style.border = '2px dashed #00307e'
    }

    selectedId.value = e.target.id
    let element: any = document.getElementById(selectedId.value)
    element.style.border = '2px dashed red'
    selectedDivWidth.value = parseInt(getComputedStyle(element).width)
    selectedDivHeight.value = parseInt(getComputedStyle(element).height)
    selectedDivTop.value = element.offsetTop
    selectedDivLeft.value = element.offsetLeft
    selectedDivContentSize.value = parseInt(getComputedStyle(element).fontSize)

    if (element.innerText) {
      selectedDivContent.value = element.innerText
    } else {
      selectedDivContent.value = ''
    }
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
    // Cette fonction permet de changer la width de la div sélectionnée
    let div: any = document.getElementById(selectedId.value)
    div.style.width = newValue + 'px'
    selectedDivWidth.value = newValue
  }

  const changeSelectedHeight = (newValue: number) => {
    // Cette fonction permet de changer la height de la div sélectionnée
    let div: any = document.getElementById(selectedId.value)
    div.style.height = newValue + 'px'
    selectedDivHeight.value = newValue
  }

  // Cette fonction permet de changer le contenu d'un champ
  const setDivContent = (newContent: string) => {
    let element: any = document.getElementById(selectedId.value)
    element.innerText = newContent
  }

  const setDivContentSize = (newContentSize: number) => {
    let element: any = document.getElementById(selectedId.value)
    element.style.fontSize = newContentSize + 'px'
  }

  // Bouger la div sélectionnée vers le haut ou bas
  const setDivTop = (newTop: number) => {
    let element: any = document.getElementById(selectedId.value)
    let calc: number = selectedDivTop.value + newTop
    if (
      calc > 0 &&
      parseInt(getComputedStyle(image.value).height) > calc + selectedDivHeight.value
    ) {
      element.style.top = calc + 'px'
      selectedDivTop.value = calc
    }
  }

  // Bouger la div sélectionnée vers la gauche ou droite
  const setDivLeft = (newLeft: number) => {
    let element: any = document.getElementById(selectedId.value)
    let calc: number = selectedDivLeft.value + newLeft
    if (calc > 0 && parseInt(getComputedStyle(image.value).width) > calc + selectedDivWidth.value) {
      element.style.left = calc + 'px'
      selectedDivLeft.value = calc
    }
  }

  // check que tous les champs (les divs) possèdent des valeurs
  const checkFields = () => {
    alertDiv.value = false
    alertNoDiv.value = true
    for (let div in background.value.childNodes) {
      if (background.value.childNodes[div].id) {
        alertNoDiv.value = false
        if (!background.value.childNodes[div].innerText) {
          alertDiv.value = true
          return 0
        }
      }
    }
    return 1
  }

  // Ouvre le popup si les divs sont toutes remplies
  const openPopup = () => {
    if (checkFields() && alertNoDiv) {
      popupDisplay.value = true
    }
  }

  // Permet d'enregistrer les différentes divs placées dans une liste js
  const saveConfig = () => {
    let payload = []

    // On parcours les divs placées
    for (let div in background.value.childNodes) {
      // Si la div possède un id on entre (permet de ne pas prendre l'image de fond)
      if (background.value.childNodes[div].id) {
        let currentDiv = background.value.childNodes[div]

        // On va save toutes les données de la div actuellemnt traitée (top, left, width et height) et les mettre en pourceantages
        let currentDivHeightPorc = (
          (parseInt(getComputedStyle(currentDiv).height) /
            parseInt(getComputedStyle(image.value).height)) *
          100
        ).toFixed(2)
        let currentDivWidthPorc = (
          (parseInt(getComputedStyle(currentDiv).width) /
            parseInt(getComputedStyle(image.value).width)) *
          100
        ).toFixed(2)

        let currentDivTopPorc = (
          (parseInt(getComputedStyle(currentDiv).top) /
            parseInt(getComputedStyle(image.value).height)) *
          100
        ).toFixed(2)

        let currentDivLeftPorc = (
          (parseInt(getComputedStyle(currentDiv).left) /
            parseInt(getComputedStyle(image.value).width)) *
          100
        ).toFixed(2)

        let calculatedFontSize = getComputedStyle(currentDiv).fontSize
        if (pcDataSended.value) {
          let porcentage =
            parseInt(getComputedStyle(currentDiv).fontSize) /
            parseInt(getComputedStyle(image.value).width)
          calculatedFontSize = (porcentage * 100).toFixed(1) + 'vw'
          console.log(calculatedFontSize)
        }

        // On construit l'objet à insérer dans le payload
        let currentDivInfo = {
          test: currentDiv.id.match(/(\d+)/)[0],
          number: parseInt(currentDiv.id.match(/(\d+)/)),
          top: currentDivTopPorc.toString() + '%',
          left: currentDivLeftPorc.toString() + '%',
          width: currentDivWidthPorc.toString() + '%',
          height: currentDivHeightPorc.toString() + '%',
          rightValue: currentDiv.innerText,
          fontSize: calculatedFontSize
        }
        // On insère l'objet dans le payload
        payload.push(currentDivInfo)
      }
    }

    if (pcDataSended.value) {
      // On envoie au store les données de la version mobile (donc le payload)
      addDataToStore(payload, 'mobile')
      popupDisplay.value = false
      emit('change-page', 3)
    } else {
      // On envoie au store les données de la version PC (donc le payload)
      addDataToStore(payload, 'pc')
      // On va utiliser les mêmes données pour générer la version mobile
      // Cette variable permet de changer l'état d'affichage de l'image (web ou mobile)
      pcDataSended.value = true
      popupDisplay.value = false
      // Cette fontion va générer les champs pour la version mobile en fonction des données de la version web
      generateMobileFields(payload)
    }
  }

  // Cette fontion est utilisée pour regénérer les div de la version mobile à partir de ce qui a été fait en version web
  const generateMobileFields = (data: any) => {
    // data => Données du web
    // On parcour c'est données et on génère des divs à partir de ces dernières
    for (let item in data) {
      // Même principe que pour la génération en version web
      numberFieldMobile.value++
      // fieldListMobile est lié à un v-for pour générer les divs
      fieldListMobile.value.push(numberFieldMobile.value)
      // Il faut mettre un setTimeout car le v-for n'a pas le temps de créer la div que l'on y accède déjà => Problème
      setTimeout(() => {
        let element: any = document.getElementById('id' + data[item].test)
        element.style.top = data[item].top
        element.style.left = data[item].left
        element.style.width = data[item].width
        element.style.height = data[item].height
        element.innerText = data[item].rightValue
        element.style.fontSize = data[item].fontSize
      }, 1)
    }
    selectedId.value = ''
  }

  onMounted(() => {
    imageLink.value = store.getImageUrl()
  })
</script>
<template>
  <div class="global_content">
    <div class="main">
      <div class="playground">
        <div
          ref="background"
          id="back"
          class="back"
          v-if="!pcDataSended"
        >
          <img
            v-show="imageLink"
            :src="imageLink"
            alt="image for the exercice"
            ref="image"
          />
          <div
            v-for="item in fieldList"
            class="fields"
            :id="'id' + item"
            @click="clicked"
            @mousedown="dragMouseDown"
          ></div>
        </div>
        <div
          ref="background"
          id="back"
          class="back_mobile"
          v-else
        >
          <img
            v-show="imageLink"
            :src="imageLink"
            alt="image for the exercice"
            ref="image"
          />
          <div
            v-for="item in fieldListMobile"
            class="fields"
            :id="'id' + item"
            @click="clicked"
            @mousedown="dragMouseDown"
          ></div>
        </div>
        <div class="controlPanelContainer">
          <div class="controlPanel">
            <h1 class="infoHeader">Informations:</h1>
            <button
              @click="addField"
              class="addField"
            >
              <b>+</b> Ajouter un champ
            </button>
            <div>
              <p
                class="infoHeaderSub"
                v-show="selectedId"
              >
                Positions:
              </p>
              <div
                class="positionInfo"
                v-show="selectedId"
              >
                <p
                  class="commands"
                  @click="setDivTop(-1)"
                >
                  <img
                    src="@/assets/logo/minus_logo.svg"
                    alt="minus logo"
                  />
                </p>
                <p class="coordinates">Y: {{ selectedDivTop }}</p>
                <p
                  class="commands"
                  @click="setDivTop(1)"
                >
                  <img
                    src="@/assets/logo/plus_logo.svg"
                    alt="plus logo"
                  />
                </p>
              </div>
              <div
                class="positionInfo"
                v-show="selectedId"
              >
                <p
                  class="commands"
                  @click="setDivLeft(-1)"
                >
                  <img
                    src="@/assets/logo/minus_logo.svg"
                    alt="minus logo"
                  />
                </p>
                <p class="coordinates">X: {{ selectedDivLeft }}</p>
                <p
                  class="commands"
                  @click="setDivLeft(1)"
                >
                  <img
                    src="@/assets/logo/plus_logo.svg"
                    alt="plus logo"
                  />
                </p>
              </div>
            </div>
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
            <div
              class="divContentSetter"
              v-show="selectedId"
            >
              <p class="infoHeaderSub">Valeur du champ:</p>
              <input
                class="divContentInput"
                v-model="selectedDivContent"
                type="text"
                @input="setDivContent(selectedDivContent)"
                placeholder="Insérer la valeur du champ"
              />
            </div>
            <div
              class="divContentSetter"
              v-show="selectedId"
            >
              <p class="infoHeaderSub">Taille de la police:</p>
              <input
                class="divContentInput"
                v-model="selectedDivContentSize"
                type="text"
                @input="setDivContentSize(selectedDivContentSize)"
                placeholder="Préciser la taille de la police"
              />
            </div>
            <button
              class="saveButton"
              @click="openPopup"
              v-show="selectedId"
            >
              Enregistrer l'activité
            </button>
            <div
              class="alert"
              v-show="alertDiv"
            >
              Un champ n'a pas de valeur!
            </div>
            <div
              class="alert"
              v-show="alertNoDiv"
            >
              Veuillez insérer minimum 1 champ!
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="popup"
      v-show="popupDisplay"
      v-if="!pcDataSended"
    >
      <div
        class="popup_content"
        v-if="!goodRequest"
      >
        <h1 style="color: #00307e">Cliquer sur continuer pour adapter l'exercice au mobile</h1>
        <p
          class="alert"
          style="font-size: 0.7em"
          v-show="alertNoName"
        >
          {{ alertNoName }}
        </p>
        <div class="button_container">
          <button
            class="final_save_button"
            @click="saveConfig"
          >
            Continuer
          </button>
          <button
            class="cancel_button"
            @click="
              () => {
                popupDisplay = false
              }
            "
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
    <div
      class="popup"
      v-show="popupDisplay"
      v-if="pcDataSended"
    >
      <div
        class="popup_content"
        v-if="!goodRequest"
      >
        <h1 style="color: #00307e">
          Avez-vous terminer l'adaptation de la version mobile? Si oui cliquer sur terminer. Si non
          vous pouvez cliquer sur annuler.
        </h1>
        <p
          class="alert"
          style="font-size: 0.7em"
          v-show="alertNoName"
        >
          {{ alertNoName }}
        </p>
        <div class="button_container">
          <button
            class="final_save_button"
            @click="saveConfig"
          >
            Continuer
          </button>
          <button
            class="cancel_button"
            @click="
              () => {
                popupDisplay = false
              }
            "
          >
            Annuler
          </button>
        </div>
      </div>
      <div
        class="popup_content"
        v-else
      >
        <h1 style="color: green">L'exercice à bien été enregistré dans la base de données !</h1>
        <div class="button_container">
          <button
            class="final_save_button"
            @click="$emit('change-page', 2)"
          >
            Accueil
          </button>
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
  }
  .playground {
    display: flex;
    max-width: 100%;
    width: 95%;
    justify-content: center;
    align-items: flex-start;
    /* width: 100%; */
    flex-direction: row;
    /* outline: 1px solid red; */
    gap: 5%;
    z-index: 1;
  }
  .back {
    display: flex;
    position: relative;
    /* outline: 1px solid blue; */
    outline: 1px solid #707070;
    font-size: 0.7em;
    width: max-content;
    min-width: 50%;
    max-width: 60%;
  }
  .back_mobile {
    display: flex;
    position: relative;
    /* outline: 1px solid blue; */
    outline: 1px solid #707070;
    font-size: 0.7em;
    width: max-content;
    max-width: 30%;
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
    color: #707070;
    border: 2px dashed #00307e;
    width: 150px;
    height: 30px;
    /* top: 0;
    left: 0; */
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 130%;
    font-weight: bold;
    background-color: white;
    cursor: move;
    animation: divSpawning 0.5s ease;
  }
  .controlPanelContainer {
    position: relative;
    display: flex;
    min-height: 400px;
    height: 100%;
    min-width: 22%;
    max-width: 25%;
    justify-content: center;
    overflow: visible;
    /* border: 2px solid red; */
  }
  .controlPanel {
    width: 22%;
    max-width: 400px;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: fit-content;
    min-height: 50px;
    background-color: rgb(112, 112, 112, 0.05);
    border: 1px solid #00307e;
    border-radius: 3px;
    padding: 15px;
    gap: 15px;
    text-align: center;
  }
  .infoHeader {
    font-size: 1.5em;
    color: #00307e;
    text-align: center;
    padding-bottom: 5px;
    font-weight: 600;
    border-bottom: 1px solid grey;
  }
  .addField {
    background-color: #00307e;
    border-radius: 5px;
    padding: 10px;
    color: white;
    text-align: center;
    width: max-content;
    align-self: center;
    transition: 0.5s ease;
  }
  .addField:hover {
    box-shadow: inset 0 0 5px #0252d3, rgba(149, 157, 165, 0.15) 0px 8px 24px;
    transition: 0.5s ease;
  }
  .coordinates {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50px;
  }
  .positionInfo {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 25px;
  }
  .commands {
    border: 1px solid black;
    padding: 1px;
    font-weight: bold;
    border: 5px;
    cursor: pointer;
    width: 5%;
  }
  .dimensionSettings {
    display: flex;
    flex-direction: column;
    /* gap: 5px; */
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
    gap: 5%;
    margin-bottom: 5px;
  }
  .dimensionInput {
    text-decoration: none;
    width: 45%;
    border: 1px solid #00307e;
    text-align: center;
    border-radius: 2px;
  }
  .triangleLeft {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 20px solid #555;
    border-bottom: 10px solid transparent;
    cursor: pointer;
    transform: scale(0.8);
  }
  .triangleRight {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 20px solid #555;
    border-bottom: 10px solid transparent;
    cursor: pointer;
    transform: scale(0.8);
  }
  .divContentSetter {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .divContentInput {
    border: 1px solid #00307e;
    width: 90%;
    padding: 2px 5px;
    display: flex;
    border-radius: 2px;
  }

  .saveButton {
    background-color: #00307e;
    position: relative;
    overflow: hidden;
    display: flex;
    gap: 3%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    align-self: center;
    padding: 10px 45px;
    border-radius: 5px;
    color: white;
    transition: 1s ease;
  }
  .saveButton::before {
    height: 100%;
    width: 20%;
    left: 0%;
    position: absolute;
    content: '';
    background-image: url('./src/assets/logo/save_logo.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 40%;
    transition: 0.5s ease;
    transform: scale(0);
    opacity: 0;
  }
  .saveButton:hover {
    box-shadow: inset 0 0 5px #0252d3, rgba(149, 157, 165, 0.15) 0px 8px 24px;
    transition: 0.5s ease;
  }
  .saveButton:hover::before {
    opacity: 1;
    transform: scale(1);
    transition: ease 0.5s;
  }
  .alert {
    color: red;
    font-size: 1em;
    font-weight: bold;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }

  .popup {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 20;
    background: rgb(220, 220, 220, 0.1);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup_content {
    width: 35vw;
    border: 1px solid #00307e;
    background-color: white;
    text-align: center;
    font-size: 1.4em;
    padding: 15px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .button_container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15%;
    width: 100%;
    padding-top: 3%;
  }
  .final_save_button {
    background-color: #00307e;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    align-self: center;
    padding: 10px 35px;
    border-radius: 5px;
    color: white;
    transition: 1s ease;
  }
  .final_save_button:hover {
    box-shadow: inset 0 0 5px #0252d3, rgba(149, 157, 165, 0.15) 0px 8px 24px;
    transition: 0.5s ease;
  }

  .cancel_button {
    outline: 1px solid red;
    padding: 10px 25px;
    border-radius: 5px;
  }
  .cancel_button:hover {
    outline: 2px solid red;
  }

  .cancel_button:active {
    transform: scale(0.9);
  }

  .exercice_name {
    border: #555 1px solid;
    text-align: center;
    margin-top: 10px;
    max-height: 35px;
  }

  @keyframes divSpawning {
    0% {
      border: 8px dashed #004ecbcc;
    }
    100% {
      border: 2px dashed #00307e;
    }
  }
</style>

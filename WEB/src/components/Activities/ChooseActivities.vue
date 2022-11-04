<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const selectedActivity = ref(0)
  const isThereAnyActivitySelected = ref(false)

  const listActivities = [
    { 
      activity_name: 'FlashCards',
      url: '/src/assets/logo/flashcards.svg',
      description:
        "Activité dans laquelle l'étudiant doit trouver de mots et doit s'auto-évaluer. Les mots" +
        '            sont representé sous forme de carte. Un systeme de poids est mise en place pour que les' +
        "            cartes plus dure de l'élève réaparaissent le plus souvent.",
      link:"/add-card"
    },
    {
      activity_name: 'DragAndLearn',
      url: '/src/assets/logo/dalcard.svg',
      description:
        "Activité dans laquelle l'étudiant doit trouver de mots et doit s'auto-évaluer. Les mots" +
        '            sont representé sous forme de carte. Un systeme de poids est mise en place pour que les' +
        "            cartes plus dure de l'élève réaparaissent le plus souvent.",
      link:"/hello-World "
    }
  ]

  const handleClick = (divId: any) => {
    isThereAnyActivitySelected.value = true
    console.log(divId)
    selectedActivity.value = divId
  }
</script>
<template>
  <div class="main">
    <div class="title">
      <p class="text">Choisissez le type d'activité</p>
    </div>
    <div class="content">
      <div class="typeActi">
        <div
          class="carte"
          v-for="(value, key) in listActivities"
          :id="key.toString()"
          @click="handleClick(key)"
        >
          <img
            :src="value.url"
            alt="Gamemode logo"
          />
        </div>
      </div>
      <div class="description">
        <div 
        v-if = isThereAnyActivitySelected
        class="descrTitle"
        >  
        Type sélectionné: 
      </div>
      <div v-else class="descrTitle"> Choisissez l'activité en cliquant sur la carte ! </div>
        <div
          class="actiName"
          v-show="isThereAnyActivitySelected"
        >
          {{ isThereAnyActivitySelected ? listActivities[selectedActivity].activity_name : '' }}
        </div>
        <div
          class="textDescrip"
          v-show="isThereAnyActivitySelected"
        >
          <p>
            {{ isThereAnyActivitySelected ? listActivities[selectedActivity].description : '' }}
          </p>
        </div>
        <div>
          <router-link v-show="isThereAnyActivitySelected" 
              :to = "isThereAnyActivitySelected ? listActivities[selectedActivity].link : ''"
              class="button">
              Créer une activité
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .main {
    gap: 5vh;
    padding-top: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    max-width: 1600px;
  }

  .title {
    padding-top: 25px;
  }

  .carte {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 17vh;
    height: 22vh;
    border: 2px solid grey;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.1) 0px 8px 10px;
    padding: 5px;
  }

  .carte:hover {
    cursor: pointer;
  }

  .carte:active {
    transform: scale(1.1);
  }
  .text {
    font-size: 1.8em;
    color: grey;
    border-bottom: 2px solid green;
    font-weight: 600;
  }
  .content {
    gap: 5%;
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    justify-content: center;
  }
  .typeActi {
    gap: 4%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* align-items: flex-start; */
    border: 2px grey solid;
    border-radius: 5px;
    /* width: 100vh;
    height: 68vh; */
    width: 100%;
    height: 90%;
    padding: 20px;
  }

  .descrTitle {
    padding-bottom: 2%;
    color: green;
    font-size: 2.6vh;
    display: contents;
  }

  .description {
    border: solid 2px grey;
    color: grey;
    border-radius: 5px;
    padding: 2% 2%;
    /* width: 35vh;
    height: 68vh; */
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2%;
  }
  .actiName {
    font-size: 3vh;
    color: grey;
    font-weight: bold;
  }
  .button {
    background-color: green;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    color: white;
    padding: 8px 12px;
    text-align: center;
    display: inline-block;
    font-size: 2vh;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
  }
  .textDescrip {
    text-align: center;
    font-style: italic;
    font-size: 2.3vh;
    /* font-family:monospace; */
  }
  .logo {
    width: 90%;
    height: auto;
  }
</style>

 
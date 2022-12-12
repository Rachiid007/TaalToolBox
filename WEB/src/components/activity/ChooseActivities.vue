<script setup lang="ts">
  // il n'ya que ceux ayant le profil créateur qui peuvent ajouter des activités
  import { ref } from 'vue'

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
      link: '/add-card'
    },
    {
      activity_name: 'DragAndLearn',
      url: '/src/assets/logo/dalcard.svg',
      description:
        "Activité dans laquelle l'étudiant doit placer des mots qui lui seront proposer dans la zone de jeu." +
        ' Dans cette zone de jeu les mots devrons être placés dans des champs et la zone de jeu comportera une image de background.',
      link: '/dadteacher'
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
      <h1 class="text">Choisissez le type d'activité</h1>
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
            class="logo"
            :src="value.url"
            alt="Gamemode logo"
          />
        </div>
      </div>
      <div class="description">
        <div
          v-if="isThereAnyActivitySelected"
          class="descrTitle"
        >
          <p>Type sélectionné:</p>
        </div>
        <div
          v-else
          class="descrTitle"
        >
          Choisissez l'activité en cliquant sur la carte !
        </div>
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
          <router-link
            v-show="isThereAnyActivitySelected"
            :to="isThereAnyActivitySelected ? listActivities[selectedActivity].link : ''"
            class="button"
          >
            Créer une activité
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .main {
    gap: 4%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    max-width: 1600px;
    text-align: center;
  }

  .title {
    padding-top: 20px;
  }

  .carte {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 50%;
    flex: 0.2;
    border: 2px solid grey;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.1) 0px 8px 10px;
    padding: 5px;
    transition: 0.1s ease;
  }

  .carte:hover {
    cursor: pointer;
  }

  .carte:active {
    transform: scale(1.1);
  }
  .text {
    font-size: 28px;
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
    max-height: 700px;
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
    height: 80%;
    padding: 20px;
  }

  .descrTitle {
    padding-bottom: 2%;
    color: green;
    font-size: 20px;
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
    height: 80%;
    max-height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2%;
    overflow-y: auto;
  }
  .actiName {
    font-size: 25px;
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
    display: inline-block;
    font-size: 20px;
    margin: 20px 2px;
    cursor: pointer;
    border-radius: 5px;
  }
  .textDescrip {
    font-style: italic;
    font-size: 1.1em;
    /* font-family:monospace; */
  }
  .logo {
    width: 85%;
    height: auto;
  }
  @media (max-width: 1400px) {
    .actiName {
      font-size: 15px;
    }
    .descrTitle {
      font-size: 15px;
    }
    .logo {
      width: 75%;
      height: auto;
    }
  }
</style>

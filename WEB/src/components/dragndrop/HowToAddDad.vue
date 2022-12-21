<script lang="ts" setup>
  import createDal from '@/assets/images/daltuto/create-dal.svg'
  import getImage from '@/assets/images/daltuto/get-image.svg'
  import mobileVersion from '@/assets/images/daltuto/mobile-version.svg'
  import sendToDd from '@/assets/images/daltuto/send-to-db.svg'
  import { useDadLevels } from '@/stores/dadLevels'
  import { onMounted } from 'vue'
  import { useUserStore } from '@/stores/user'
  await useUserStore().checkUserAccessAndRole(['Administrateur', 'Créateur'])
  const store = useDadLevels()
</script>
<template>
  <div class="main">
    <div class="tuto">
      <h1 class="main_title">Bienvenue dans l'outil de création des activités DragAndLearn!</h1>
      <h2 class="sub_title">1. Choisisser une image de background</h2>
      <div class="explanation">
        <img
          :src="getImage"
          class="explanation_image"
          alt="Add a background image "
        />
        <div class="explanation_description">
          <p>
            Commencer par choisir une image de fond sur laquelle vous irez placer des champs. Cette
            image peut correspondre à un formulaire ou un texte par exemple.
          </p>
        </div>
      </div>
      <h2 class="sub_title">2. Placer les champs la où vous le souhaitez</h2>
      <div class="explanation">
        <div class="explanation_description">
          <p>
            Ensuite, dans l'éditeur de DragAndLearn, placer les champs où vous le souhaitez sur le
            fond précédemment choisis. Pour chaque champ, vous pouvez préciser la taille (hauteur et
            largeur), la position par rapport au fond ainsi que une valeur qui à la bonne valeur
            pour ce champ.
          </p>
        </div>
        <img
          :src="createDal"
          class="explanation_image"
          alt="Create the drag and learn with the different fields"
        />
      </div>
      <h2 class="sub_title">3. Personnaliser votre travail pour la version mobile</h2>
      <div class="explanation">
        <img
          :src="mobileVersion"
          class="explanation_image"
          alt="Adapt your exercice into a mobile version"
        />
        <div class="explanation_description">
          <p>
            Une fois votre nouvel exercice créé, il vous est possible, si vous le souhaitez, de
            l'adapter aux versions mobiles. Ceci permettera à toute personne sur un appareil mobile
            de pouvoir voir l'activité et d'y jouer correctement.
          </p>
        </div>
      </div>
      <h2 class="sub_title">4. Enregister votre éxercice en tant que nouvelle activité</h2>
      <div class="explanation">
        <div class="explanation_description">
          <p>
            Pour finir, quand la phase création de l'exercice est terminée, vous pouvez lui donner
            un nom et choisir un emplacement sur la carte où la nouvelle activité se trouvera.
          </p>
        </div>
        <img
          :src="sendToDd"
          class="explanation_image"
          alt="Adapt your exercice into a mobile version"
        />
      </div>
      <button
        class="start_button"
        @click="$emit('change-page', 1)"
      >
        Créer une activité Drag And Learn
      </button>
    </div>
  </div>
</template>
<style scoped>
  .main {
    width: 100vw;
    max-width: 1600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* outline: 1px solid red; */
  }
  .tuto {
    display: flex;
    /* outline: 1px solid green; */
    flex-direction: column;
    align-items: center;
    gap: 2.5vh;
  }
  .tuto h1 {
    font-family: NotoSans-Regular;
    text-align: center;
  }
  .main_title {
    color: var(--main-dal-color);
    font-size: 30px;
    padding-top: 2vh;
    position: relative;
    overflow: visible;
    border-bottom: 2px solid var(--main-dal-color);
  }
  .sub_title {
    color: var(--second-color);
    font-weight: bold;
    font-size: 18px;
    border-bottom: 2px dashed var(--main-dal-color);
  }
  .explanation {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* outline: 1px solid blue; */
    width: 100%;
    margin: 15px 0;
    gap: 25px;
  }
  .explanation_image {
    width: 20%;
    max-height: 130px;
  }
  .explanation_description {
    width: 30%;
    text-align: center;
    font-family: Didno;
    font-size: 18px;
  }
  .start_button {
    background-color: var(--main-dal-color);
    color: white;
    padding: 15px;
    margin: 15px 0 25px 0;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    transition: 0.2s ease;
  }
  .start_button:hover {
    transform: scale(1.05);
    transition: 0.2s ease;
  }
</style>

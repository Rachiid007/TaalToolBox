<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import type { Ref } from 'vue'
  import { useMapStore } from '@/stores/map'
  import generalService from '@/services/generalService'
  import mapService from '@/services/mapService'
  import router from '@/router'
  import type { AxiosInstance } from 'axios'
  import { useUserStore } from '@/stores/user'
  const levelName: Ref<string> = ref('')
  const levelType: Ref<number> = ref(0)
  const levelTheme: Ref<number> = ref(0)
  const levelDifficulty: Ref<number> = ref(0)
  const levelDescription: Ref<string> = ref('')

  const mapStore = useMapStore()
  await useUserStore().checkUserAccessAndRole(['Administrateur', 'Créateur'])

  const error: Ref<string> = ref('')
  const theme: { id: number; name: string }[] = await mapStore.getThemeRequest()
  const difficulty: { id: number; description: string }[] = await mapStore.getDifficultyRequest()
  let activities: { id: number; name: string; description: string }[] =
    await mapStore.getActivitiesRequest()

  const checkFields = () => {
    if (
      levelName.value == '' ||
      levelType.value == 0 ||
      levelTheme.value == 0 ||
      levelDifficulty.value == 0 ||
      levelDescription.value == ''
    ) {
      return 0
    }
    return 1
  }

  const handleClick = async () => {
    error.value = ''
    // console.log(
    //   levelName.value,
    //   levelType.value,
    //   levelTheme.value,
    //   levelDifficulty.value,
    //   levelDescription.value
    // )
    if (checkFields()) {
      const dataPayload = {
        name: levelName.value,
        activityId: levelType.value,
        themeId: levelTheme.value,
        difficultyId: levelDifficulty.value,
        description: levelDescription.value
      }
      // Rajouter au store et inserer le level dans la base de données
      mapStore.$patch({ newLevel: dataPayload })
      // store.addLevelData(dataPayload)

      // mapStore.setLevelMap(mapStore.newLevel)
      if (activities.filter((x) => x.id === levelType.value)[0].name === 'DragAndLearn') {
        router.replace('/dad-teacher')
      } else {
        mapService.setLevelMap(mapStore.newLevel)
        window.location.pathname = '/map'
      }
    } else {
      error.value = 'Veuillez compléter tous les champs'
    }
  }
</script>
<template>
  <div class="main">
    <div>
      <h1 class="text">Informations du nouveau niveau</h1>
    </div>
    <div class="content">
      <div class="textArera">
        <div class="descriLevel">
          <h1>Description:</h1>
        </div>
        <textarea
          class="areaText"
          placeholder="Introduisez une description..."
          v-model="levelDescription"
        ></textarea>
        <!-- <input
          type="text"
          placeholder="Introduisez une description..."
          class="areaText"
        /> -->
      </div>
      <div class="fields">
        <form class="fieldForm">
          <div class="nameField">
            <!-- <h1 class="titleField">Nom du nouveau niveau:</h1> -->
            <input
              type="text"
              class="select_input"
              placeholder="Nom du niveau"
              v-model="levelName"
            />
          </div>
          <div class="select">
            <select
              name="select"
              class="select_input"
              placeholder="activities"
              v-model="levelType"
            >
              <option
                hidden
                value="0"
                disabled
                selected
              >
                Changer l'activité
              </option>
              <option
                :value="item.id"
                v-for="item in activities"
              >
                {{ item.name }}
              </option>
              <!-- <option value="1">FlashCard</option>
              <option value="2">DragAndLearn</option> -->
            </select>
          </div>
          <div class="select">
            <select
              name="select"
              class="select_input"
              v-model="levelTheme"
            >
              <option
                hidden
                disabled
                selected
                value="0"
              >
                Thème du niveau
              </option>
              <option
                :value="item.id"
                v-for="item in theme"
              >
                {{ item.name }}
              </option>
              <!-- <option value="1">Pâtisserie</option>
              <option value="2">Sport</option> -->
            </select>
          </div>
          <div class="select">
            <select
              name="select"
              class="select_input"
              v-model="levelDifficulty"
            >
              <option
                hidden
                disabled
                selected
                value="0"
              >
                Difficulté
              </option>
              <option
                :value="item.id"
                v-for="item in difficulty"
              >
                {{ item.description }}
              </option>
              <!-- <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option> -->
            </select>
          </div>
        </form>
        <p
          class="error"
          v-if="error"
        >
          {{ error }}
        </p>
        <div class="button">
          <button @click="handleClick">Confirmer</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .descriLevel {
    font-size: 1.5em;
    font-weight: 600;
    color: rgb(94, 89, 89);
  }
  textarea {
    width: 100%;
    min-height: 500px;
    padding: 10px;
    outline: 2px solid #ccc;
    border-radius: 4px;
    /* background-color: #f8f8f8; */
    /* float: left; */
    overflow-y: visible;
    resize: none;
    /* resize: none; */
  }
  .main {
    gap: 4%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    max-width: 1600px;
    text-align: center;
    margin-top: 30px;
  }

  .main h1 {
    color: grey;
    margin-bottom: 10px;
  }

  .sms {
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
  .text {
    font-size: 28px;
    color: grey;
    border-bottom: 2px solid green;
    font-weight: 600;
    font-size: 30px;
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

  .textArera {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  .name {
    border: 1px solid black;
  }

  .fields {
    gap: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    padding: 10px;
    width: 30%;
    height: max-content;
    max-height: 700px;
    align-items: center;
    margin-top: 50px;
  }
  .fieldForm {
    gap: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .level_difficulty {
    width: 100%;
  }

  .select_input {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 2px 4px -2px;
    border-radius: 5px;
    padding: 4px;
    outline: none;
    position: relative;
    color: grey;
  }
  .select_input::after {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position: absolute;
    left: 90%;
    content: '';
  }
  .select_input::placeholder {
    color: grey;
  }
  .select {
    /* border: solid red 1px; */
    width: 100%;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    background-color: #fff;
    display: grid;
    color: grey;
    align-items: center;
    position: relative;
  }
  .select::after {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 11px solid #026b30;
    position: absolute;
    left: 93%;
    content: '';
  }
  select {
    appearance: none;
    border: none;
    margin: 0;
    width: 100%;
    cursor: inherit;
    line-height: inherit;
  }

  .error {
    color: red;
    font-weight: bold;
    font-size: 20px;
  }

  .button {
    background-color: green;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    color: white;
    padding: 8px 12px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  input.select_imput {
    border: solid red 1px;
  }
</style>

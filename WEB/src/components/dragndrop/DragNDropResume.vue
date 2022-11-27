<script setup lang="ts">
  import { useDadLevels } from '@/stores/dadLevels'
  import { useUserStore } from '@/stores/user'
  import { ref } from 'vue'

  const store = useDadLevels()
  const userStore = useUserStore()

  const data: any = store.getTempData()
  // console.log(data)

  const numberOfFieldsPc = ref(data['pc'].length)
  const numeberOfFieldsMobile = ref(data['mobile'].length)

  const sendData = () => {
    let totalData = store.getTotalData()
    totalData.creator = userStore.user.name + userStore.user.surname
    // console.log(totalData)
    // console.log(totalData.levelData.fields)
    store.addData(totalData.levelData)
  }
</script>
<template>
  <div class="main">
    <div class="content">
      <div class="title">
        <h1>4. Résumé de l'exercice:</h1>
      </div>
      <div class="details">
        <div class="image_container">
          <h1 class="sub_title">Image sélectionnée:</h1>
          <img
            :src="store.getImageUrl()"
            alt="Exercice image"
          />
        </div>
        <div class="more_details">
          <h1 class="sub_title">Détails:</h1>
          <p class="fields">
            <span class="highlighted">{{ numberOfFieldsPc }}</span>
            {{ numberOfFieldsPc > 1 ? 'champs' : 'champ' }} pour la version pc
          </p>
          <p class="fields">
            <span class="highlighted">{{ numeberOfFieldsMobile }}</span>
            {{ numeberOfFieldsMobile > 1 ? 'champs' : 'champ' }} pour la version mobile
          </p>
          <h1 class="sub_title">Nom du niveau:</h1>
          <p>Niveau 1</p>
        </div>
      </div>
      <div class="confirm_button">
        <button @click="sendData">Enregistrer le niveau</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .main {
    width: 100%;
    max-width: 1600px;
  }
  .content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    gap: 25px;
    font-family: NotoSans-Regular;
    color: var(--second-color);
  }
  .title {
    margin-top: 15px;
    font-size: 30px;
    color: var(--main-dal-color);
    position: relative;
    border-bottom: 2px solid var(--main-dal-color);
  }
  .details {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* align-items: center; */
    gap: 50px;
  }
  .image_container {
    display: flex;
    flex-direction: column;
    max-width: 25%;
    align-items: center;
    justify-content: center;
  }
  img {
    height: auto;
    outline: 2px solid var(--main-dal-color);
    border-radius: 2px;
  }
  .more_details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-size: 18px;
  }
  .fields {
    text-align: left;
    width: 100%;
    margin-bottom: 10px;
  }
  .highlighted {
    border: 1px solid var(--main-dal-color);
    border-radius: 2px;
    padding: 0 5px;
    font-weight: bold;
    color: var(--main-dal-color);
  }
  .sub_title {
    font-size: 22px;
    margin-bottom: 15px;
    color: var(--main-dal-color);
  }
  .confirm_button {
    padding-top: 25px;
  }
  button {
    background: var(--main-dal-color);
    color: white;
    font-size: 20px;
    border-radius: 5px;
    padding: 10px 25px;
    transition: 0.2s ease;
    box-shadow: var(--main-dal-color) 0px 0 5px 1px;
  }
  button:hover {
    transform: scale(1.05);
    transition: 0.2s ease;
    box-shadow: inset 0 0 2px 1px #0252d3, var(--main-dal-color) 0px 0 5px 1px;
  }
</style>

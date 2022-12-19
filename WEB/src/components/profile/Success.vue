<template>
  <div class="success">
    <div class="title">SUCCESS</div>
    <div class="success_card">
      <div
        class="card"
        v-for="data in data_test"
      >
        <p class="card_title">{{ data.titre }}</p>
        <p>
          {{
            parseFloat(get_pourcentage(user_stat[data.target], data.resultat).toString()).toFixed(2)
          }}
        </p>
        <img :src="data.img" />
        <p class="card_description">{{ data.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { onMounted } from 'vue';
  import axios from 'axios';

  const data = ref()
  function get_pourcentage(a: any, b: any) {
    return (a / b) * 100
  }
  const user_stat: Ref<any> = ref({
    nombre_parties_flashcards: 1,
    nombre_parties_drag: 5
  })
 /* const data_test = ref([
    {
      titre: 'Flashcard',
      description: 'Jouer 50 parties de flashcards',
      resultat: 50,
      target: 'nombrePartiesFlashcards',
      img: '/src/assets/images/50.svg'
    },
    {
      titre: 'Flashcard',
      description: 'Jouer 100 parties de flashcards',
      resultat: 100,
      target: 'nombre_parties_flashcards',
      img: '/src/assets/images/100.svg'
    },
    {
      titre: 'Flashcard',
      description: 'Jouer 150 parties de flashcards',
      resultat: 150,
      target: 'nombre_parties_flashcards',
      img: '/src/assets/images/150.svg'
    },
    {
      titre: 'Flashcard',
      description: 'Jouer 300 parties de flashcards',
      resultat: 300,
      target: 'nombre_parties_flashcards',
      img: '/src/assets/images/300.svg'
    },
    {
      titre: 'DragAndDrop',
      description: 'Jouer 50 parties de Draganddrop',
      resultat: 50,
      target: 'nombre_parties_drag',
      img: '/src/assets/images/300.svg'
    }
  ])*/

  onMounted(async() => {
    await axios.get('http://localhost:3000/accomplissements')
    .then( (response) =>{
        console.log(response)
    })
    
  });
</script>
<style>
  .success {
    height: 100%;
    width: 100%;
  }
  .success_card {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 80%;
    gap: 2%;
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    max-width: 14%;
    text-align: center;
    font-size: 20px;
    padding: 5px;
    height: 55%;
    flex-grow: 2;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    background-color: #e5e5e5;
  }
  .card_title {
    font-weight: bold;
    color: #026b30;
  }
  .card_description {
    font-size: 16px;
  }
  img {
    width: 30%;
    height: auto;
  }
</style>

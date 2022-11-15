<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { onMounted } from 'vue';
  import axios from 'axios';
import { Result } from 'postcss';


 
  let data_test = ref()
  let user_stat = ref()

  const user_json = localStorage.getItem('user');
  if(user_json){
    let user = JSON.parse(user_json);
    user_stat = user['infos']
    console.log(user_stat);

  }
   


function get_pourcentage(a: any, b: any) {
    const result = (a / b) * 100
    return result
  }

 /* const data_test = ref([
    {
      titre: 'Flashcard',
      description: 'Jouer 50 parties de flashcards',
      resultat: 50,
      target: 'nombre_parties_flashcards',
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
        console.log(response.data)
        console.log(response)
        data_test.value = response.data
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
    
  }
  );
</script>

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
  function get_pourcentage(a: any, b: any) {
    return (a / b) * 100
  }
  const user_stat: Ref<any> = ref({
    nombre_parties_flashcards: 1,
    nombre_parties_drag: 5
  })
  const data_test = ref([
    {
      titre: 'Flashcard',
      description: 'Jouer 50 parties de flashcards',
      resultat: 50,
      target: 'nombre_parties_flashcards',
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
  ])
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
  .success_card {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 80%;
    column-gap: 5%;
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    max-width: 14%;
    text-align: center;
    font-size: 17px;
    padding: 10px;
    padding-top: 15px;
    padding-bottom: 25px;
    height: 55%;
    row-gap: 5%;
    flex-grow: 2;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    background-color: #e5e5e5;
  }

  .card  > * {
  padding: 5px 0;
}
  .card_title {
    font-weight: bold;
    color: #026b30;
  }
  .card_description {
    font-size: 16px;
  }
  img {
    
    width: 35%;
    height: auto;
  }

  progress {
  width: 80%; 
  height: 20px; 
}


progress[value]::-webkit-progress-bar {
  width: calc(100% * (attr(value) / attr(max)));
}


progress::-webkit-progress-bar {
  background-color: white;
  border-radius: 2px;
}


progress::-webkit-progress-value {
  background-color: #026b30;
  border-radius: 2px;
}
        
        
        
@keyframes progress-bar {
  0% { width: 0; }
  100% { width: 50%; }
}

progress[value]::-webkit-progress-bar {
  animation: progress-bar 1s ease-out;
}
</style>

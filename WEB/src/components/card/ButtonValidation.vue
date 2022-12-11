<script setup lang="ts">
  import { useCardStore } from '@/stores/card'
  import { useShowStore } from '@/stores/show'
  import { useWeightCardStore } from '@/stores/weightCard'
  import type User_response from '@/types/user_response'
  //import { useUser_ResponseStore } from '@/stores/user_response'
  //import { useUserStore } from '@/stores/user'
  import { computed } from 'vue'
  import user_ResponseRessource from '@/services/user_ResponseService'
  const store = useCardStore()
  const storeShow = useShowStore()
  const storeWeightCard = useWeightCardStore()
  //const storeAnswer = useUser_ResponseStore();

  const correctAnswer = () => {
    // Ajout de la réponse de l'utilisateur dans le tableau des réponses
    const user_response: User_response = {
      id_card: store.getActualCard()?.id,
      id_answer: 1
    }
    store.AddAnswer(user_response)

    // Enlever la carte trouvé ou presque trouvé
    store.removeCorrectCard(store.getActualCard())

    //Remplacer la carte par une autre
    const card = computed(() => store.getCurrentDeck())
    store.setActualCard(card.value[Math.floor(Math.random() * card.value.length)])
    // console.log(store.getActualCard())

    //decrémenter le nombre de carte restantes
    store.decrement()

    //switcher les boutons
    storeShow.setShowButtonReveal(true)
    storeShow.setShowAnswer(false)
    storeShow.setShowButtonValidation(false)
  }
  const almostCorrectAnswer = () => {
    // Ajout de la réponse de l'utilisateur dans le tableau des réponses
    const user_response = {
      id_card: store.getActualCard()?.id,
      id_answer: 2
    }

    store.AddAnswer(user_response)

    // Enlever la carte trouvé ou presque trouvé
    store.removeAlmostCorrectCard(store.getActualCard())

    //Remplacer la carte par une autre
    const card = computed(() => store.getCurrentDeck())
    store.setActualCard(card.value[Math.floor(Math.random() * card.value.length)])
    // console.log(store.getActualCard())

    //decrémenter le nombre de carte restantes
    store.decrement()

    //switcher les boutons
    storeShow.setShowButtonReveal(true)
    storeShow.setShowAnswer(false)
    storeShow.setShowButtonValidation(false)
  }

  const falseAnswer = () => {
    // Ajout de la réponse de l'utilisateur dans le tableau des réponses
    const user_response = {
      id_card: store.getActualCard()?.id,
      id_answer: 3
    }
    store.AddAnswer(user_response)

    //Remplacer la carte par une autre
    const card = computed(() => store.getCurrentDeck())
    store.setActualCard(card.value[Math.floor(Math.random() * card.value.length)])
    // console.log(store.getActualCard())

    //switcher les boutons
    storeShow.setShowButtonReveal(true)
    storeShow.setShowAnswer(false)
    storeShow.setShowButtonValidation(false)

    //Incrémenter son cota de carte raté
    //TODO: Le poids de la carte doit augmenter
    store.incrementWrongAnswers()
  }
</script>

<template>
  <!-- <Card /> -->
  <div class="container">
    <button
      class="btn"
      id="getAnswer"
      @click="
        () => {
          correctAnswer()

          //Incrémenter son cota de réponse correct
          //TODOLe poids de la carte doit diminuer
          store.incrementGoodAnswers()
          storeWeightCard.getWeightCards()
        }
      "
    >
      J'ai trouvé
    </button>
    <button
      id="almost"
      class="btn"
      @click="
        () => {
          almostCorrectAnswer()

          //incrémenter son cota de réponse presque trouvé(todo : faire une liaison avec le poids)
          //TODOLe poids de la carte doit rester le même
          // Le poids devra être lié a la carte de l'utilisateur
          // --> table avec l'id primaire de la carte et l'id de l'utilisateur + le poids de la carte
          //TODO : Récupérer l'id user et card qui constituront la clé primaire de la table
          store.incrementAlmostGoodAnswers()
        }
      "
    >
      J'y étais presque
    </button>
    <button
      id="noAnswer"
      class="btn"
      @click="falseAnswer"
    >
      Je ne savais pas
    </button>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
  .btn {
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
  }
  #getAnswer {
    background-color: #4caf50;
  }
  #almost {
    background-color: #ff9800;
  }
  #noAnswer {
    background-color: #f44336;
  }
</style>

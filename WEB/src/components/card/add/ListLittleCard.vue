<script setup lang="ts">
  import { useCardStore } from '@/stores/card'
  import LittleCard from '@/components/card/add/LittleCard.vue'
  import FlashcardService from '@/services/FlashcardService'
  const store = useCardStore()
  const sendToApi = () => {
    store.flashcardList.forEach(async (flashcard) => {
      const flashcardRequest = await FlashcardService.postFlashcard({
        word: flashcard.word,
        translation: flashcard.translation
      })
      // console.log(flashcardRequest.data)
      // une fois la reponse reçu, on peut envoyer l'image
      const flashcardImageRequest = await FlashcardService.uploadImage({
        id: flashcardRequest.data.id,
        image: flashcard.image
      })
      console.log(flashcardImageRequest)
    })
    // ! TODO: send image to api
    store.flashcardList = []
  }
</script>

<template>
  <div class="big-container">
    <h2 class="title">Mot ajoutés</h2>
    <div class="container">
      <p
        v-if="store.flashcardList.length === 0"
        id="notAdd"
      >
        Vous n'avez pas encore ajouté de mot <span id="emoji">🥺</span>
      </p>
      <div
        v-else="store.flashcardList.length !== 0"
        class="card"
        v-for="card in store.flashcardList"
        :key="card.id"
      >
        <LittleCard
          :id="card.id"
          :word="card.word!"
          :translation="card.translation"
          :url="card.url!"
        />
      </div>
    </div>
    <button
      class="btn"
      v-show="store.flashcardList.length > 0"
      @click="sendToApi"
    >
      Créer l'activité
    </button>
  </div>
</template>

<style scoped>
  .big-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    outline: 1px solid gray;
  }
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    background-color: #056b30;
    color: white;
    width: 100%;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    gap: 10px;
  }
  #notAdd {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    font-size: 1.5rem;
  }
  #emoji {
    font-size: 2.5rem;
  }
  .card {
    width: 150px;
    height: 200px;
    border: 1px solid black;
    border-radius: 10px;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
    background-color: #056b30;
    color: #fff;
    width: max-content;
    height: 40px;
  }
  .btn:hover {
    background-color: #000;
  }
</style>

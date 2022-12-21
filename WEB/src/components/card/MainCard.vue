<script setup lang="ts">
  import { useCardStore } from '@/stores/card'
  import { useShowStore } from '@/stores/show'
  import { computed, onMounted, onUpdated } from 'vue'
  import cheval from '@/assets/images/card/cheval.svg'

  import { useUserStore } from '@/stores/user'
  await useUserStore().checkUserAcess()

  const store = useCardStore()
  const storeShow = useShowStore()

  //Get the number of card choose by user
  const card = computed(() => store.getCurrentDeck())

  //choose random card inside the user deck
  const actualCard = computed(() => {
    if (card.value?.length > 0) {
      store.setActualCard(card.value[Math.floor(Math.random() * card.value.length)])
      return store.getActualCard()
    }
    return { id: 1, word: 'cheval', translation: 'horse', image: cheval }
  })

  onMounted(() => {
    console.log('inside onMounted')
    // console.log(card.value.tableCard)
    // actualCard = card.value.tableCard[Math.floor(Math.random() * card.value.tableCard.length)]
  })
  onUpdated(() => {
    // console.log('inside onUpdate')
    // actualCard = card.value.tableCard[Math.floor(Math.random() * card.value.tableCard.length)]
  })
</script>
<!-- 03 Parties : -->
<template>
  <div class="card-container">
    <div class="question">
      <!-- Doit être remplacer par le mot lors de la révélation -->
      <p v-if="!storeShow.getShowAnswer()">Comment dit-on ?</p>
      <p v-else>Bonne Réponse</p>
    </div>
    <div class="card">
      <!-- Réponse de la carte avec une image éventuelle -->
      <div class="word-answer">
        <p v-if="storeShow.getShowAnswer()">{{ actualCard?.translation }}</p>
        <p v-else>{{ actualCard?.word }}</p>
      </div>
      <div
        class="image-answer"
        v-show="actualCard?.image"
      >
        <img
          class="image-answer-reveal"
          :src="actualCard?.image!"
          alt=""
        />
      </div>
    </div>
    <button
      class="reveal"
      v-show="storeShow.getShowButtonReveal()"
      @click="
        () => {
          storeShow.setShowAnswer(true)
          storeShow.setShowButtonReveal(false)
          storeShow.setShowButtonValidation(true)
        }
      "
    >
      Réveler
    </button>
  </div>
</template>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    border: solid rgba(0, 0, 0, 0.3) 2px;
    background-color: rgba(0, 0, 0, 0.03);
    width: 350px;
    height: auto;
    box-shadow: inset;
    border-radius: 15px;
    padding: 25px 10px;
  }

  .word-answer {
    /* border: solid red 1px; */
    color: #74ac8c;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 25px;
  }
  .answer {
    display: none;
  }
  .image-answer {
    /* border: solid red 1px; */
    width: 100%;
    height: 270px;
    margin-top: 25px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .image-answer-reveal {
    /* border: solid blue 1px; */
    width: 100%;
    height: 100%;
    object-fit: contain;
    overflow: hidden;
  }
  .question {
    /* border: solid red 1px; */
    margin: 15px 0;
    padding-left: 10px;
    font-size: 25px;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
  }
  .answer {
    /* border: solid black 1px; */
    text-align: left;
    margin: 20px 0;
    padding-left: 10px;
  }
  .response {
    /* border: solid green 1px ;   */
    margin: 15px 0;
  }
  .reveal {
    /* background: #ed1b0d; */
    color: #40dd84;
    border: solid #40dd84 2.5px;
    padding: 10px 10px;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    margin-top: 30px;
    width: 100%;
    font-size: 18px;
    font-weight: bolder;
    text-align: center;
    /* position: absolute;
  bottom: 20px;
  right: 25px; #c5dece*/
  }
  .reveal:hover {
    color: #40ef84;
    border: solid #40ef84 2.5px;
  }
  @media (max-width: 768px) {
    .card {
      width: 100%;
      margin: 0;
    }
    .card-container {
      width: 260px;
    }
    .reveal {
      position: absolute;
      bottom: 15px;
      /* margin: 0 auto; */
      right: 0;
      left: 0;
      margin-left: auto;
      margin-right: auto;
      width: 60%;
    }
    .question {
      /* border: solid red 1px; */
      margin: 15px 0;
      padding-left: 0;
      font-size: 25px;
      color: rgba(0, 0, 0, 0.5);
      text-align: center;
    }
    .word-answer {
      /* border: solid red 1px; */
      color: #74ac8c;
      font-weight: bold;
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 25px;
    }
    .image-answer {
      /* border: solid red 1px; */
      width: 100%;
      height: auto;
      margin-top: 0;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media (max-width: 615px) {
    .card-container {
      width: 210px;
    }
  }
</style>

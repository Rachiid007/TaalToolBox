<script setup lang="ts">
  import { ref } from 'vue'
  import { useCardStore } from '@/stores/card'
  import { computed } from '@vue/reactivity'
  const store = useCardStore()
  const correctAnswer = computed(() => store.goodAnswers)
  const almostCorrectAnswer = computed(() => store.almostGoodAnswers)
  const wrongAnswer = computed(() => store.wrongAnswers)
  const totalScore = computed(() => store.goodAnswerPercentage)

  const correctColor = ref('#4caf50')
  const almostCorrectColor = ref('#ff9800')
  const wrongColor = ref('#f44336')
</script>

<template>
  <div class="container">
    <div class="header">
      <h1
        v-if="totalScore > 50"
        class="correct"
      >
        Félicitation !
      </h1>
      <h1
        v-else
        class="wrong"
      >
        Vous pouvez mieux faire !
      </h1>
      <p
        v-if="totalScore > 50"
        class="correct"
      >
        Vous avez complété le niveau !
      </p>
      <p
        v-else
        class="wrong"
      >
        Vous n'avez pas complété le niveau !
      </p>
    </div>
    <hr />
    <div class="result">
      <div class="result__item correct">
        <div class="logo-label">
          <i class="fa-solid fa-check" />
          <p class="result__item__title">J'ai trouvé :</p>
        </div>
        <p class="result__item__value">{{ correctAnswer }}</p>
      </div>

      <div class="result__item almost">
        <div class="logo-label">
          <i class="fa-solid fa-exclamation" />
          <p class="result__item__title">J'y étais présque :</p>
        </div>
        <p class="result__item__value">{{ almostCorrectAnswer }}</p>
      </div>

      <div class="result__item wrong">
        <div class="logo-label">
          <i class="fa-solid fa-times" />
          <p class="result__item__title">Je ne savais pas :</p>
        </div>
        <p class="result__item__value">{{ wrongAnswer }}</p>
      </div>
    </div>
    <hr />
    <div class="score">
      <p>
        Votre score est de <span id="total-score">{{ totalScore }}</span> points !
      </p>
    </div>
    <div class="btn-container">
      <router-link to="/">
        <button class="btn-return">Retour à la carte</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .container {
    max-width: 350px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .header h1 {
    font-weight: bold;
    font-size: 26px;
  }

  .result {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .result__item {
    display: flex;
    flex-direction: raw;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    width: 100%;
  }

  .logo-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-label i {
    width: 25px;
  }

  .correct {
    color: v-bind(correctColor);
  }

  .almost {
    color: v-bind(almostCorrectColor);
  }

  .wrong {
    color: v-bind(wrongColor);
  }

  .score p {
    text-align: center;
  }

  #total-score {
    font-weight: bold;
    color: v-bind(correctColor);
  }

  .btn-return {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: v-bind(correctColor);
    color: white;
    font-weight: bold;
    cursor: pointer;
  }

  .btn-return:hover {
    background-color: #1e7eb8;
  }

  hr {
    border: 1px solid black;
    margin: 10px 0;
  }
</style>

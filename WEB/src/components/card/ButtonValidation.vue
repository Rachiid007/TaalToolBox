<script setup lang="ts">
  import { useCardStore } from '@/stores/card'
  const store = useCardStore()

  const decreaseRemaining = () => {
    store.decrement()
  }

  const getAnswer = () => {
    console.log('getAnswer')
    store.incrementGoodAnswers()
    decreaseRemaining()
  }

  const almost = () => {
    console.log('almost')
    store.incrementAlmostGoodAnswers()
    decreaseRemaining()
  }

  const noAnswer = () => {
    console.log('noAnswer')
    store.incrementWrongAnswers()
    decreaseRemaining()
  }
</script>

<template>
  <!-- <Card /> -->
  <div class="container">
    <button
      class="btn"
      id="getAnswer"
      @click="getAnswer"
    >
      J'ai trouvé
    </button>
    <button
      id="almost"
      class="btn"
      @click="almost"
    >
      J'y étais presque
    </button>
    <button
      id="noAnswer"
      class="btn"
      @click="noAnswer"
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

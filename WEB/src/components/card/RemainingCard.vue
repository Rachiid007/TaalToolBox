<script setup lang="ts">
  import { useCardStore } from '@/stores/card'
  import { computed } from 'vue'
  const store = useCardStore()

  const remaining = computed(() => store.remaining)

  const monTab = computed(() => {
    let myArray = []
    if (remaining.value <= 8) {
      for (let i = 0; i < remaining.value; i++) {
        myArray.push({
          card: i,
          offsetLeft: i * 7
        })
      }
    } else {
      for (let i = 0; i < 8; i++) {
        myArray.push({
          card: i,
          offsetLeft: i * 7
        })
      }
    }

    return myArray
  })
</script>

<template>
  <div class="remaining-container">
    <div class="title">
      <!-- Doit être remplacer par le mot lors de la révélation -->
      <p>Cartes restantes</p>
    </div>
    <div class="contain">
      <div
        class="card"
        v-for="index in monTab"
        :key="index.card"
        :style="{ left: index.offsetLeft + 'px' }"
      >
        {{ remaining }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .remaining-container {
    /* border: solid black 1px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 600px;
  }
  .contain {
    /* border: solid red 1px; */
    position: relative;
    display: flex;
    width: 250px;
    height: 300px;
    justify-content: center;
    align-items: center;
  }
  .title {
    /* border: solid red 1px; */
    /* margin: 15px 0; */
    padding-left: 10px;
    font-size: 25px;
    color: rgba(0, 0, 0, 0.5);
  }
  .card {
    height: 230px;
    width: 190px;
    border-radius: 15px;
    border: 1px solid black;
    background-color: white;
    position: absolute;
    /* top: 0; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: bold;
    color: green;
  }

  .card:last-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: bold;
    color: green;
  }
  @media (max-width: 768px) {
    .remaining-container {
      /* border: solid black 1px; */
      position: relative;
      height: 300px;
      width: 150px;
    }
    .contain {
      width: 150px;
      /* border: solid green 1px; */
    }
    .card {
      width: 100px;
      height: 150px;
    }
  }
</style>

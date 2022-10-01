<script setup lang="ts">
import { useCardStore } from '../stores/card'
import { computed } from 'vue'
const store = useCardStore()

const monTab = computed(() => {
  let myArray = []
  for (let i = 0; i < store.remaining; i++) {
    myArray.push({
      card: i,
      offsetLeft: i * 7
    })
  }
  return myArray
})
</script>

<template>
  <div class="container">
    <div
      class="card"
      v-for="index in monTab"
      :key="index.card"
      :style="{ left: index.offsetLeft + 'px' }"
    ></div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
}

.card {
  height: 230px;
  width: 190px;
  border-radius: 15px;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  top: 0;
}

.card:last-of-type:before {
  content: '5';
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 50px;
  font-weight: bold;
  color: green;
}
</style>

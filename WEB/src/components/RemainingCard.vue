<script setup lang="ts">
import { useCardStore } from '../stores/card'
import { computed } from 'vue'
const store = useCardStore()

const remaining = computed(() => store.remaining)

const monTab = computed(() => {
  let myArray = []
  for (let i = 0; i < remaining.value; i++) {
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
    >
      {{ remaining }}
    </div>
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
</style>

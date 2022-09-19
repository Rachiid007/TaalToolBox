<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- Hello word component -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <p class="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
      <p class="text-gray-500 text-lg">Vue 3 and Tailwind CSS ready</p>
    </div>
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'

import { defineComponent } from 'vue'

// export le composant principale et les composants qu'ils utilisent
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
})
</script>

<style></style>

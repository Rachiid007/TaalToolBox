<script setup lang="ts">
  import Dragndrop from '@/components/testDragNDrop/dragndrop.vue'
  import TheHeaderDnd from '@/components/TheHeaderDragNDrop.vue'
  import { ref } from 'vue'

  const test = ref()
  setTimeout(function () {
    test.value.style.display = 'none'
  }, 4000)
</script>

<template>
  <div class="page">
    <div
      ref="test"
      class="showup"
    >
      <img src="@/assets/logo/dalcard.svg" />
      <p class="loading">Loading activity ...</p>
    </div>
    <div>
      <TheHeaderDnd />
      <Dragndrop />
    </div>
  </div>
</template>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
  }
  .showup {
    position: absolute;
    width: 100%;
    max-width: 1600px;
    height: 100vh;
    background-color: white;
    display: flex;
    gap: 25px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: fadeOut 2s ease 2.5s;
    animation-fill-mode: forwards;
    z-index: 10;
  }
  img {
    border: 3px solid grey;
    padding: 22px 15px 22px 15px;
    border-radius: 15px;
    height: auto;
    width: 12%;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 6px 0px;
    animation: fadeIn 1.5s ease 0s;
  }
  .loading {
    font-size: 1.2em;
    font-weight: bold;
    color: #00307e;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 100%;
      display: none;
    }
    100% {
      opacity: 0%;
      display: none;
    }
  }
</style>

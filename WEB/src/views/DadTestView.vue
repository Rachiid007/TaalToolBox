<script setup lang="ts">
  import Dragndrop from '@/components/testDragNDrop/DragNDrop.vue'
  import TheHeader from '@/components/TheHeader.vue'
  import { ref } from 'vue'

  const loading = ref()
  setTimeout(function () {
    loading.value.style.display = 'none'
  }, 4000)
</script>

<template>
  <div class="page">
    <div
      ref="loading"
      class="showup"
    >
      <img
        class="loadingLogo"
        src="@/assets/logo/dalcard.svg"
      />
      <p class="loading">Chargement de l'activité ...</p>
    </div>
    <div>
      <TheHeader>
        <div class="title">
          <img
            class="headerLogo"
            src="@/assets/logo/dragandlearn.svg"
            alt="drag and drop gamemode logo"
          />
        </div>
      </TheHeader>
      <Dragndrop />
    </div>
  </div>
</template>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
    overflow-x: hidden;
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .headerLogo {
    height: 60px;
    width: auto;
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
  .loadingLogo {
    border: 3px solid grey;
    padding: 22px 15px 22px 15px;
    border-radius: 15px;
    height: auto;
    width: 15%;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 6px 0px;
    animation: fadeIn 1.5s ease 0s;
  }
  .loading {
    font-size: 1.2em;
    font-weight: bold;
    color: #00307e;
    position: relative;
  }
  .loading::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 9%;
    right: 0%;
    background: white;
    animation: horizontalSequence 1.5s ease 2;
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
  @keyframes horizontalSequence {
    0% {
      width: 9%;
    }
    33% {
      width: 6%;
    }
    66% {
      width: 3%;
    }
    100% {
      width: 0%;
    }
  }
</style>

<script setup lang="ts"></script>

<template>
  <img
    class="loadingLogo"
    src="@/assets/logo/dalcard.svg"
  />
  <p class="loading">Chargement de l'activité ...</p>
</template>

<style scoped>
  .loadingLogo {
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

  @media (max-width: 750px) {
    .loadingLogo {
      border: 2px solid grey;
      padding: 10px 5px 10px 5px;
      border-radius: 10px;
      height: auto;
      width: 40%;
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 6px 0px;
      animation: fadeIn 1.5s ease 0s;
    }
  }
</style>

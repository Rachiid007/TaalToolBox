<script setup lang="ts">
  import addCardForm from '@/components/addCardForm.vue'
  // import LittleCard from '@/components/LittleCard.vue'
  // import LeCheval from '@/assets/images/cheval.svg'

  // import { ref } from 'vue'

  // const word = ref('Le cheval')
  // const translation = ref('Het paard')

  import AllCard from '@/components/AllCard.vue'
</script>

<template>
  <!-- <little-card
    :word="word"
    :translation="translation"
    :image="LeCheval"
  /> -->
  <div class="container-view">
    <add-card-form id="add-card-form" />
    <all-card id="all-card" />
  </div>
</template>

<style scoped>
  .container-view {
    display: flex;
    width: 100%;
    max-width: 1400px;
    height: auto;
    gap: 0 20px;
    margin: 0 auto;
  }

  #add-card-form {
    width: 30%;
  }

  #all-card {
    width: 70%;
  }
</style>

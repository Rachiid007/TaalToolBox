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
  <div class="container">
    <add-card-form id="add-card-form" />
    <all-card id="all-card" />
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    width: 100%;
    max-width: 1400px;
    height: auto;
    border: 1px solid rgb(207, 27, 27);
    gap: 20px;
  }

  #add-card-form {
    width: 30%;
  }

  #all-card {
    width: 70%;
  }
</style>

<script setup lang="ts">
  import addCardForm from '@/components/card/add/addCardForm.vue'
  import MainHeader from '@/components/headers/MainHeader.vue'
  import AllCard from '@/components/card/add/AllCard.vue'
  import { useUserStore } from '@/stores/user'

  const userStore = useUserStore()
  // import LittleCard from '@/components/LittleCard.vue'
  // import LeCheval from '@/assets/images/cheval.svg'

  // import { ref } from 'vue'

  // const word = ref('Le cheval')
  // const translation = ref('Het paard')
</script>

<template>
  <!-- <little-card
    :word="word"
    :translation="translation"
    :image="LeCheval"
  /> -->
  <div v-if="!userStore.user.role.length">
    <GuestHeader />
  </div>
  <div v-else-if="'Administrateur' in userStore.user.role">
    <MainHeader />
  </div>
  <div v-else-if="'Elève' in userStore.user.role">
    <StudentHeader />
  </div>
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
    margin: 30px auto 0;
  }

  #add-card-form {
    width: 30%;
  }

  #all-card {
    width: 70%;
  }
</style>

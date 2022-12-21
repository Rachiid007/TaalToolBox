<script setup lang="ts">
  import AddCardForm from '@/components/card/add/AddCardForm.vue'
  import MainHeader from '@/components/headers/MainHeader.vue'
  import AllCard from '@/components/card/add/ListLittleCard.vue'
  import { useUserStore } from '@/stores/user'
  await useUserStore().checkUserAccessAndRole(['Administrateur', 'Créateur'])
</script>

<template>
  <div class="page">
    <MainHeader />
    <div class="container-view">
      <AddCardForm id="add-card-form" />
      <AllCard id="all-card" />
    </div>
  </div>
</template>

<style scoped>
  .page {
    /* border : solid red 1px ;  */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
    padding-top: 80px;
  }
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

<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import choiceHowToAddCard from '@/components/card/add/choiceHowToAddCard.vue'
  import { useUserStore } from '@/stores/user'

  const useStore = useUserStore()
</script>

<template>
  <div class="page">
    <MainHeader />
    <choice-how-to-add-card />
    <RouterView />
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
</style>

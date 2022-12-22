<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import ChoiceHowToAddCard from '@/components/card/add/ChoiceHowToAddCard.vue'
  import { useUserStore } from '@/stores/user'
  const userStore = useUserStore()
</script>

<template>
  <div class="page">
    <MainHeader />
    <ChoiceHowToAddCard />
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

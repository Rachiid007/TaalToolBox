<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import choiceHowToAddUser from '@/components/users/choiceHowToAddUser.vue'
  import { useUserStore } from '@/stores/user'

  const useStore = useUserStore()
</script>

<template>
  <div class="page">
    <MainHeader />
    <choice-how-to-add-user />
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

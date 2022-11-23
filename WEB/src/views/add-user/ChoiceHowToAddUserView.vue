<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import ChoiceHowToAddUser from '@/components/users/add/ChoiceHowToAddUser.vue'
</script>

<template>
  <div class="page">
    <MainHeader />
    <ChoiceHowToAddUser />
  </div>
</template>

<style scoped>
  .page {
    /* border : solid red 1px ;  */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
  }
</style>

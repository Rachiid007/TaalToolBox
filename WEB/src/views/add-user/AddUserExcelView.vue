<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import AddUserExcel from '@/components/users/AddUserExcel.vue'
</script>

<template>
  <div class="page">
    <MainHeader />
    <AddUserExcel />
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

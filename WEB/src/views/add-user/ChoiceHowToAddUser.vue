<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import choiceHowToAddUser from '@/components/users/ChoiceHowToAddUser.vue'
</script>

<template>
  <div class="page">
    <Suspense>
      <MainHeader />
    </Suspense>
    <Suspense>
      <choiceHowToAddUser />
    </Suspense>
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

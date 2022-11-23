<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import Greetings from '@/components/Greetings.vue'
  import { useUserStore } from '@/stores/user'

  const userStore = useUserStore()
</script>

<template>
  <div class="page">
    <MainHeader />
    <Greetings />
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

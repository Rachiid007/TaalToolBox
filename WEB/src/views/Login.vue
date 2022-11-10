<script setup lang="ts">
  import Login from '@/components/Login.vue'
  import MainHeader from '@/components/headers/MainHeader.vue'
  import { useUserStore } from '@/stores/user';

  const userStore = useUserStore()

</script>

<template>
  <div class="HomePage">
    <MainHeader />
    <Login />
  </div>
</template>

<style scoped>
  .HomePage {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

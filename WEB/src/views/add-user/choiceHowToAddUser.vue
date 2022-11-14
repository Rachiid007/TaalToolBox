<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import choiceHowToAddUser from '@/components/users/choiceHowToAddUser.vue'
  import { useUserStore } from '@/stores/user';

  const useStore = useUserStore()
</script>

<template>
  <MainHeader />
  <choice-how-to-add-user />
  <RouterView />
</template>

<style scoped></style>

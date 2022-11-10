<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import choiceHowToAddCard from '@/components/card/add/choiceHowToAddCard.vue'
  import { useUserStore } from '@/stores/user';

  const useStore = useUserStore()
</script>

<template>
  <MainHeader />
  <choice-how-to-add-card />
  <RouterView />
</template>

<style scoped></style>

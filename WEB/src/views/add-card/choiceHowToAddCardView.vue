<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import choiceHowToAddCard from '@/components/card/add/choiceHowToAddCard.vue'
</script>

<template>
  <MainHeader />
  <choice-how-to-add-card />
  <RouterView />
</template>

<style scoped></style>

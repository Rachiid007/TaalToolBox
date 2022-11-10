<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import choiceHowToAddCard from '@/components/card/add/choiceHowToAddCard.vue'
  import GuestHeader from '@/components/headers/GuestHeader.vue';
  import StudentHeader from '@/components/headers/StudentHeader.vue';

  import { useUserStore } from '@/stores/user';
  const userStore = useUserStore()
</script>

<template>
  <div v-if="!userStore.user.role.length">
      <GuestHeader />
    </div>
    <div v-else-if="'Administrateur' in userStore.user.role">
      <MainHeader />
    </div>
    <div v-else-if="'Elève' in userStore.user.role">
      <StudentHeader />
    </div>
  <choice-how-to-add-card />
  <RouterView />
</template>

<style scoped></style>

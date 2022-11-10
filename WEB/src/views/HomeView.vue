<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import GuestHeader from '@/components/headers/GuestHeader.vue'
  import Greetings from '@/components/Greetings.vue'
  import StudentHeader from '@/components/headers/StudentHeader.vue'
  import { useUserStore } from '@/stores/user'

  const userStore = useUserStore()
</script>

<template>
  <div class="page">
    <div v-if="!userStore.user.role.length">
      <GuestHeader />
    </div>
    <div v-if="'Administrateur' in userStore.user.role">
      <MainHeader />
    </div>
    <div v-if="'Elève' in userStore.user.role">
      <StudentHeader />
    </div>
    <Greetings />
  </div>
</template>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
  }
</style>

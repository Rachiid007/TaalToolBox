<script setup lang="ts">
  import SignIn from '../components/SignIn.vue'
  import MainHeader from '../components/headers/MainHeader.vue'
  import { useUserStore } from '@/stores/user'

  const userStore = useUserStore()
  // return {
  //   name: 'login',
  //   components: {
  //     SignIn,
  //     MainHeader
  //   }
  // }
</script>

<template>
  <div class="HomePage">
    <div v-if="!userStore.user.role.length">
      <GuestHeader />
    </div>
    <div v-else-if="'Administrateur' in userStore.user.role">
      <MainHeader />
    </div>
    <div v-else-if="'Elève' in userStore.user.role">
      <StudentHeader />
    </div>
    <SignIn />
  </div>
</template>

<style scoped>
  .HomePage {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

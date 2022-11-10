<script setup lang="ts">
  import Login from '@/components/Login.vue'
  import MainHeader from '@/components/headers/MainHeader.vue'
  import GuestHeader from '@/components/headers/GuestHeader.vue'
  import { useUserStore } from '@/stores/user'
  import StudentHeader from '@/components/headers/StudentHeader.vue'
  const userStore = useUserStore()
  // export default {
  //   name: 'login',
  //   components: {
  //     Login,
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

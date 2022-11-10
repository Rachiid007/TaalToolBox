<script setup lang="ts">
  import AdminHeader from '@/components/headers/AdminHeader.vue'
  import GuestHeader from '@/components/headers/GuestHeader.vue'
  import { useUserStore } from '@/stores/user'
  import StudentHeader from '@/components/headers/StudentHeader.vue'
  const userStore = useUserStore()
</script>
<template>
  <div v-if="userStore.user.role.includes('Administrateur')">
    <AdminHeader />
  </div>
  <div v-else-if="userStore.user.role.includes('Elève')">
    <StudentHeader />
  </div>
  <div v-else>
    <GuestHeader />
  </div>
</template>
<style scoped>
  @import './header.css';
</style>

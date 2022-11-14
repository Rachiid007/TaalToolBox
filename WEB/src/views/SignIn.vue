<script setup lang="ts">
  import SignIn from "../components/SignIn.vue"
  import MainHeader from "../components/headers/MainHeader.vue"
  import { useUserStore } from "@/stores/user";
  const store = useUserStore()
</script>

<template>
    <div class="HomePage">
      <MainHeader />
      <SignIn />
    </div>
</template>

<style scoped>
   .HomePage{
    display: flex;
    flex-direction: column;
    align-items: center;
   }
</style>
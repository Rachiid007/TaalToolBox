<script lang="ts">
  import Login from "../components/Login.vue"
  import MainHeader from "../components/MainHeader.vue"

  export default {
    name: "login",
    components: {
        Login,
        MainHeader
    }
  }
</script>

<template>
    <div class="HomePage">
      <MainHeader />
      <Login />
    </div>
</template>

<style scoped>
   .HomePage{
    display: flex;
    flex-direction: column;
    align-items: center;
   }
</style>
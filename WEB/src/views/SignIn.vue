<script lang="ts">
  import SignIn from "../components/SignIn.vue"
  import MainHeader from "../components/MainHeader.vue"

  export default {
    name: "login",
    components: {
        SignIn,
        MainHeader
    }
  }
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
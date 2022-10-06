<script lang="ts">
    import UserLogin from '../components/UserLogin.vue'

    export default {
    name: 'Login',
    components: {
      UserLogin
      // Container
    }
  }
</script>

 

<template>
<div class="page">
  <UserLogin/>
</div>  
</template>

<style>
.page{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

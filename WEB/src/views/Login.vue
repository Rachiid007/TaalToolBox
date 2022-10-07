<script lang="ts">
    import Login from '../components/Login.vue'

    export default {
    name: 'login',
    components: {
      Login
      // Container
    }
  }
</script>

 

<template>
<div class="page">
  <Login/>
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

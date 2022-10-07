<script lang="ts">
    import SignIn from '../components/SignIn.vue'

    export default {
    name: 'signIn',
    components: {
      SignIn
      // Container
    }
  }
</script>

 

<template>
<div class="page">
  <SignIn/>
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

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
  <div class="main">
    <div class="title">
      <p class="activity_name">Connexion/Inscription</p>
    </div>
  </div>
<div class="container2">
  <div class="globalBorder">
    <div class="borderTop">
       <p class="connection">Connection</p>
       <p class="inscription">Inscription</p> 
    </div> 
  </div>
  <div class="generalBorder">
    <div class="title-image">
        <img src="../assets/logoProjet.png" class="image">
        <p class="logoName">TaalToolBox</p>
    </div>
  </div>
  <div class="form">
      <div>
      <label class="email" for="email">Email:</label>
      <input type=" text" id = "email" name="email">
      </div>
      <div>
      <label class="motDePasse" for="mot-de-passe">Mot de passe:</label>
      <input type=" text" id = "mot-de-passe" name="mot-de-passe">
      </div>
    </div>
</div>
</template>

<style>
    .container2{
        padding: 38px;
    }
    .main {
    width: 100vw;
    max-width: 1600px;
    border-bottom: 1px solid #707070;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .activity_name {
    /* font-family: 'Courier New', monospace; */
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: grey;
    /* #026b30; */
    font-weight: 400;
    font-size: 1.8em;
  }

  .globalBorder{
    /* padding: 38px; */
    display: flex;
    justify-content: center;
    align-items: center; 
  }
  .borderTop{
    /* border: solid 1px black;
    padding: 6px; */
    display: flex;
    flex-direction: row;
    align-items: center;
  }
   .connection {
     border: solid 1px black;
     padding: 6px;
     color: white;
     background-color: #026b30;
     padding-left:100px ;
     padding-right:100px;
     font-size: 1.5em;
   }
   .inscription {
     border: solid 1px black;
     color: grey;
     padding:6px;
     padding-left:100px ;
     padding-right:100px;
     font-size: 1.5em;
   }
   .generalBorder{
    display: flex;
    justify-content: center;
    align-items: center;
   }

   .title-image{
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
   }

   .image{
    /* display: flex;
    justify-content: center;
    align-items: center; */
     width: 50px;
   }

   .logoName{
    font-family: Segoe print;
    padding-right: 10px;
   }

</style>

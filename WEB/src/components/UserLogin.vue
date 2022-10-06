<script lang="ts">
  

</script>



<template>
<!-- <div class="main">
  <div class="title">
    <p class="activity_name">Connexion/Inscription</p>
  </div>
</div> -->
<div class="main">
  <div class="title">
      <p id="connection" class="connectInscri">Connection</p>
      <p id="inscription" class="connectInscri">Inscription</p>  
  </div>
  <div class="content">
    <div class="title-image">
        <img src="../assets/logoProjet.png" class="image">
        <p class="logoName">TaalToolBox</p>
    </div>
    <div class="fields">
      <form>
        <div class="firstDiv">
          <input type="text" placeholder="Nom">
          <input type="text" placeholder="Prénom">
        </div>
        <div class="secondDiv">
          <input type="text" placeholder="Mail">
          <input type="text" placeholder="Mot de passe">
          <input type="text" placeholder="Confirmer le mot de passe">
        </div>
      </form>
    </div>

    <div class="buttons">
      <button>Précédent</button>
      <button>Suivant</button>
    </div>
  </div>
</div>

</template>

<style>
  .container2{
      padding: 38px;
  }
  .main {
  /* width: 100vw; */
  /* max-width: 1600px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid grey 1px;
}

.title {
  display: flex;
  flex-direction: row;
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
 .connectInscri {
    
   border-bottom: solid 1px grey;
   padding: 6px;
   padding-left:100px ;
   padding-right:100px;
   font-size: 1.5em;
 }

 #connection {
  background-color : #026b30;
  color: white;
 }

 #inscription {
  background-color:  white;
  color: grey;
 }

 .content{
  display: flex;
  flex-direction: column;
  align-items: center;
 }

 .firstDiv{
  display: flex;
  flex-direction: row;
 }

 .secondDiv{
  display: flex;
  flex-direction: column;
 }

 .buttons{
  gap: 50%;
  display: flex;
  flex-direction: row;
  align-self: center;
 }

 input{
  border: solid 1px grey;
  outline: none;
  color: #026b30;
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

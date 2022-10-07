<script lang="ts">
  

</script>



<template>
<div class="main">
  <div class="title">
      <p id="connection2" class="connectInscri">Connection</p>
      <p id="inscription2" class="connectInscri">Inscription</p>  
  </div>
  <div class="content">
    <div class="title-image">
        <img src="../assets/logoProjet.png" class="image">
        <p class="logoName">TaalToolBox</p>
    </div>
    <div class="fields">
      <form class="form">
        <div class="fields-connection">
          <input type="text" placeholder="Mail">
          <input type="text" placeholder="Mot de passe">
        </div>
      </form>
    </div>
    <div class="buttons">
      <button id="suivant" class="clickButton">Se connecter</button>
    </div>
  </div>
</div>

</template>

<style>
  .container2{
      padding: 38px;
  }
  .main {
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
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: grey;
  font-weight: 400;
  font-size: 1.8em;
}

.globalBorder{
  display: flex;
  justify-content: center;
  align-items: center; 
}
.borderTop{
  display: flex;
  flex-direction: row;
  align-items: center;
}
 .connectInscri {
   border-bottom: solid 1px grey;
   padding: 10px;
   padding-left:100px ;
   padding-right:100px;
   font-size: 1.5em;
 }

 #connection2 {
  background-color : #026b30;
  color: white;
 }

 .content{
  display: flex;
  flex-direction: column;
  align-items: center;
 }
  
 .fields-connection{
  gap: 25px;
  display: flex;
  flex-direction: column;
 }

 .buttons{
  padding-bottom: 10% ;
  padding-top: 10%;
  gap: 200px;
  display: flex;
  flex-direction: row;
  align-self: center;
 }

 .clickButton{
  border: solid 1px black;
  margin: 5px;
  border-radius: 5px;
  font-size: 15px;
  width: 100px;
  height: 40px;
 }

 #precedent{
  border: solid grey 1px;
  color: grey
 }

 #suivant{
  color: white;
  background-color: #026b30;
 }

 input[type="text"] {
				color: #026b30;
				padding: 2px;
				border-radius: 5px;
				outline: none;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 2px 4px -2px;
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

 .form{
  display: flex;
  flex-direction: column;
  gap: 15px;
 }

 .image{
   width: 50px;
 }

 .logoName{
  font-family: Segoe print;
  padding-right: 10px;
 }

</style>

<script lang="ts"></script>

<template>
  <!-- <div class="main">
  <div class="title">
    <p class="activity_name">Connexion/Inscription</p>
  </div>
</div> -->
  <div class="main">
    <div class="content">
      <div class="title-image">
        <img src="../assets/logo/logoProjet.png" class="image" />
        <p class="logoName">TaalToolBox</p>
      </div>
      <div class="fields">
        <form class="form">
          <div class="firstDiv">
            <input class="firstFields" type="text" placeholder="Nom" />
            <input class="firstFields" type="text" placeholder="Prénom" />
          </div>
          <div class="secondDiv">
            <input class="secondFields" type="text" placeholder="Mail" />
            <input class="secondFields" type="text" placeholder="Mot de passe" />
            <input class="secondFields" type="text" placeholder="Confirmer le mot de passe" />
          </div>
        </form>
      </div>
      <div class="buttons">
        <button id="precedent" class="clickButton">Précédent</button>
        <button id="suivant" class="clickButton">Suivant</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container2 {
  padding: 38px;
}
.main {
  /* width: 100vw; */
  /* max-width: 1600px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: solid grey 1px; */
}

.title {
  display: flex;
  flex-direction: row;
}

.activity_name {
  /* font-family: 'Courier New', monospace; */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: grey;
  /* #026b30; */
  font-weight: 400;
  font-size: 1.8em;
}

.globalBorder {
  /* padding: 38px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.borderTop {
  /* border: solid 1px black;
  padding: 6px; */
  display: flex;
  flex-direction: row;
  align-items: center;
}
.connectInscri {
  border-bottom: solid 1px grey;
  padding: 6px;
  padding-left: 100px;
  padding-right: 100px;
  font-size: 1.5em;
}

#connection {
  background-color: white;
  color: grey;
}

#inscription {
  background-color: #026b30;
  color: white;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.firstDiv {
  gap: 25px;
  color: #026b30;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.secondDiv {
  gap: 25px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  margin-left: 73px;
  align-items: center;
}

.buttons {
  padding-bottom: 7%;
  padding-top: 7%;
  gap: 108px;
  display: flex;
  flex-direction: row;
  align-self: center;
}

.clickButton {
  border: none;
  margin: 5px;
  border-radius: 5px;
  font-size: 18px;
  width: 85px;
  height: 40px;
}

#precedent {
  border: solid grey 2px;
  color: grey;
}

#suivant {
  color: white;
  background-color: #026b30;
}

input[type='text'].secondFields  {
  color: #026b30;
  width: 80%;
  padding: 2px;
  border-radius: 5px;
  outline: none;
  margin-right: 20%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 2px 4px -2px;
}

input[type='text'].firstFields  {
  width: 30%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 2px 4px -2px;
  border-radius: 5px;
  padding: 2px;
}

input::placeholder {
  color: #026b30;
  opacity: 1;
}
.generalBorder {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-image {
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5%;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.image {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  width: 50px;
}

.logoName {
  font-family: Segoe print;
  /* padding-right: 10px; */
  color: #707070;
  font-size: 1.5em;
}
</style>

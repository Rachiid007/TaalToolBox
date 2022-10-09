<script lang="ts">
export default {}
</script>

<template>
  <div class="main">
    <div class="content">
      <div class="title-image">
        <img src="../assets/logo/logo.svg" class="image" />
        <p class="logoName">TaalToolBox</p>
      </div>
      <div class="fields2">
        <form class="form">
          <div class="fields-connection">
            <input class="mailPass" type="text" placeholder="Mail" />
            <input class="mailPass" type="text" placeholder="Mot de passe" />
          </div>
        </form>
      </div>
      <div class="buttonConnect">
        <button id="suivant" class="clickButton2">Se connecter</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container2 {
  padding: 38px;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: solid grey 1px; */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fields-connection {
  gap: 40px;
  display: flex;
  flex-direction: column;
}

.buttonConnect {
  padding-bottom: 15%;
  padding-top: 15%;
  gap: 200px;
  display: flex;
  flex-direction: row;
  align-self: center;
}

.clickButton2 {
  border: solid 1px black;
  margin: 5px;
  border-radius: 5px;
  font-size: 15px;
  width: 100px;
  height: 40px;
}

#precedent {
  border: solid grey 1px;
  color: grey;
}

#suivant {
  color: white;
  background-color: #026b30;
}

input {
  color: #026b30;
  width: 100%;
  border-radius: 5px;
  padding: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 2px 4px -2px;
  outline: none;
}

input[type='text'].mailPass {
  padding: 4px;
  margin-right: 100px;
  /* margin-left: 50px; */
}

input::placeholder {
  color: #026b30;
}

.title-image {
  padding-top: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2%;
  width: 100%;
}

.image {
  width: 10%;
  height: auto;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 100px;
}

.logoName {
  font-family: Segoe print;
  padding-right: 10px;
  font-size: 1.5em;
}
</style>

<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  mail: '',
  password: ''
})
const manage = reactive({
  error: ''
})

const checkFields = () => {
  for (let key in state) {
    if (state[key] == '') {
      manage.error = 'Veuillez compléter tous les champs !'
      console.log(key)
      return 1
    }
    //TODO: Envoyer les données au back pour tenter connecter
    console.log('Envoyer les données au back pour tenter de se connecter')
  }
}
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
            <input class="mailPass" type="email" placeholder="Mail" v-model="state.mail" />
            <input
              class="mailPass"
              type="password"
              placeholder="Mot de passe"
              v-model="state.password"
            />
          </div>
        </form>
      </div>
      <div class="buttonConnect">
        <button id="suivant" class="clickButton" @click="checkFields">Se connecter</button>
      </div>
      <div class="error">
        {{ manage.error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.logoName {
  font-family: Segoe print;
  /* padding-right: 10px; */
  color: #707070;
  font-size: 1.5em;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 25px;

  /* display: flex;
  flex-direction: column;
  gap: 25px;
  width: 80%; */
}

.fields-connection {
  padding-top: 30px;
  gap: 40px;
  display: flex;
  flex-direction: column;
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

.buttonConnect {
  padding-bottom: 5%;
  padding-top: 15%;
  gap: 200px;
  display: flex;
  flex-direction: row;
  align-self: center;
}

.clickButton {
  padding: 5px 5px 5px 5px;
  border-radius: 5px;
  font-size: 1.1em;
  height: 40px;
}

.error {
  color: red;
  padding-bottom: 5%;
  font-weight: bold;
}

#suivant {
  color: white;
  background-color: #026b30;
}
</style>

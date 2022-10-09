<script lang="ts">
export default {
  name: 'SignIn',
  data() {
    return {
      firstPage: true,
      firstName: '',
      secondName: '',
      mail: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      birthDate: '',
      gender: ''
    }
  },
  methods: {
    swapToTrue() {
      this.firstPage = true
    },
    swapToFalse() {
      this.firstPage = false
    }
  }
}
</script>

<template>
  <div class="main">
    <div class="page1" v-if="firstPage">
      <div class="title-image">
        <img src="../assets/logo/logo.svg" class="image" />
        <p class="logoName">TaalToolBox</p>
      </div>
      <form class="form">
        <div class="firstDiv">
          <input
            class="firstFields"
            type="text"
            placeholder="Nom"
            :value="firstName"
            @input="(event) => (firstName = event.target.value)"
          />
          <input
            class="firstFields"
            type="text"
            placeholder="Prénom"
            :value="secondName"
            @input="(event) => (secondName = event.target.value)"
          />
        </div>
        <div class="secondDiv">
          <input
            class="secondFields"
            type="email"
            placeholder="Mail"
            :value="mail"
            @input="(event) => (mail = event.target.value)"
          />
          <input
            class="secondFields"
            type="password"
            placeholder="Mot de passe"
            :value="password"
            @input="(event) => (password = event.target.value)"
          />
          <input
            class="secondFields"
            type="password"
            placeholder="Confirmer le mot de passe"
            :value="confirmPassword"
            @input="(event) => (confirmPassword = event.target.value)"
          />
        </div>
      </form>
      <div class="buttons">
        <button id="precedent" class="clickButton" style="opacity: 0.5; cursor: text">
          Précédent
        </button>
        <button id="suivant" class="clickButton" @click="swapToFalse">Suivant</button>
      </div>
    </div>
    <div class="page2" v-else>
      <div class="title-image">
        <img src="../assets/logo/logo.svg" class="image" />
        <p class="logoName">TaalToolBox</p>
      </div>
      <form class="form">
        <div class="secondDiv">
          <input class="secondFields" type="tel" placeholder="Téléphone" />
          <input
            class="secondFields"
            type="text"
            placeholder="Date de naissance"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
          />
          <fieldset class="radioField">
            <div class="radioLegend"><legend>Sexe:</legend></div>
            <div class="radioInput">
              <input type="radio" name="gender" value="man" v-model="gender" />
              <img src="@/assets/logo/man.svg" alt="manSign" class="radioImage" />
            </div>
            <div class="radioInput">
              <input type="radio" name="gender" value="woman" v-model="gender" />
              <img src="@/assets/logo/woman.svg" alt="womanSign" class="radioImage" />
            </div>
          </fieldset>
        </div>
      </form>
      <div class="buttons">
        <button id="precedent" class="clickButton" @click="swapToTrue">Précédent</button>
        <button id="suivant" class="clickButton">Terminer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  /* width: 100vw; */
  /* max-width: 1600px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: solid grey 1px; */
}
.page1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
}

.page2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
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
  width: 80%;
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
  /* margin-left: 73px; */
  align-items: center;
}

input.secondFields {
  color: #026b30;
  width: 100%;
  padding: 2px;
  border-radius: 5px;
  outline: none;
  /* margin-right: 20%; */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 2px 4px -2px;
}

input.firstFields {
  /* width: 30%; */
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 2px 4px -2px;
  border-radius: 5px;
  padding: 2px;
  outline: none;
}

input::placeholder {
  color: #026b30;
}

.radioField {
  display: flex;
  flex-direction: row;
  gap: 25%;
  width: 100%;
}

.radioLegend {
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 1.2em;
  color: #026b30;
}

.radioInput {
  display: flex;
  position: relative;
}
.radioImage {
  height: auto;
  width: 100%;
}
.buttons {
  padding-bottom: 5%;
  gap: 35%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.clickButton {
  border: none;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  font-size: 1.1em;
  min-width: 100px;
}

#precedent {
  border: solid grey 2px;
  color: grey;
}

#suivant {
  color: white;
  background-color: #026b30;
}
</style>

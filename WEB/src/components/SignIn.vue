<script setup lang="ts">
  import { reactive } from 'vue'
  import axios from 'axios'
  import logo from '@/assets/logo/logo.svg'

  const state = reactive({
    page1: {
      firstName: 'Michaël',
      secondName: 'Pourbaix',
      mail: 'test@test.com'
      // confirmPassword: 'testtest123M@'
    },
    page2: {
      phoneNumber: '0444 05 04 05',
      birthDate: '05-04-2002',
      gender: 'man'
    },
    auth: {
      password: ''
    }
  })

  const sendData = () => {
    let payload = {
      name: state.page1.firstName,
      surname: state.page1.secondName,
      email: state.page1.mail,
      password: state.auth.password,
      birthdate: state.page2.birthDate,
      telephone: state.page2.phoneNumber,
      role: '1',
      class: '1'
    }
    console.log(payload)
    // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
    axios
      .post('http://localhost:3000/auth/register', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
        }
      })
      .then((response) => console.log(response))
  }
  const manage = reactive({
    firstPage: true,
    error: ''
  })
  const swapToTrue = () => {
    manage.error = ''
    manage.firstPage = true
  }
  const swapToFalse = () => {
    manage.error = ''
    manage.firstPage = false
  }
  // const checkPasswordStrength = (password: string) => {
  //   const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  //   if (!/\d/.test(password)) {
  //     return 'Le mot de passe doit contenir au moins un chiffre'
  //   } else if (!specialChars.test(password)) {
  //     return 'Le mot de passe doit contenir au moins un caractère spécial'
  //   } else if (password.length < 12) {
  //     return 'Le mot de passe doit contenir au moins 12 caractères'
  //   }
  //   return 0
  // }
  const checkFields = (page: string) => {
    if (page == 'page1') {
      for (let key in state.page1) {
        if (state.page1[key] == '') {
          manage.error = 'Veuillez compléter tous les champs !'
          console.log(key)
          return 1
        }
      }
      // if (state.page1.password != state.page1.confirmPassword) {
      //   manage.error = "Le champ mot de passe n'est pas identique au champ répéter le mot de passe !"
      //   return 1
      // }
      // if (checkPasswordStrength(state.page1.password)) {
      //   manage.error = checkPasswordStrength(state.page1.password)
      //   return 1
      // }
      swapToFalse()
    } else {
      for (let key in state.page2) {
        if (state.page2[key] == '') {
          manage.error = 'Veuillez compléter tous les champs !'
          console.log(key)
          return 1
        }
      }
      let birth_date = state.page2.birthDate.replace('-', '').replace('-', '')
      state.auth.password = state.page1.firstName[0] + state.page1.secondName + birth_date
      sendData()
      console.log(state.auth.password)
    }

    // Verifier que les données ne sont pas déjà utilisées pour un autre compte
    console.log('TODO: Envoyer les données au back')
  }
</script>

<template>
  <div class="main">
    <div
      class="page1"
      v-if="manage.firstPage"
    >
      <div class="title">
        <p class="inscrit">Inscription</p>
      </div>
      <div class="title-image">
        <img
          :src="logo"
          class="image"
        />
        <p class="logoName">TaalToolBox</p>
      </div>
      <form class="form">
        <div class="firstDiv">
          <input
            class="firstFields"
            type="text"
            placeholder="Nom"
            v-model="state.page1.firstName"
          />
          <input
            class="firstFields"
            type="text"
            placeholder="Prénom"
            v-model="state.page1.secondName"
          />
        </div>
        <div class="secondDiv">
          <input
            class="secondFields"
            type="email"
            placeholder="Mail"
            v-model="state.page1.mail"
          />
          <!-- <input
            class="secondFields"
            type="password"
            placeholder="Mot de passe"
            v-model="state.page1.password"
          />
          <input
            class="secondFields"
            type="password"
            placeholder="Confirmer le mot de passe"
            v-model="state.page1.confirmPassword"
          /> -->
        </div>
      </form>
      <div class="buttons">
        <button
          id="precedent"
          class="clickButton"
          style="opacity: 0.5; cursor: text"
        >
          Précédent
        </button>
        <button
          id="suivant"
          class="clickButton"
          @click="checkFields('page1')"
        >
          Suivant
        </button>
      </div>
      <div class="error">
        {{ manage.error }}
      </div>
    </div>
    <div
      class="page2"
      v-else
    >
      <div class="title">
        <p class="inscrit">Inscription</p>
      </div>
      <div class="title-image">
        <img
          :src="logo"
          class="image"
        />
        <p class="logoName">TaalToolBox</p>
      </div>
      <form class="form">
        <div class="secondDiv">
          <input
            class="secondFields"
            type="tel"
            placeholder="Téléphone"
            v-model="state.page2.phoneNumber"
          />
          <input
            class="secondFields"
            type="text"
            placeholder="Date de naissance"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
            v-model="state.page2.birthDate"
          />
          <fieldset class="radioField">
            <div class="radioLegend"><legend>Sexe:</legend></div>
            <div class="radioInput">
              <input
                type="radio"
                name="gender"
                value="man"
                v-model="state.page2.gender"
              />
              <img
                src="@/assets/logo/man.svg"
                alt="manSign"
                class="radioImage"
              />
            </div>
            <div class="radioInput">
              <input
                type="radio"
                name="gender"
                value="woman"
                v-model="state.page2.gender"
              />
              <img
                src="@/assets/logo/woman.svg"
                alt="womanSign"
                class="radioImage"
              />
            </div>
          </fieldset>
        </div>
      </form>
      <div class="buttons">
        <button
          id="precedent"
          class="clickButton"
          @click="swapToTrue"
        >
          Précédent
        </button>
        <button
          id="suivant"
          class="clickButton"
          @click="checkFields('page2')"
        >
          Terminer
        </button>
      </div>
      <div class="error">
        {{ manage.error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main {
    padding: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .page1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid grey 1px;
    max-width: 500px;
  }

  .page2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid grey 1px;
    max-width: 500px;
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
    color: #707070;
    font-size: 1.5em;
  }

  .form {
    padding: 30px;
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
    gap: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input.secondFields {
    color: #026b30;
    width: 100%;
    padding: 2px;
    border-radius: 5px;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 2px 4px -2px;
  }

  input.firstFields {
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
    gap: 10px;
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

  .error {
    color: red;
    padding-bottom: 5%;
    font-weight: bold;
  }

  #precedent {
    border: solid grey 2px;
    color: grey;
  }

  #suivant {
    color: white;
    background-color: #026b30;
  }
  .title {
    min-width: 400px;
    width: 100%;
    background-color: #026b30;
  }

  .inscrit {
    background-color: #026b30;
    color: white;
    flex-grow: 5;
    border-bottom: solid 1px grey;
    font-size: 1.5em;
  }
</style>

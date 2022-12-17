<script setup lang="ts">
  import { onMounted, reactive } from 'vue'
  import loginService from '@/services/loginService'
  import generalService from '@/services/generalService'
  import type { UserFormData } from '@/types/user'
  import axios from 'axios'
  import { useUserStore } from '../stores/user'

  import { sha512 } from 'js-sha512'

  const currentUserRole = useUserStore().user.role
  console.log(currentUserRole.includes('Administrateur'))

  interface State {
    page1: {
      firstName: string
      secondName: string
      mail: string
      birthDate: string
      gender: string
      schoolMail: string
    }
    page2: {
      school: string
      classroom: string
      role: string
    }
    auth: {
      password: string
    }
  }

  const state: State = reactive({
    page1: {
      firstName: 'Michaël',
      secondName: 'Pourbaix',
      mail: 'test@test.com',
      schoolMail: 'test@school.com',
      birthDate: '05-04-2002',
      gender: ''
    },
    page2: {
      school: 'Institut Saint Joseph',
      classroom: '1TL1SJ',
      role: 'Elève'
    },
    auth: {
      password: ''
    }
  })

  // RECUPERER LE ROLE DU CURRENT USER
  const manage = reactive({
    firstPage: true,
    error: '',
    role: currentUserRole.includes('Administrateur') ? 'Administrateur' : 'Professeur'
  })

  // TODO RECUPERER LES ECOLES ET LES CLASSES DANS LA BASE DE DONNEES
  const schoolClass: any = reactive({
    'Institut Saint Joseph': ['1TL1SJ', '1TL2SJ', '2TL1SJ', '2TL2SJ', '3TL1SJ', '3TL2SJ'],
    'Institut Don Bosco': ['1TL1DB', '1TL2DB', '2TL1DB', '2TL2DB', '3TL1DB', '3TL2DB'],
    'Institut Cardinal Mercier': ['1TL1CM', '1TL2CM', '2TL1CM', '2TL2CM', '3TL1CM', '3TL2CM']
  })
  // RECUPERER TOUS LES ROLES DANS LA BASE DE DONNEES ET LES METTRE DANS UN TABLEAU
  const roleRequest = await generalService.getRole().catch((err) => {
    console.error(err)
  })
  const role: string[] = roleRequest.data.map(
    (x: { id: string; name: string; description: string }) => {
      return x.name
    }
  )
  // role = tempRole
  console.log(role)
  const updateClassrooms = () => {
    state.page2.classroom = ''
  }
  const swapToTrue = () => {
    manage.error = ''
    manage.firstPage = true
  }
  const swapToFalse = () => {
    manage.error = ''
    manage.firstPage = false
  }

  const sendData = () => {
    let payload: UserFormData = {
      name: state.page1.firstName,
      surname: state.page1.secondName,
      email: state.page1.mail,
      schoolEmail: state.page1.schoolMail,
      password:
        sha512(state.auth.password) +
        '__gny-b?QH06wr5rBR)*a5H!RR9zevVa!XMR@W4LXpgXXkmqy3zVP-T*S_YLxwj=v1xIAk-+u?TdgBlsIV)8PsqvZpWSn6#4J77/)6w?o6.@UC+nVpCU0j*x9j-K=vS+',
      birthdate: state.page1.birthDate,
      role: state.page2.role, //LADMIN PEUT AJOUTER UN UTILISATEUR AVEC NIMPORTE QUEL ROLE OR LE PROF NE PEUT AJOUTER QUE LE ROLE ELEVE
      school: state.page2.school, //TODO si c'est l'admin qui inscris il doit mentionner l'école si c'est le prof on récupère son école
      schoolClass: state.page2.classroom, //TODO EST CE QUUN PROF PEUT AVOIR PLUSIEURS CLASSES
      sex: state.page1.gender
    }
    console.log(payload)
    loginService.setUsers(payload)
    // axios
    //   .post('http://localhost:3000/auth/register', payload, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
    //     }
    //   })
    //   .then((response) => console.log(response))
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
      // check if al fields are filled ans avoid typescript error, Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ firstName: string; secondName: string; mail: string; phoneNumber: string; birthDate: string; }'.
      if (
        state.page1.firstName == '' ||
        state.page1.secondName == '' ||
        state.page1.mail == '' ||
        state.page1.birthDate == ''
      ) {
        manage.error = 'Veuillez compléter tous les champs !'
        return 1
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
      if (state.page2.role == '' || state.page2.school == '' || state.page2.classroom == '') {
        manage.error = 'Veuillez compléter tous les champs !'
        return 1
      }
      const birthTable = state.page1.birthDate.split('-')
      const birthTableString = birthTable.map((x) => parseInt(x))
      // let birth_date = state.page1.birthDate.replace('-', '').replace('-', '')
      state.auth.password =
        state.page1.firstName[0] + state.page1.secondName + birthTableString.join('')
      sendData()
      console.log(state.auth.password)
    }

    // Verifier que les données ne sont pas déjà utilisées pour un autre compte
    console.log('TODO: Envoyer les données au back')
  }
</script>

<template>
  <div class="main">
    <div class="pageDisplay">
      <div class="title">
        <p class="inscrit">Inscription</p>
      </div>
      <div class="title-image">
        <img
          src="../assets/logo/logo.svg"
          class="image"
        />
        <p class="logoName">TaalToolBox</p>
      </div>
      <div
        v-if="manage.firstPage"
        class="page1"
      >
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
          <input
            class="secondFields"
            type="email"
            placeholder="Mail"
            v-model="state.page1.mail"
          />
          <input
            class="secondFields"
            type="email"
            placeholder="School Mail"
            v-model="state.page1.schoolMail"
          />
          <input
            class="secondFields"
            type="text"
            placeholder="Date de naissance"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
            v-model="state.page1.birthDate"
          />
          <fieldset class="radioField">
            <div class="radioLegend"><legend>Sexe:</legend></div>
            <div class="radioInput">
              <input
                type="radio"
                name="gender"
                value="M"
                v-model="state.page1.gender"
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
                value="F"
                v-model="state.page1.gender"
              />
              <img
                src="@/assets/logo/woman.svg"
                alt="womanSign"
                class="radioImage"
              />
            </div>
          </fieldset>
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
      </div>
      <div
        v-else
        class="page2"
      >
        <form class="form">
          <div class="select">
            <select
              name="select"
              class="select_input"
              placeholder="École"
              v-model="state.page2.school"
              @change="updateClassrooms"
            >
              <option
                hidden
                value="Classe"
                disabled
                selected
              >
                École
              </option>

              <option
                :value="item"
                v-for="item in Object.keys(schoolClass)"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="select">
            <select
              name="select"
              class="select_input"
              placeholder="Classe"
              v-model="state.page2.classroom"
            >
              <option
                hidden
                value="Classe"
                disabled
                selected
              >
                Classe
              </option>

              <option
                v-if="state.page2.school"
                :value="item"
                v-for="item in schoolClass[state.page2.school]"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <!-- Si l'utilisateur n'est pas admin, ne pas montrer le role car le role sera automatiquement sur élève -->
          <div
            class="select"
            v-if="manage.role == 'Administrateur'"
          >
            <select
              name="select"
              class="select_input"
              placeholder="Rôle"
              v-model="state.page2.role"
            >
              <option
                hidden
                value="Rôle"
                disabled
                selected
              >
                Role
              </option>
              <option
                :value="item"
                v-for="item in role"
              >
                {{ item }}
              </option>
            </select>
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
      </div>
      <div class="error">
        {{ manage.error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  select {
    appearance: none;
    border: none;
    margin: 0;
    width: 100%;
    cursor: inherit;
    line-height: inherit;
  }
  .select_input {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 2px 4px -2px;
    border-radius: 5px;
    padding: 2px;
    outline: none;
    position: relative;
  }
  .select_input::after {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 15px solid #026b30;
    position: absolute;
    left: 90%;
    content: '';
  }
  .select {
    width: 100%;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    background-color: #fff;
    display: grid;
    color: #026b30;
    align-items: center;
    position: relative;
  }
  .select::after {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 10px solid #026b30;
    position: absolute;
    left: 92%;
    content: '';
  }
  .main {
    padding: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  /* .select-class{
  width: 200px;
} */
  .pageDisplay {
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
  .page1,
  .page2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    display: flex;
    width: 100%;
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
    overflow: visible;
  }
  .radio_button {
    width: 100%;
    min-width: 18px;
  }
  .radioImage {
    height: auto;
    width: 100%;
  }
  .buttons {
    padding-bottom: 5%;
    gap: 28%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    padding: 20px;
  }

  .clickButton {
    display: flex;
    justify-content: center;
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
    align-items: center;
    color: white;
    background-color: #026b30;
  }
  .title {
    min-width: 400px;
    width: 100%;
    background-color: #026b30;
  }

  .inscrit {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #026b30;
    color: white;
    flex-grow: 5;
    border-bottom: solid 1px grey;
    font-size: 1.5em;
  }
</style>

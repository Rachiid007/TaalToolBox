<script setup lang="ts">
  import logo from '@/assets/logo/logo.svg'
  import { useUserStore } from '@/stores/user'
  import { ref } from 'vue'
  import type { Ref } from 'vue'

  const userStore = useUserStore()
  let role: string[] = []

  if (window.sessionStorage.getItem('x-xsrf-token')) {
    const roleReq: any = await userStore.getUserScope()
    if (roleReq && roleReq.role.length) {
      role = roleReq.role
    }
  }
  console.log(role)
  const right_tab: any = ref(null)
  const hamburger: any = ref(null)
  const isShown: any = ref(false)

  const showAddSubTab: Ref<boolean> = ref(false)

  const toggleHamburger = () => {
    if (isShown.value) {
      right_tab.value.style.left = '100%'
      hamburger.value.style.transform = 'rotate(0deg)'
      isShown.value = false
    } else {
      right_tab.value.style.left = '65%'
      hamburger.value.style.transform = 'rotate(90deg)'
      isShown.value = true
    }
  }
  const staticRole = {
    admin: 'Administrateur',
    creator: 'Créateur',
    teacher: 'Professeur',
    student: 'Elève'
  }
  // const role = userStore.user.role
  const handleDisconnection = async () => {
    // Cet appel n'a pas d'intérêt jusqu'à ce qu'on trouve un moyen de supprimer le cookie que l'utilisateur envoie en backend
    // await userStore.logout()
    window.sessionStorage.clear()
    window.location.pathname = import.meta.env.VITE_LOGIN_ROUTE
  }

  const showAdd = () => {
    showAddSubTab.value = true
  }
  const hideAdd = () => {
    showAddSubTab.value = false
  }
</script>

<template>
  <div class="main">
    <router-link
      class="logo"
      to="/"
    >
      <div class="logo_img">
        <img
          class="main_logo"
          :src="logo"
        />
      </div>
      <p class="logo_title">TaalToolBox</p>
    </router-link>
    <div class="tabs">
      <router-link
        class="tabs_element"
        to="/"
        >Accueil</router-link
      >
      <router-link
        class="tabs_element"
        to="/map"
        v-show="
          Object.values(staticRole).some((x) => {
            return role.includes(x)
          })
        "
        >Carte</router-link
      >
      <router-link
        class="tabs_element"
        to="/profile"
        v-show="
          Object.values(staticRole).some((x) => {
            return role.includes(x)
          })
        "
        >Profil</router-link
      >
      <div
        class="tabs_element add_tab"
        v-show="
          [staticRole.admin, staticRole.teacher, staticRole.creator].some((x) => {
            return role.includes(x)
          })
        "
        @mouseenter="showAdd"
        @mouseleave="hideAdd"
      >
        <button>Ajouter</button>
        <div
          class="add_tab_list"
          v-show="showAddSubTab"
        >
          <router-link
            to="/add-user"
            class="tabs_element"
            v-show="
              [staticRole.admin, staticRole.teacher].some((x) => {
                return role.includes(x)
              })
            "
          >
            <div v-if="role.includes(staticRole.admin)">Prof/Elève</div>
            <div v-else>Elève</div>
          </router-link>
          <router-link
            to="/choose-activities"
            class="tabs_element"
            v-show="
              [staticRole.admin, staticRole.creator].some((x) => {
                return role.includes(x)
              })
            "
            >Activités</router-link
          >
          <router-link
            to="/add-class"
            class="tabs_element"
            v-show="role.includes(staticRole.admin)"
            >Classes</router-link
          >
        </div>
      </div>
      <router-link
        to="/user-response-stats"
        class="tabs_element"
        v-show="
          [staticRole.admin, staticRole.teacher].some((x) => {
            return role.includes(x)
          })
        "
        >Suivi</router-link
      >
    </div>
    <router-link
      v-if="role.length"
      class="conreg"
      to="/login"
      @click="handleDisconnection()"
      >Se deconnecter</router-link
    >
    <router-link
      v-else
      class="conreg"
      to="/login"
      >Se connecter</router-link
    >
    <div
      ref="hamburger"
      class="hamburger"
      @click="toggleHamburger"
    >
      <!-- On construit le hamburger -->
      <div class="build"></div>
      <div class="build"></div>
      <div class="build"></div>
    </div>
    <div
      class="rightTab"
      ref="right_tab"
    >
      <div class="content">
        <router-link
          class="right_tab_element"
          to="/"
          >Accueil</router-link
        >
        <router-link
          v-show="
            Object.values(staticRole).some((x) => {
              return role.includes(x)
            })
          "
          class="right_tab_element"
          to="/map"
          >Carte
        </router-link>
        <router-link
          v-show="
            [staticRole.admin, staticRole.teacher].some((x) => {
              return role.includes(x)
            })
          "
          to="/add-user"
          class="right_tab_element"
        >
          <div v-if="role.includes(staticRole.admin)">Ajouter Prof/Elève</div>
          <div v-else>Ajouter Elève</div>
        </router-link>
        <router-link
          v-show="
            [staticRole.admin, staticRole.creator].some((x) => {
              return role.includes(x)
            })
          "
          to="/choose-activities"
          class="right_tab_element"
          >Ajouter Activités</router-link
        >
        <router-link
          to="#"
          class="right_tab_element"
          v-show="role.includes(staticRole.admin)"
          >Ajouter Classes</router-link
        >
        <router-link
          to="/user-response-stats"
          class="tabs_element"
          v-show="
            [staticRole.admin, staticRole.creator].some((x) => {
              return true //role.includes(x)
            })
          "
          >Suivi</router-link
        >
        <router-link
          v-if="role.length"
          class="hamburger_connreg"
          to="/login"
          @click="handleDisconnection()"
          >Se deconnecter</router-link
        >
        <router-link
          v-else
          class="hamburger_connreg"
          to="/login"
          >Se connecter</router-link
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
  .main {
    width: 100vw;
    max-width: 1500px;
    border-bottom: 1px solid grey;
    height: 70px;
    display: flex;
    align-items: center;
    gap: 10%;
    font-family: NotoSans-Regular;
    position: fixed;
    background-color: white;
    z-index: 5;
    margin: 0 auto;
    justify-self: center;
    top: 0;
  }
  .logo {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    gap: 5px;
  }
  .logo_img {
    /* outline: 1px solid red; */
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .main_logo {
    margin-bottom: 5px;
    min-width: 50px;
    width: 100%;
    height: 100%;
  }
  .logo_title {
    font-size: 1.6em;
    text-align: left;
    /* outline: 1px solid blue; */
    color: #026b30;
    font-family: Didno;
  }
  .tabs {
    display: flex;
    flex-direction: row;
    flex-grow: 5;
    /* outline: 1px solid pink; */
    gap: 5%;
    font-size: 1.4em;
    color: #707070;
    text-align: center;
    position: relative;
  }
  .add_tab {
    position: relative;
  }
  .add_tab_list {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    background: white;
    outline: 1px solid grey;
    padding: 15px;
    gap: 5px;
  }
  .tabs_element {
    width: max-content;
    position: relative;
    transition: ease 0.5s;
    margin: auto 0;
  }
  .tabs_element div {
    padding: auto 0;
  }
  .tabs_element:hover {
    color: #026b30;
    transition: ease 0.5s;
    cursor: pointer;
  }
  .tabs_element::before {
    position: absolute;
    content: '';
    /* background-color: #026b30; */
    border-bottom: 1px solid #026b30;
    /* border-top: 1px solid #026b30; */
    width: 0%;
    height: 100%;
    top: 0%;
    left: 50%;
    transition: 0.5s ease;
  }
  .tabs_element::after {
    position: absolute;
    content: '';
    /* background-color: #026b30; */
    border-bottom: 1px solid #026b30;
    /* border-top: 1px solid #026b30; */
    width: 0%;
    height: 100%;
    top: 0%;
    left: 50%;
    transition: 0.5s ease;
  }
  .tabs_element:hover::after {
    position: absolute;
    width: 50%;
    /* left: 0%; */
    transition: ease 0.5s;
  }
  .tabs_element:hover::before {
    position: absolute;
    width: 50%;
    left: 0%;
    transition: ease 0.5s;
    animation: reverse;
  }
  .conreg {
    font-size: 1.2em;
    text-align: center;
    cursor: pointer;
    /* outline: green 1px solid; */
    margin-right: 15px;
    color: #707070;
  }
  .hamburger {
    display: none;
    z-index: 10;
    transition: 0.5s ease;
  }
  .build {
    width: 30px;
    height: 0px;
    border: 3px solid #707070;
    background-color: #707070;
    border-radius: 2px;
  }
  .rightTab {
    width: 35%;
    height: 100vh;
    top: 0;
    left: 100%;
    background-color: white;
    position: absolute;
    z-index: -1;
    /* border-left: 1px solid grey; */
    padding-top: 70px;
    transition: 0.5s ease;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 25px;
    font-size: 1.1em;
    color: #707070;
    text-align: left;
    outline: 1px solid grey;
    height: 100%;
    padding-top: 25px;
  }
  .hamburger_deploid {
    display: flex;
    flex-direction: row;
    gap: 6px;
    cursor: pointer;
    align-self: flex-end;
    margin-right: 20px;
    position: relative;
  }
  .build_deploid {
    width: 0px;
    height: 30px;
    border: 3px solid #707070;
    background-color: #707070;
    border-radius: 2px;
  }
  .right_tab_element {
    align-self: center;
    font-weight: bold;
    position: relative;
    overflow: visible;
    font-size: 1em;
    text-align: left;
    width: 100%;
    padding-left: 15%;
  }
  .right_tab_element:hover {
    color: #026b30;
    transition: ease 0.5s;
    cursor: pointer;
  }
  .right_tab_element::before {
    content: '';
    position: absolute;
    width: 10px;
    left: 5px;
    top: 0%;
    height: 5%;
    /* background-color: #026b30; */
  }
  .right_tab_element:hover::before {
    content: '>';
  }
  .hamburger_connreg {
    position: absolute;
    top: 90%;
    font-size: 3.5vw;
    font-weight: bold;
    color: #026b30;
    text-align: center;
    margin-left: 20px;
  }
  .hamburger_connreg:hover {
    border-bottom: 1px solid #026b30;
  }
  @media (min-width: 701px) {
    .rightTab {
      visibility: hidden;
    }
  }
  @media (max-width: 1200px) {
    .tabs {
      font-size: 1.1em;
    }
    .main {
      gap: 2%;
    }
  }
  @media (max-width: 850px) {
    .tabs {
      font-size: 1em;
    }
    .conreg {
      font-size: 1em;
    }
  }
  @media (max-width: 750px) {
    .tabs {
      font-size: 0.8em;
    }
    .conreg {
      font-size: 0.8em;
    }
  }
  @media (max-width: 700px) {
    .logo_title {
      display: inline;
    }
    .tabs {
      font-size: 1em;
      flex-grow: 5;
    }
    .tabs_element {
      display: none;
    }
    .conreg {
      font-size: 1em;
      display: none;
    }
    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-right: 20px;
      cursor: pointer;
    }
    .right_tab_element {
      font-size: 4vw;
    }
  }
</style>

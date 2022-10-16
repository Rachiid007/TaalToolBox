<script setup lang="ts">
const showTab = () => {
  document.getElementsByClassName('rightTab')[0].style.display = 'inline'
}
const hideTab = () => {
  document.getElementsByClassName('rightTab')[0].style.display = 'none'
}
</script>

<template>
  <div class="main">
    <router-link class="logo" to="/">
      <div class="logo_img">
        <img class="main_logo" src="@/assets/logo/logo.svg" />
      </div>
      <p class="logo_title">TaalToolBox</p>
    </router-link>
    <div class="tabs">
      <router-link class="tabs_element" to="/">Acceuil</router-link>
      <router-link class="tabs_element" to="/">Carte</router-link>
      <router-link to="/" class="tabs_element">Jeux</router-link>
      <router-link to="/" class="tabs_element">Classe</router-link>
    </div>
    <div class="conreg">S'inscrire/Se connecter</div>
    <div class="hamburger" @click="showTab">
      <!-- On construit le hamburger -->
      <div class="build"></div>
      <div class="build"></div>
      <div class="build"></div>
    </div>
    <div class="rightTab">
      <div class="content">
        <div class="hamburger_deploid" @click="hideTab">
          <!-- On construit le hamburger -->
          <div class="build_deploid"></div>
          <div class="build_deploid"></div>
          <div class="build_deploid"></div>
        </div>
        <router-link class="right_tab_element" to="/">Acceuil</router-link>
        <router-link class="right_tab_element" to="/">Carte</router-link>
        <router-link to="/" class="right_tab_element">Jeux</router-link>
        <router-link to="/" class="right_tab_element">Classe</router-link>
        <router-link to="/" style="margin-top: 60vh; align-self: center"
          >Se connecter/S'inscrire</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100vw;
  max-width: 1600px;
  border-bottom: 1px solid #707070;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 10%;
  font-family: NotoSans-Regular;
  position: fixed;
  background-color: white;
  z-index: 3;
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
  font-family: Segoe print;
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
}
.tabs_element {
  width: max-content;
  position: relative;
  transition: ease 0.5s;
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
  text-align: left;
  cursor: pointer;
  /* outline: green 1px solid; */
  margin-right: 15px;
  color: #707070;
}
.hamburger {
  display: none;
}
.build {
  width: 30px;
  height: 0px;
  border: 3px solid #707070;
  background-color: #707070;
  border-radius: 2px;
}
.rightTab {
  display: none;
  width: 25%;
  height: 100vh;
  top: 0;
  left: 75%;
  background-color: white;
  position: absolute;
  z-index: 2;
  border-left: 1px solid grey;
  padding-left: 20px;
}
.content {
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 25px;
  font-size: 1.1em;
  color: #707070;
  text-align: left;
  padding-top: 20px;
  padding-bottom: 50px;
  flex-grow: 5;
  height: 100vh;
  max-height: 600px;
}
.hamburger_deploid {
  display: flex;
  flex-direction: row;
  gap: 6px;
  cursor: pointer;
  align-self: flex-end;
  margin-right: 20px;
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
}
.right_tab_element:hover {
  color: #026b30;
  transition: ease 0.5s;
  cursor: pointer;
}
.right_tab_element::before {
  content: '';
  position: absolute;
  width: 0px;
  left: -15px;
  top: 50%;
  height: 5%;
  transform: rotate(45deg);
  background-color: #026b30;
}
.right_tab_element::after {
  content: '';
  position: absolute;
  width: 0px;
  left: -15px;
  top: 50%;
  height: 5%;
  transform: rotate(-45deg);
  background-color: #026b30;
}
.right_tab_element:hover::before {
  width: 10px;
}
.right_tab_element:hover::after {
  width: 10px;
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

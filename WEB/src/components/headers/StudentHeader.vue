<script setup lang="ts">
  import logo from '@/assets/logo/logo.svg'
  
  const showTab = () => {
    document.getElementsByClassName('rightTab')[0].style.display = 'inline'
  }
  const hideTab = () => {
    document.getElementsByClassName('rightTab')[0].style.display = 'none'
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
        >Acceuil</router-link
      >
      <router-link
        class="tabs_element"
        to="/map"
        >Carte</router-link
      >
    </div>
    <!-- Dont show connection button when user is connect -->
    <router-link
      class="conreg"
      to="/login"
      >Se connecter</router-link
    >
    <div
      class="hamburger"
      @click="showTab"
    >
      <!-- On construit le hamburger -->
      <div class="build"></div>
      <div class="build"></div>
      <div class="build"></div>
    </div>
    <div class="rightTab">
      <div class="content">
        <div
          class="hamburger_deploid"
          @click="hideTab"
        >
          <!-- On construit le hamburger -->
          <div class="build_deploid"></div>
          <div class="build_deploid"></div>
          <div class="build_deploid"></div>
        </div>
        <router-link
          class="right_tab_element"
          to="/"
          >Acceuil</router-link
        >
        <router-link
          class="right_tab_element"
          to="/map"
          >Carte</router-link
        >
        <router-link
          to="/"
          style="margin-top: 60vh; align-self: center"
          >Se connecter</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import './header.css';
</style>
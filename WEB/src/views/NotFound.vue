<script setup lang="ts">
  import logo from '@/assets/logo/logo.svg'
</script>

<template>
  <div id="container">
    <div class="logo_container">
      <img
        class="logo"
        :src="logo"
        alt="Logo"
      />
      <p class="logo_title">TaalToolBox</p>
    </div>

    <h1>Oops!</h1>
    <p>
      <strong>404</strong>
      <br />La page que vous recherchez n'existe pas. <span id="emoji">🧐</span>
    </p>
    <p>
      <router-link to="/">
        <button id="button-custom"><i class="fas fa-home"></i> <span>Accueil</span></button>
      </router-link>
    </p>
  </div>
</template>

<style scoped>
  #container {
    text-align: center;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #container h1 {
    font-size: 2.5rem;
  }

  #container p {
    font-size: 1.5rem;
  }

  #container strong {
    font-weight: bold;
    font-size: 3rem;
  }

  #emoji {
    font-size: 3rem;
  }

  #container button {
    margin-top: 20px;
  }

  #button-custom {
    background-color: #f5d2d2;
    border: 1px solid #8d8b8b;
    border-radius: 5px;
    color: #000000;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 10px 20px;
    transition: all 0.2s ease-in-out;
  }

  #button-custom:hover {
    background-color: #ee7676;
  }

  .logo_container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .logo {
    margin-bottom: 5px;
    max-width: 80px;
    min-height: 50px;
  }

  .logo_title {
    font-size: 2em;
    text-align: left;
    color: #026b30;
    font-family: Didno;
  }
</style>

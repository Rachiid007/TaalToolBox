<script setup lang="ts"></script>

<template>
  <div class="main">
    <RouterLink
      class="comeBack"
      to="/"
      ><img
        src="@/assets/logo/left_arrow.svg"
        alt=""
      />
      <p class="comeBackP">Accueil</p>
    </RouterLink>
    <slot></slot>
  </div>
</template>

<style scoped>
  .main {
    width: 100vw;
    max-width: 1600px;
    border: 0px solid blue;
    border-bottom: 1px solid #707070;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .comeBack {
    color: #707070;
    position: absolute;
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    text-align: center;
    top: 0;
    left: 0;
    padding-left: 25px;
    height: 100%;
    font-family: Didno;
    transition: ease 0.5s;
  }
  .comeBack:hover {
    transform: scale(1.05);
    transition: ease 0.5s;
  }
  .comeBack img {
    height: auto;
    width: 25px;
    color: #707070;
    opacity: 0;
    transition: 0.5s ease;
  }
  .comeBackP {
    font-size: 1.5em;
    position: relative;
  }
  .comeBackP::before {
    top: 0;
    left: -50%;
    content: '';
    position: absolute;
    height: 100%;
    width: 50%;
    background-color: white;
    transition: 0.5s ease;
  }
  .comeBack:hover img {
    opacity: 1;
    transition: 0.5s ease;
  }
  .comeBack:hover .comeBackP {
    color: #026b30;
    transition: ease 0.5s;
  }

  .comeBack:hover .comeBackP::before {
    width: 0%;
    left: -50%;
    transition: 0.5s ease;
  }
</style>

<script setup lang="ts"></script>

<template>
  <div class="main">
    <div class="greetings">
      <p id="firstIn">Bienvenue sur TaalToolBox</p>
      <p
        id="secondIn"
        style="font-size: 0.5em; color: #707070"
      >
        Jouer à apprendre les langues !
      </p>
    </div>
    <div class="info">
      <div
        class="left_info"
        id="fourthInLeft"
      >
        <h1>Une nouvelle façon d'apprendre</h1>
        <img
          class="imageLeft"
          src="@/assets/images/maps.svg"
        />
        <p>
          Modifier votre vision de l'apprentissage des langues avec notre nouvelle application
          innovante.
          <b style="color: #026b30">Voici-ci votre solution pour devenir multi-langue !</b>
        </p>
      </div>
      <div
        class="line"
        id="thirdIn"
      ></div>
      <div
        class="right_info"
        id="fourthInRight"
      >
        <h1>Une multitude de jeux amusants</h1>
        <img
          class="imageRight"
          src="@/assets/images/gamemodes.svg"
        />
        <p>
          Profitez de notre large gamme de jeux pour améliorer votre maîtrise de langue. Pour chaque
          jeu, des thèmes et des difficultés différentes vous sont proposés.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    max-width: 1600px;
    width: 100vw;
    gap: 0px;
    /* margin-top: 0px; */
    font-family: NotoSans-Regular;
    color: #707070;
    z-index: 1;
  }
  .greetings {
    margin-top: 40px;
    margin-bottom: 30px;
    font-size: 2.8em;
    color: #026b30;
    text-align: center;
  }
  .info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5%;
  }
  .line {
    width: 1px;
    background-color: #707070;
    height: 400px;
  }
  .left_info {
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-self: flex-start;
    margin-top: 35px;
    text-align: center;
  }
  .imageLeft {
    width: 100%;
    height: auto;
    align-self: center;
  }
  .right_info {
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-self: flex-start;
    margin-top: 30px;
    text-align: center;
  }
  .imageRight {
    width: 55%;
    height: auto;
    align-self: center;
  }
  /* .image {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  } */
  p {
    font-size: 1.1em;
  }
  h1 {
    font-size: 1.5em;
  }
  #firstIn {
    opacity: 0;
    transform: translateY(15%);
    animation: fadeInBottomUp 1.5s ease 0.1s forwards;
    animation-delay: 0.2s;
  }
  #secondIn {
    opacity: 0;
    transform: translateY(15%);
    animation: fadeInBottomUp 1.5s ease 0.1s forwards;
    animation-delay: 0.5s;
  }
  #thirdIn {
    opacity: 0;
    animation: fadeIn 1.5s ease 0.1s forwards;
    animation-delay: 1.5s;
  }
  #fourthInLeft {
    opacity: 0;
    transform: translateX(-15%);
    animation: fadeInLatteral 1.5s ease 0.1s forwards;
    animation-delay: 1.5s;
  }
  #fourthInRight {
    opacity: 0;
    transform: translateX(15%);
    animation: fadeInLatteral 1.5s ease 0.1s forwards;
    animation-delay: 1.5s;
  }
  @media (max-width: 600px) {
    .greetings {
      font-size: 2em;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 50px;
    }
    .line {
      height: 1px;
      background-color: #707070;
      width: 80vw;
      display: none;
    }
    .left_info {
      width: 80%;
      display: flex;
      flex-direction: column;
      gap: 25px;
      align-self: center;
      margin-top: 35px;
    }
    .imageLeft {
      height: 100%;
      width: 100%;
    }
    .right_info {
      width: 80%;
      display: flex;
      flex-direction: column;
      gap: 30px;
      align-self: center;
    }
    .imageRight {
      height: 100%;
      width: 70%;
    }
  }
  @keyframes fadeInBottomUp {
    100% {
      opacity: 100%;
      transform: translateY(0);
    }
  }
  @keyframes fadeIn {
    100% {
      opacity: 100%;
    }
  }
  @keyframes fadeInLatteral {
    100% {
      opacity: 100%;
      transform: translateX(0);
    }
  }
</style>

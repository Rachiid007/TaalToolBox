<script lang="ts"></script>

<template>
  <div class="main">
    <div class="title">
      <p class="activity_name">Flash</p>
      <img src="../assets/lightning.svg" />
      <p class="activity_name">Cards</p>
    </div>
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
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.activity_name {
  /* font-family: 'Courier New', monospace; */
  font-family: microsan_A;
  color: #026b30;
  font-weight: 500;
  font-size: 2em;
}
img {
  height: auto;
  width: 10%;
}
</style>

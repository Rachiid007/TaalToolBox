<script setup lang="ts"></script>

<template>
  <div class="main">
    <div class="title">
      <!-- <p class="activity_name">DragNDrop</p> -->
      <img
        src="@/assets/logo/dragandlearn.svg"
        alt="drag and drop gamemode logo"
      />
    </div>
  </div>
</template>

<style scoped>
  .main {
    width: 100vw;
    max-width: 1600px;
    border: none;
    border-bottom: 1px solid #707070;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 5;
    background-color: white;
  }
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  img {
    height: auto;
    width: 50%;
  }
</style>

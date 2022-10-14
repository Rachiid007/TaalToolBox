<script setup lang="ts"></script>

<template>
  <div class="main">
    <div class="title">
      <p class="activity_name">DragNDrop</p>
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
  .activity_name {
    /* font-family: 'Courier New', monospace; */
    font-family: microsan_A;
    color: #026b30;
    font-weight: 500;
    font-size: 2em;
  }
</style>

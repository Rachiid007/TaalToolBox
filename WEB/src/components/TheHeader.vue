<script setup lang="ts"></script>

<template>
  <div class="main">
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
  }
</style>

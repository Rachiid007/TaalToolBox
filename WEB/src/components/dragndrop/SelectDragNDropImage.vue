<script setup lang="ts">
  import { ref } from 'vue'

  const image = ref('')

  const test = (e: any) => {
    console.log(e.target.files)
  }
</script>
<template>
  <div class="main">
    <div class="content">
      <h1>1. Sélectionner une image de fond pour le nouvel exercice</h1>
      <div class="image-input">
        <input
          type="file"
          accept="image/*"
          class="input"
          unique
          @change="(e) => test(e)"
        />
        <p class="input-comment">Glisser ici votre image de background</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .main {
    width: 100%;
    max-width: 1600px;
  }
  .content {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }
  h1 {
    margin-top: 15px;
    color: var(--main-dal-color);
    font-size: 35px;
    padding: 0;
    border-bottom: 2px solid var(--main-dal-color);
  }
  .image-input {
    width: 35%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed var(--main-dal-color);
    position: relative;
    transition: 0.3s ease;
    border-radius: 5px;
    color: var(--second-color);
  }
  .image-input:hover {
    background: rgba(17, 0, 255, 0.265);
    transition: 0.3s ease;
    color: black;
    transform: scale(1.05);
  }
  .input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .input-comment {
    font-size: 25px;
    font-weight: bold;
    text-align: center;
  }
</style>

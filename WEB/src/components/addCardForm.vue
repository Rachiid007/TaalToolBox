<script setup lang="ts">
  import { ref } from 'vue'

  const word = ref('')
  const translation = ref('')
  const image = ref('')

  const handleImage = (e: any) => {
    image.value = e.target.files[0]
  }

  const handleSubmit = () => {
    console.log(word.value, translation.value)
    console.log(image.value)
  }
</script>

<template>
  <div class="container">
    <h2 class="title">Ajouter une carte</h2>
    <form
      method="post"
      @submit.prevent="handleSubmit"
    >
      <label for="word">Mot :</label>
      <input
        type="text"
        name="word"
        id="word"
        v-model="word"
      />
      <label for="translation">Traduction :</label>
      <input
        type="text"
        name="translation"
        id="translation"
        v-model="translation"
      />

      <label for="image">Ajouter une image :</label>
      <input
        type="file"
        name="image"
        id="image"
        accept="image/png, image/jpeg"
        @change="handleImage"
      />
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
  }

  .title {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    background-color: green;
    color: white;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
  }

  label {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
  }

  input {
    margin: 0 0 10px 0;
    padding: 5px;
    font-size: 16px;
    font-weight: 300;
    border: 1px solid #000;
    border-radius: 5px;
    width: 100%;
  }

  button {
    margin: 10px 0 0 0;
    padding: 5px;
    font-size: 16px;
    font-weight: 300;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
    background-color: green;
    color: #fff;
    width: 100%;
    height: 40px;
    text-align: center;
  }

  button:hover {
    background-color: #000;
  }
</style>

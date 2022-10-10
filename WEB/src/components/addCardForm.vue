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
    margin: 0;
    width: 100%;
    height: auto;
    outline: 2px solid black;
    gap: 20px 0;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    background-color: #056b30;
    color: white;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px 0;
    width: 100%;
  }

  label {
    align-self: flex-start;
    margin-left: 20px;
  }

  input {
    padding: 5px;
    border: 1px solid #000;
    border-radius: 5px;
    width: 90%;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
    background-color: #056b30;
    color: #fff;
    width: max-content;
    height: 40px;
  }

  button:hover {
    background-color: #000;
  }
</style>

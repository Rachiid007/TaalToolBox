<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { useCardStore } from '@/stores/card'
  import type Flashcard from '@/types/Flashcard'

  import FlashcardService from '@/services/FlashcardService'

  const store = useCardStore()

  const dataForm = reactive<Flashcard>({
    id: 0,
    word: '',
    translation: '',
    image: null,
    url: ''
  })

  const handleImage = (e: any) => {
    dataForm.url = URL.createObjectURL(e.target.files[0])
    dataForm.image = e.target.files[0]
  }

  const handleFormValidation = () => {
    if (dataForm.word === '' || dataForm.translation === '' || dataForm.image === null) {
      return false
    } else {
      return true
    }
  }

  const showErrorMessage = ref(false)

  const onSubmit = () => {
    if (handleFormValidation()) {
      const copyDataForm: Flashcard = {
        id: dataForm.id,
        word: dataForm.word,
        translation: dataForm.translation,
        image: dataForm.image,
        url: dataForm.url
      }

      store.addFlashcard(copyDataForm)

      const responseMoii = FlashcardService.postFlashcard({
        word: copyDataForm.word,
        translation: copyDataForm.translation
      })

      console.log('responseMoii', responseMoii)

      // FlashcardService.uploadImage({
      //   id: copyDataForm.id.toString(),
      //   image: copyDataForm.image
      // })

      dataForm.id++
      dataForm.word = ''
      dataForm.translation = ''
      dataForm.image = null
      dataForm.url = ''
      showErrorMessage.value = false
    } else {
      showErrorMessage.value = true
    }
  }
</script>

<template>
  <div class="container">
    <h2 class="title">Ajouter une carte</h2>
    <form
      method="post"
      @submit.prevent="onSubmit"
    >
      <label for="word">Mot :</label>
      <input
        type="text"
        name="word"
        id="word"
        v-model="dataForm.word"
      />
      <label for="translation">Traduction :</label>
      <input
        type="text"
        name="translation"
        id="translation"
        v-model="dataForm.translation"
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
    <p
      class="error-msg"
      v-if="showErrorMessage"
    >
      Veuillez remplir tous les champs
    </p>

    <div
      v-if="dataForm.url"
      class="preview"
    >
      <img
        v-show="dataForm.url"
        :src="dataForm.url!"
        alt="preview"
      />
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    margin: 0;
    width: 100%;
    height: auto;
    outline: 1px solid gray;
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

  .error-msg {
    color: red;
    font-weight: bold;
    text-align: center;
  }
</style>

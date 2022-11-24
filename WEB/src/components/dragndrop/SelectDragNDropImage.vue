<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useDadLevels } from '@/stores/dadLevels'

  const store = useDadLevels()

  const image = ref(null)
  const imageUrl = ref('')

  const emit = defineEmits<{
    (e: 'change-page', nbrPage: number): void
  }>()

  const handleImage = (e: any) => {
    console.log(e.target.files)
    if (e.target.files[0]) {
      imageUrl.value = URL.createObjectURL(e.target.files[0])
      image.value = e.target.files[0]
      console.log(imageUrl.value, image.value)
    }
  }

  const cancelImport = () => {
    imageUrl.value = ''
    image.value = null
  }

  const continueCreation = () => {
    store.setImageUrl(imageUrl.value)
    store.setImageData(image.value)
    emit('change-page', 2)
    console.log('next page ok ')
  }
  onMounted(() => {
    if (store.getImageUrl()) {
      image.value = store.getImageData()
      imageUrl.value = store.getImageUrl()
    }
  })
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
          @change="(e) => handleImage(e)"
          v-show="!imageUrl"
        />
        <p
          class="input-comment"
          v-show="!imageUrl"
        >
          Glisser ici votre image de background
        </p>
        <img
          v-show="imageUrl"
          :src="imageUrl"
          class="image_preview"
        />
      </div>
      <div
        class="confirm_image"
        v-show="imageUrl"
      >
        <p class="comment">
          Si c'est image vous conviens, vous pouvez passer à la création de l'exercice en cliquant
          sur <b style="color: var(--main-dal-color)">suivant</b>. Sinon vous pouvez changer d'image
          en appuyant sur <b style="color: red">annuler</b>.
        </p>
        <div class="buttons_container">
          <button
            class="next_button"
            @click="continueCreation"
          >
            Suivant
          </button>
          <button
            class="cancel_button"
            @click="cancelImport"
          >
            Annuler
          </button>
        </div>
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
    text-align: center;
  }
  h1 {
    margin-top: 15px;
    color: var(--main-dal-color);
    font-size: 35px;
    padding: 0;
    border-bottom: 2px solid var(--main-dal-color);
  }
  .image-input {
    width: 40%;
    /* min-height: 300px; */
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
    margin: 150px 0;
    font-weight: bold;
  }
  .image_preview {
    width: 100%;
    height: auto;
  }
  .confirm_image {
    width: 50%;
  }
  .comment {
    font-size: 18px;
    margin: 0;
    font-family: NotoSans-Regular;
  }
  .buttons_container {
    display: flex;
    flex-direction: row;
    gap: 15%;
    justify-content: center;
    overflow: visible;
    padding: 15px;
    margin-top: 15px;
  }
  .next_button {
    background: var(--main-dal-color);
    color: white;
    font-size: 20px;
    border-radius: 5px;
    padding: 10px 25px;
    transition: 0.2s ease;
    box-shadow: var(--main-dal-color) 0px 0 5px 1px;
  }
  .next_button:hover {
    transform: scale(1.05);
    transition: 0.2s ease;
    box-shadow: inset 0 0 2px 1px #0252d3, var(--main-dal-color) 0px 0 5px 1px;
  }
  .cancel_button {
    /* background: rgb(166, 0, 0); */
    color: black;
    border: 2px solid red;
    font-size: 20px;
    border-radius: 5px;
    padding: 10px 25px;
    transition: 0.2s ease;
    /* box-shadow: red 0px 0 5px 1px; */
  }
  .cancel_button:hover {
    transform: scale(1.05);
    transition: 0.2s ease;
    /* box-shadow: red 0px 0 5px 1px; */
  }
</style>

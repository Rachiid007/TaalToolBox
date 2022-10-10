<template>
  <div class="container">
    <h1 class="title">Ajouter une activité</h1>
    <p class="the-text">
      Veuillez sélectionner un fichier Excel (.xslx) pour encoder une nouvelle activité :
    </p>
    <div
      class="label"
      :class="entering ? 'dark-gray' : 'light-gray'"
      @drop.prevent="handleDrop"
      @dragenter="entering = true"
      @dragleave="entering = false"
    >
      <input
        multiple
        type="file"
        accept=".xlsx"
        class="input"
        @input="handleInput"
      />
      <span class="message">Glissez vos fichiers .XLSX ici...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'
  const events = ['dragenter', 'dragleave', 'dragover', 'drop']
  onMounted(() => {
    events.forEach((event) => document.body.addEventListener(event, (e) => e.preventDefault()))
  })
  onUnmounted(() => {
    events.forEach((event) => document.body.removeEventListener(event, (e) => e.preventDefault()))
  })
  const emit = defineEmits<{ (e: 'upload', files: File[]): void }>()
  const entering = ref(false)
  function handleDrop(e: DragEvent): void {
    const files = e.dataTransfer?.files as FileList
    emit('upload', [...files])
  }
  function handleInput(e: InputEvent): void {
    const files = (e.target as HTMLInputElement).files as FileList
    emit('upload', [...files])
  }
</script>

<style scoped>
  .container {
    width: 100vw;
    height: 100vh;
    text-align: center;
  }
  .label {
    position: relative;
    transition: all 0.3s ease-in-out;
    border: 3px dashed lightslategrey;
    width: 700px;
    height: 250px;
    margin: 0 auto;
    border-radius: 7px;
  }
  .label:hover {
    background-color: rgb(170, 172, 174);
  }
  .input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.3rem;
  }

  .light-gray {
    background-color: rgb(225, 222, 222);
  }

  .dark-gray {
    background-color: rgb(170, 172, 174);
  }

  .title {
    font-size: 2rem;
    margin: 30px auto;
    position: relative;
  }

  .title::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 330px;
    height: 3px;
    background-color: green;
  }
  .the-text {
    color: rgb(28, 143, 28);
    font-size: 20px;
    margin: 10px 0;
  }
</style>

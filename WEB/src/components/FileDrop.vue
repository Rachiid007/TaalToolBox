<template>
  <div class="container">
    <h1 class="title">Ajouter une activité</h1>
    <p class="the-text">
      Veuillez sélectionner un fichier excel .xslx pour encoder une nouvelle activité:
    </p>
    <div
      class="label"
      :class="entering ? 'dark-gray' : 'light gray'"
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
      <span class="message">Drop your files here</span>
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
    width: 1000px;
    height: 700px;
  }
  .label {
    position: relative;
    transition: all 0.3s ease-in-out;
    border: 3px dashed lightslategrey;
    width: 700px;
    height: 250px;
  }

  .label:hover {
    background-color: lightslategrey;
  }
  .input {
    position: absolute;
    bottom: 100px;
    left: 50%;
    width: 100%;
    height: 100%;
  }
  .message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .dark-gray {
    background-color: lightslategrey;
  }

  .light-gray {
    background-color: lightgray;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    border-bottom: 3px solid green;
    display: inline-block;
    padding-bottom: 5px;
  }

  .the-text {
    color: green;
  }
</style>

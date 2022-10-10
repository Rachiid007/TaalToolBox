<script setup lang="ts">
  defineProps<{
    word: string
    translation: string
    image?: string
  }>()

  defineEmits<{
    delete: (id: number) => void
  }>()
</script>

<template>
  <div class="container">
    <p class="word">{{ word }}</p>
    <p class="translation">{{ translation }}</p>
    <img
      :src="image"
      alt="image"
    />
    <button
      class="btn"
      @click="$emit('delete', 1)"
    >
      Supprimer
    </button>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 250px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
  }

  .word {
    font-weight: bold;
  }

  .translation {
    font-style: italic;
  }

  img {
    width: 80%;
    height: auto;
  }

  .btn {
    margin: 10px 0 0 0;
    padding: 5px;
    font-size: 16px;
    font-weight: 300;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
    background-color: red;
    color: #fff;
    width: 100%;
    height: 40px;
  }

  .btn:hover {
    background-color: #26232c;
  }
</style>

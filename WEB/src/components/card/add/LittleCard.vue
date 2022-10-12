<script setup lang="ts">
  import { useCardStore } from '@/stores/card'

  const store = useCardStore()

  const props = defineProps<{
    id: number
    word: string
    translation: string
    url: string
  }>()

  const handleDelete = (id: number) => {
    store.removeFlashcard(id)
  }
</script>

<template>
  <div class="container">
    <p class="word">{{ props.word }}</p>
    <p class="translation">{{ props.translation }}</p>
    <img
      :src="props.url"
      alt="image"
    />
    <button
      class="btn"
      @click="handleDelete(props.id)"
    >
      Supprimer
    </button>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .word {
    font-weight: bold;
  }

  .translation {
    font-style: italic;
  }

  /* img {
    width: 90%;
    height: auto;
  } */

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 30px;
    padding: 5px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: red;
    color: #fff;
  }

  .btn:hover {
    background-color: #26232c;
  }
</style>

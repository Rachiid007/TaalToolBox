<script setup lang="ts">
  import { ref } from 'vue'

  interface info {
    name: string
    translation: string
    indexInHeaderExcel: number | null
  }

  const infos = ref<info[]>([
    { name: 'fistName', translation: 'Nom', indexInHeaderExcel: null },
    { name: 'lastName', translation: 'Prénom', indexInHeaderExcel: null },
    { name: 'schoolEmail', translation: 'Email (école)', indexInHeaderExcel: null },
    { name: 'privateEmail', translation: 'Email (personnel)', indexInHeaderExcel: null },
    { name: 'birthdate', translation: 'Date de naissance', indexInHeaderExcel: null },
    { name: 'class', translation: 'Classe', indexInHeaderExcel: null },
    { name: 'sex', translation: 'Sexe', indexInHeaderExcel: null }
  ])

  const expectedHeaders = ref([
    'Prénom',
    'Nom',
    'E-mail (école)',
    'E-mail (personnel)',
    'Date de naissance',
    'Classe',
    'Sexe'
  ])

  const mockHeadersFromExcel = ref([
    'Voornaam',
    'Achternaam',
    'E-mail (school)',
    'E-mail (persoonlijk)',
    'Geboortedatum',
    'Klas',
    'Seks'
  ])
</script>

<template>
  <h1 class="title">Synchronise multiple select input</h1>

  <div class="container">
    <div
      v-for="(header, index) in expectedHeaders"
      :key="index"
      class="row"
    >
      <label class="label">{{ header }}</label>
      <i class="fas fa-arrow-right"></i>
      <div class="select">
        <select
          v-model="mockHeadersFromExcel[index]"
          class="form-control"
        >
          <option value="">Please select one</option>
          <option
            v-for="(header, index) in mockHeadersFromExcel"
            :key="index"
            :value="header"
          >
            {{ header }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }

  .label {
    margin-right: 10px;
  }

  .select {
    margin: 0 10px;
  }

  .select select {
    width: 200px;
  }
</style>

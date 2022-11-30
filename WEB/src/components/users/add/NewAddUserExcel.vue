<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { read, utils } from 'xlsx'

  const file = ref<File | null>(null)
  const headers = ref<unknown[] | null>(null)
  const allRows = ref<unknown[][] | null>(null)
  const otherRows = ref<unknown[][] | null>(null)

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

  const expectedHeaders = infos.value.map((info) => info.translation)

  // get an array with only the infos that are null
  const infosWithNullIndex = computed(() => {
    const availableIndex = []
    infos.value.forEach((info) => {
      if (info.indexInHeaderExcel === null) {
        availableIndex.push(info.translation)
      }
    })
    return availableIndex
  })

  const changeIndexInHeaderExcel = (index: number, name: string) => {
    infos.value.forEach((info) => {
      if (info.translation === name) {
        info.indexInHeaderExcel = index
        console.log(info)
      }
    })
    console.log(infosWithNullIndex.value)
  }

  const selectedHeaders = ref<number[]>([])

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files) {
      file.value = files[0]
      excelToArray(file.value)
    } else {
      file.value = null
    }
  }

  const excelToArray = (file: File) => {
    // check if the file is a xlsx file
    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      console.log('File is not a xlsx file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result
      if (data) {
        /* parse workbook */
        const workbook = read(data, { type: 'binary', cellDates: true })

        /* get first worksheet */
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]

        // get all rows
        allRows.value = utils.sheet_to_json(firstSheet, { header: 1 })

        // get headers
        headers.value = allRows.value[0]

        // get all other rows except headers
        otherRows.value = allRows.value.slice(1)
      }
    }
    reader.readAsBinaryString(file)
  }

  const displayTable = () => {
    console.log(selectedHeaders.value)
  }
</script>

<template>
  <div class="container">
    <h1 class="title">Add users Excel</h1>
    <input
      type="file"
      name="file"
      accept=".xlsx, .xls"
      @change="handleFileChange($event)"
    />

    <div
      class="convert-columns"
      v-if="headers"
    >
      <h2>Faîte correspondre les noms des colonnes</h2>
      <div class="columns">
        <div
          class="column"
          v-for="(eHeader, index) in expectedHeaders"
          :key="index"
        >
          <div class="field">
            <label
              :for="eHeader"
              class="label"
              >{{ eHeader }}</label
            >
            <i class="fas fa-arrow-right"></i>
            <div class="select">
              <select
                :id="eHeader"
                v-model="selectedHeaders[index]"
                @change="changeIndexInHeaderExcel(index, eHeader)"
              >
                <option
                  disabled
                  selected
                >
                  Choisissez une colonne
                </option>
                <option
                  v-for="(header, index) in infosWithNullIndex"
                  :key="index"
                  :value="header"
                >
                  {{ header }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button @click="displayTable">Convertir</button>
    </div>

    <div
      class="preview"
      v-if="otherRows"
    >
      <h2>Prévisualisation</h2>
      <table class="table">
        <thead>
          <tr>
            <th
              v-for="(eHeader, index) in expectedHeaders"
              :key="index"
            >
              {{ eHeader }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in otherRows"
            :key="index"
          >
            <td
              v-for="(cell, index) in row"
              :key="index"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>

      <button class="button-normal">Valider</button>
    </div>
  </div>
</template>

<style>
  .container {
    margin: 0 auto;
    max-width: 800px;
  }

  .title {
    text-align: center;
  }

  .columns {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
  }

  .field {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  .label {
    width: 100px;
  }

  .button-normal {
    background-color: #2c3e50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 20px;
  }

  .button-normal:hover {
    background-color: #34495e;
  }
</style>

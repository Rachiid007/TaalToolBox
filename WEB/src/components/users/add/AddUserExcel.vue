<script setup lang="ts">
  import { ref } from 'vue'
  import { read, utils } from 'xlsx'

  const file = ref<File | null>(null)

  interface UserFromExcelFR {
    Nom: string
    Prénom: string
    Email: string
    'Date de Naissance': string
    Classe: string
    "Date d'inscription": string
    Sexe: string
  }

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

  const rows = ref<UserFromExcelFR[]>([])

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
        const workbook = read(data, { type: 'binary' })
        /* get first worksheet */
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]

        rows.value = utils.sheet_to_json<UserFromExcelFR>(firstSheet)

        // console.log(rows.value)
      }
    }
    reader.readAsBinaryString(file)
  }

  const removeRow = (index: number) => {
    rows.value.splice(index, 1)
  }
</script>

<template>
  <h1 class="title">Add users Excel</h1>
  <form>
    <input
      type="file"
      name="file"
      accept=".xlsx, .xls"
      @change="handleFileChange($event)"
    />
  </form>
  <div
    v-show="rows.length > 0"
    class="table-container"
  >
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Date de Naissance</th>
          <th>Classe</th>
          <th>Date d'inscription</th>
          <th>Sexe</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.Email"
        >
          <td>{{ row.Nom }}</td>
          <td>{{ row.Prénom }}</td>
          <td>{{ row.Email }}</td>
          <td>{{ row['Date de Naissance'] }}</td>
          <td>{{ row.Classe }}</td>
          <td>{{ row["Date d'inscription"] }}</td>
          <td>{{ row.Sexe }}</td>
          <td>
            <button
              type="button"
              @click="removeRow(rows.indexOf(row))"
            >
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  @import '@/components/card/add/choiceHowToAdd.css';
</style>

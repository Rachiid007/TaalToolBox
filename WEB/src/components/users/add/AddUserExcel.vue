<script setup lang="ts">
  import { ref } from 'vue'
  import { read, utils } from 'xlsx'

  import UserService from '@/services/UserService'

  const file = ref<File | null>(null)

  interface UserFromExcelFR {
    Nom: string
    Prénom: string
    Email: string
    'Date de Naissance': string
    Classe: string
    "Date d'inscription": string
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

        // if the first row correspond to the interface
        if (
          firstSheet.A1.v === 'Nom' &&
          firstSheet.B1.v === 'Prénom' &&
          firstSheet.C1.v === 'Email' &&
          firstSheet.D1.v === 'Date de Naissance' &&
          firstSheet.E1.v === 'Classe' &&
          firstSheet.F1.v === "Date d'inscription"
        ) {
          rows.value = utils.sheet_to_json<UserFromExcelFR>(firstSheet)
        } else {
          console.log('The first row of the excel file does not correspond to the interface')
        }
      }
    }
    reader.readAsBinaryString(file)
  }

  const removeRow = (index: number) => {
    rows.value.splice(index, 1)
  }

  const addUsers = () => {
    UserService.postUsers(rows.value)
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

    <button
      class="submit-btn"
      v-show="rows.length > 0"
      @click="addUsers"
    >
      Add users
    </button>
  </div>
</template>

<style scoped>
  .container {
    margin: 0 auto;
    max-width: 800px;
  }

  .title {
    font-size: 2rem;
    margin: 30px auto;
    text-align: center;
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

  .table-container {
    margin: 30px auto;
    max-width: 800px;
    overflow-x: auto;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  th {
    background-color: green;
    color: white;
  }

  .submit-btn {
    background-color: green;
    border-radius: 5px;
    padding: 5px 10px;
  }

  .submit-btn:hover {
    background-color: #4caf50;
  }
</style>

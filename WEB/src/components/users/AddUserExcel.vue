<script setup lang="ts">
  // import UserService from '@/services/UserService'
  import type { User, UserFormData, UserFromExcelFile } from '@/types/user'
  import { ref } from 'vue'
  import { read, utils } from 'xlsx'
  import { useUserStore } from '@/stores/user'

  const userScope = await useUserStore().checkUserAccessAndReturnUser()

  const userSchool = userScope.school
  const file = ref<File | null>(null)
  const headersFromExcel = ref<any>(null)
  const rows = ref<unknown[][] | null>(null)
  const error = ref<string | null>(null)

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files) {
      // accept only xlsx files (excel)
      if (files[0].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        error.value =
          'Le format du fichier est incorrect, veuillez sélectionner un fichier Excel (XLSX).'
        return
      } else {
        error.value = null
        file.value = files[0]
        excelToArray(file.value)
      }
    } else {
      file.value = null
    }
  }

  const expectedHeaders = ref<any[]>([
    { name: 'fistName', translation: 'Nom', indexInHeaderExcel: null },
    { name: 'lastName', translation: 'Prénom', indexInHeaderExcel: null },
    { name: 'schoolEmail', translation: 'Email (école)', indexInHeaderExcel: null },
    { name: 'privateEmail', translation: 'Email (personnel)', indexInHeaderExcel: null },
    { name: 'birthdate', translation: 'Date de naissance', indexInHeaderExcel: null },
    { name: 'class', translation: 'Classe', indexInHeaderExcel: null },
    { name: 'sex', translation: 'Sexe', indexInHeaderExcel: null }
  ])

  const excelToArray = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result
      const workbook = read(data, { type: 'binary', cellDates: true })
      const firstSheet = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheet]
      headersFromExcel.value = utils.sheet_to_json(worksheet, { header: 1 })[0]
      rows.value = utils.sheet_to_json(worksheet, { header: 1, range: 1 })
      checkHeadersFromExcel()
      // console.log('headersFromExcel', headersFromExcel.value)
      // console.log('rows', rows.value)
    }
    reader.readAsBinaryString(file)
  }

  const checkForDuplicates = (array: any[]) => {
    // verify if the properties indexInHeaderExcel are all different
    const indexes = array.map((e) => e.indexInHeaderExcel)
    return new Set(indexes).size === indexes.length
  }

  const checkIfNotNull = (array: any[]) => {
    // verify if all the properties indexInHeaderExcel are not null
    return array.every((e) => e.indexInHeaderExcel !== null)
  }

  // check if headersFromExcel have at least expectedHeaders size
  const checkHeadersFromExcel = () => {
    if (headersFromExcel.value) {
      // if the headersFromExcel is smaller than expectedHeaders, we display an error message
      if (headersFromExcel.value.length < expectedHeaders.value.length) {
        error.value =
          'Le fichier Excel doit contenir au moins ' + expectedHeaders.value.length + ' colonnes'
        return false
      } else {
        error.value = null
        return true
      }
    } else {
      error.value = 'Veuillez sélectionner un fichier Excel'
      return false
    }
  }

  const displayTable = ref<boolean>(false)

  const checkAndDisplayTable = () => {
    if (checkForDuplicates(expectedHeaders.value)) {
      if (checkIfNotNull(expectedHeaders.value)) {
        error.value = null
        displayTable.value = true
      } else {
        error.value = 'Veuillez sélectionner une colonne pour chaque en-tête'
        displayTable.value = false
      }
    } else {
      error.value = 'Veuillez sélectionner une colonne différente pour chaque en-tête'
      displayTable.value = false
    }
  }

  const deleteUser = (index: number) => {
    rows.value?.splice(index, 1)
  }

  const sendUsersToStore = async () => {
    const users: UserFormData[] = []

    rows.value?.forEach((row) => {
      const birthDate = row[expectedHeaders.value[4].indexInHeaderExcel] as string
      const birthDateString = new Date(birthDate)
      const yr = birthDateString.getFullYear()
      const mo = birthDateString.getMonth()
      const day = birthDateString.getDay()
      const birthDateSend = day + '-' + mo + '-' + yr
      const birthDateConcat = day.toString() + mo.toString() + yr.toString()

      // const birthDateConcat = birthDate.replace('-', '').replace('-', '')

      console.log(birthDate)
      const name = row[expectedHeaders.value[0].indexInHeaderExcel] as string
      const surname = row[expectedHeaders.value[1].indexInHeaderExcel] as string
      const password = surname[0] + name + birthDateConcat
      const user: UserFormData = {
        name: row[expectedHeaders.value[0].indexInHeaderExcel] as string,
        surname: row[expectedHeaders.value[1].indexInHeaderExcel] as string,
        schoolEmail: row[expectedHeaders.value[2].indexInHeaderExcel] as string,
        email: row[expectedHeaders.value[3].indexInHeaderExcel] as string,
        birthdate: birthDateSend,
        schoolClass: row[expectedHeaders.value[5].indexInHeaderExcel] as string,
        sex: row[expectedHeaders.value[6].indexInHeaderExcel] as string,
        role: 'Elève',
        school: userSchool,
        password: password
      }
      users.push(user)
    })
    console.log('users', users)

    const response = await useUserStore().postListUsers(users)

    if (response) {
      console.log('response', response)

      // Rest
      file.value = null
      headersFromExcel.value = null
      rows.value = null
      expectedHeaders.value.forEach((e) => {
        e.indexInHeaderExcel = null
      })
      displayTable.value = false

      // Display success message
    }
  }
</script>

<template>
  <div class="container">
    <h1 class="title">Ajouter des utilisateurs avec un fichier Excel</h1>

    <div class="container-form">
      <input
        type="file"
        name="file"
        accept=".xlsx, .xls"
        @change="handleFileChange($event)"
      />
    </div>
    <p
      class="error"
      v-if="error"
    >
      {{ error }}
    </p>

    <div
      class="convert-excel-header"
      v-if="headersFromExcel"
    >
      <h2 class="sub-title">Convertir les en-têtes du fichiers Excel</h2>
      <div class="columns">
        <div
          class="column"
          v-for="(eHeader, index) in expectedHeaders"
          :key="index"
        >
          <div class="field">
            <label
              :for="eHeader.name"
              class="label"
              >{{ eHeader.translation }}</label
            >
            <i class="fas fa-arrow-right"></i>
            <div class="select">
              <select
                :id="eHeader.name"
                v-model="eHeader.indexInHeaderExcel"
              >
                <option
                  v-for="(header, index) in headersFromExcel"
                  :key="index"
                  :value="index"
                >
                  {{ header }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- at click display table with user from excel file -->
      <button
        @click="checkAndDisplayTable"
        class="submit-btn"
      >
        Afficher la table
      </button>
      <!-- <p
        class="error"
        v-if="error"
      >
        {{ error }}
      </p> -->
    </div>

    <div
      class="display-table"
      v-if="displayTable"
    >
      <h2 class="sub-title">Tableau des utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th
              v-for="(eHeader, index) in expectedHeaders"
              :key="index"
            >
              {{ eHeader.translation }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in rows"
            :key="index"
          >
            <td
              v-for="(eHeader, index) in expectedHeaders"
              :key="index"
            >
              {{ row[eHeader.indexInHeaderExcel] }}
            </td>
            <td
              class="delete"
              @click="deleteUser(index)"
            >
              <i class="fas fa-trash"></i>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        @click="sendUsersToStore"
        class="submit-btn"
      >
        Ajouter les utilisateurs
      </button>
    </div>
  </div>
</template>

<style scoped>
  .container {
    margin: 0 auto;
    max-width: 1000px;
  }

  .title {
    font-size: 2rem;
    margin: 15px auto;
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

  .convert-excel-header {
    margin: 20px auto;
  }

  .sub-title {
    font-size: 1.5rem;
    margin: 15px auto;
    text-align: center;
  }

  .container-form {
    margin: 20px auto;
    text-align: center;
  }

  .container-form input {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px 10px;
  }

  .columns {
    display: flex;
    flex-direction: column;
    margin: 20px auto;
  }

  .column {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }

  .column .field {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .column .field .label {
    margin-right: 10px;
  }

  .column .field .select {
    margin-left: 10px;
  }

  .column .field .select select {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px 10px;
  }

  .column .field .select select option {
    padding: 5px 10px;
  }

  .error {
    color: red;
    margin: 10px 0;
  }

  .table-container {
    margin: 20px auto;
    max-width: 900px;
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

  .delete {
    cursor: pointer;
  }

  .submit-btn {
    background-color: green;
    border-radius: 5px;
    padding: 5px 10px;
    color: white;
  }

  .submit-btn:hover {
    background-color: #4caf50;
  }
</style>

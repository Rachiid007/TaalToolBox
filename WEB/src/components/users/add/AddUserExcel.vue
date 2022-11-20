<script setup lang="ts">
  import { ref } from 'vue'
  import * as XLSX from 'xlsx'

  const file = ref<File | null>(null)

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files) {
      file.value = files[0]
      excelToArray(file.value)
    }
  }

  const excelToArray = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const json = XLSX.utils.sheet_to_json(worksheet)
      console.log(json)
    }
    reader.readAsBinaryString(file)
  }
</script>

<template>
  <h1 class="title">Add users Excel</h1>
  <div>
    <input
      type="file"
      name="file"
      accept=".xlsx, .xls"
      @change="handleFileChange($event)"
    />
  </div>
</template>

<style scoped>
  .title {
    margin: 100px 0;
    color: red;
  }
</style>

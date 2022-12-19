<script setup lang="ts">
  import axios from 'axios'

  const handleFileUpload = (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files) {
      const file = files[0]
      const formData = new FormData()
      formData.append('file', file)
      axios
        .post('/api/cards/excel', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
</script>

<template>
  <div>
    <input
      type="file"
      name="file"
      accept=".xlsx, .xls"
      @change="handleFileUpload($event)"
    />
  </div>
</template>

<style scoped></style>

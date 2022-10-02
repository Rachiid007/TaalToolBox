<script setup lang="ts">
  import axios from 'axios'
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    axios
      .post('http://localhost:3000/cards/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }
</script>

<template>
  <form>
    <input
      type="file"
      accept=".xlsx"
      @change="handleFileUpload"
    />
  </form>
</template>

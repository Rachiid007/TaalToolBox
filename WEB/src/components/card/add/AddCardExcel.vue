<script setup lang="ts">
  import axios from 'axios'
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    axios
      .post('http://localhost:3000/api/card/upload', formData, {
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
</script>

<template>
  <div>
    <input
      type="file"
      @change="handleFileUpload($event)"
    />
  </div>
</template>

<style scoped></style>

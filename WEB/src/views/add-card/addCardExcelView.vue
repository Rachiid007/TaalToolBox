<template>
  <MainHeader />
  <div>
    <FileDrop
      class="container-drop"
      @upload="startUpload"
    />
  </div>
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue'
  import axios from 'axios'
  import MainHeader from '@/components/headers/MainHeader.vue'
  import { useUserStore } from '@/stores/user';

  const userStore = useUserStore()
  const sendFileToNest = (file: File) => {
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
  const FileDrop = defineAsyncComponent(
    () => import(/*webpackChunkName:"filedrop"*/ '@/components/card/add/FileDrop.vue')
  )
  function startUpload(files: File[]): void {
    files.map((file) => {
      console.log('uploading', file)
      sendFileToNest(file)
    })
  }
</script>

<style scoped>
  .container-drop {
    margin: 50px auto;
  }
</style>

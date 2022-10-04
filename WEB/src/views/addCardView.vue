<template>
  <div>
    <FileDrop
      class="container-drop"
      @upload="startUpload"
    />
  </div>
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue'

  const FileDrop = defineAsyncComponent(
    () => import(/*webpackChunkName:"filedrop"*/ '@/components/FileDrop.vue')
  )

  function startUpload(files: File[]): void {
    files.map((file) => console.log('uploading', file))
  }
</script>

<style scoped>
  .container-drop {
    margin: 50px auto;
  }
</style>

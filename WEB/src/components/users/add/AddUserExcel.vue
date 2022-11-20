<script setup lang="ts">
  import { ref } from 'vue'

  const file = ref<File | null>(null)

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files) {
      file.value = files[0]
      console.log(file.value)
    }
  }
</script>

<template>
  <h1 class="title">Add users Excel</h1>
  <div>
    <input
      type="file"
      ref="file"
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

<script setup lang="ts">
import MainHeader from "@/components/headers/MainHeader.vue"
import InfoLevel from "@/components/Info level/InfoLevel.vue"

</script>

<template>
    <div class="page">
        <MainHeader />
        <InfoLevel />
    </div>
</template>

<style scoped>
   .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
  }
</style>
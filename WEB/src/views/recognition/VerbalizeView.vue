<script setup lang="ts">
  import Verbalize from '@/components/prononciation/Verbalize.vue'
  import TheHeader from '@/components/TheHeader.vue'
</script>
<template>
  <div class="page">
    <TheHeader>
      <div class="title">
        <img
          class="headerLogo"
          src="@/assets/logo/verbalize.svg"
          alt="Verbalize gamemode logo"
        />
      </div>
    </TheHeader>
    <Verbalize />
  </div>
</template>
<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 15px;
    overflow-x: hidden;
  }
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .headerLogo {
    height: 55px;
    width: auto;
  }
</style>

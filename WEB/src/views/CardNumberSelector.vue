<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import CardNumber from '@/components/CardNumber.vue'
  import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <!-- <MainHeader /> -->
  <div class="page">
    <TheHeader>
      <div class="title">
        <p class="activity_name">Flash</p>
        <img src="@/assets/logo/lightning.svg" />
        <p class="activity_name">Cards</p>
      </div>
    </TheHeader>
    <CardNumber />
  </div>
</template>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 25px;
  }
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .activity_name {
    font-family: 'Courier New', monospace;
    font-family: microsan_A;
    color: #026b30;
    font-weight: 500;
    font-size: 2em;
  }
  img {
    height: auto;
    width: 10%;
  }
</style>

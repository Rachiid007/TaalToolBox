<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import ChooseActivities from '@/components/Activities/ChooseActivities.vue'
</script>
<template>
  <div class="page">
     <MainHeader /> 
     <ChooseActivities /> 
  </div>
</template>
<style scoped>
.page{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import userResponseTable from '@/components/userResponseStats/userResponseTable.vue'
  import schoolStatsTable from '@/components/userResponseStats/schoolStatsTable.vue'
  import { useUserStore } from '@/stores/user'
    import BarChart from '@/components/Charts/barChart.vue'
    import SuiviApprentissage from '@/components/Charts/barChart.vue'
  
  const userStore = useUserStore()
</script>

<template>
  <div class="page">
    <BarChart />
    <MainHeader />
    <schoolStatsTable />
    <userResponseTable />
   </div>
</template>

<style scoped>
  .page {
    /* border : solid red 1px ;  */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
    padding-top: 80px;
  }
</style>

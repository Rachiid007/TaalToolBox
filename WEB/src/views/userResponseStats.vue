<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import userResponseTable from '@/components/userResponseStats/userResponseTable.vue'
  import schoolStatsTable from '@/components/userResponseStats/schoolStatsTable.vue'
  import { useUserStore } from '@/stores/user'
  import ChartApp from '@/components/charts/barChart.vue'
  import pieChart from '@/components/charts/pieChart.vue'
  //import SuiviApprentissage from '@/components/charts/barChart.vue'

  const userStore = useUserStore()
</script>

<template>
  <div class="page">
    <Suspense>
      <MainHeader />
    </Suspense>
    <div class="container">
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Nombre d'élèves inscris par classe</th>
            <th>Nombre d'élèves actifs par classe</th>
          </tr>
        </thead>
        <tr>
          <td><pieChart /></td>
          <td><ChartApp /></td>
        </tr>
      </table>
    </div>
    <br />
    <br />
    <schoolStatsTable />

    <br />
    <br />
    <Suspense>
      <userResponseTable />
    </Suspense>
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
  .container {
    /* border: solid blue 1px; */
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1600px;
    height: auto;
  }
  table {
    width: 100%;
    border: 1px solid #ccc;
  }

  td {
    padding: 2px;
    border: 1px solid #ccc;
  }
  tr {
    padding: 2px;
    border: 1px solid #ccc;
  }

  .opened {
    background-color: yellow;
  }
</style>

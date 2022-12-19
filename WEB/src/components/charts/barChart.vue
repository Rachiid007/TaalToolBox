<template>
    <Bar :data="chartConfig" :options="thisoptions" />
</template>
  
  <script lang="ts">
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  import { Bar } from 'vue-chartjs'
  import statsServiceRessource from '@/services/statsService'
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  const arr1 : any[]=[]
  const arr2 : any[]=[]
  export default {
    name: 'ChartApp',
    components: {
      Bar
    },
    data : () => ({
      loaded: false,
      chartConfig: {
        labels: arr1,
        datasets: [
        {
          label: "Nombre",
          backgroundColor: '#F4D4D4',
          data: arr2
        }
      ]
      },
      thisoptions:{
        responsive: true,
        maintainAspectRatio: false
      }
    }),

    async mounted () {
    

    try {
      const statsService = new statsServiceRessource()
      const stats = await statsService.getActivePlayersStats()

      for (let i=0; i<stats.data.length;i++){
        this.chartConfig.labels.push(stats.data[i]["name"])
        this.chartConfig.datasets[0].data[i]=Number(stats.data[i]["count"])
      }
    } catch (e) {
      console.error(e)
    }
  }
}
  </script>
  
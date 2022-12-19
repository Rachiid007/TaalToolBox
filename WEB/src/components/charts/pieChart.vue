<template>
    <Pie v-if="loaded" :data="pieConfig"  :options="thisoptions"/>
  </template>
  
  <script lang="ts">
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie } from 'vue-chartjs'
  import statsServiceRessource from '@/services/statsService'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  const arr1 : any[]=[]
  const arr2 : any[]=[]
  const arr3 : any[]=[]
  export default {
    name: 'pieChart',
    components: {
      Pie
    },
    data: () => ({
      loaded: false,
      pieConfig: {
          labels: arr1,
          datasets: [
            {
              backgroundColor: arr2,
              data: arr3,
            }
          ] 
    },
      thisoptions:{
          responsive: true,
          maintainAspectRatio: false
        }
    }),
        
    async mounted () {
      
      let corporateColor=['#CAB8CB','#F4D4D4','#DCB69F','342A1F','#BDB8AD', '#EBE7E0', '#C6D4E1', '#44749D']
      let i=0
  
      try {
        const statsService = new statsServiceRessource()
        const stats = await statsService.getSubscriptionStats()
        stats.data.forEach((element:any) => {
          this.pieConfig.labels.push(element["schoolclass_name"])
          this.pieConfig.datasets[0].backgroundColor.push(corporateColor[i])
          this.pieConfig.datasets[0].data.push(element["count"])
          i++
        });
        console.log(this.pieConfig)
        this.loaded = true
      } catch (e) {
        console.error(e)
      }
    }
  }
  </script>
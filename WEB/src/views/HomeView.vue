<script setup lang="ts">
  import MainHeader from '@/components/headers/MainHeader.vue'
  import Footer from '@/components/footer/Footer.vue'
  import Greetings from '@/components/Greetings.vue'
</script>

<template>
  <div class="page">
    <MainHeader />
    <Greetings />
    <div class ="footer">
      <Footer/>
    </div>
    
    
  </div>
</template>

<style scoped>
  .page {
    /* border : solid red 1px ;  */
    position: relative;
   /* padding-bottom: 6.74rem;*/
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80px;
    gap: 25px;
    
  }

  .footer{
    /*position: absolute;*/
   /* position: absolute;*/
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 80px;
     
  
    
    
}
</style>

<script setup lang="ts"> 
import logo from '@/assets/logo/logo.svg'

</script>

<template>
    <div class="main1">

    <div class="item1">
      <router-link
      class="logo"
      to="/"
    >
      <div class="logo_img">
        <img
          class="main_logo"
          :src="logo"
        />
      </div>
      <p class="logo_title">TaalToolBox</p>
    </router-link>
    </div>

    <div class="item2">
      
      <router-link
          class="right_tab_element element2"
          to="/RGPD"
          
          >Utilisation des données</router-link
        >
        <router-link
         to="/chooseActivities"
         class="a_propos element2"
          >A Propos de nous</router-link
        >
        <router-link
          to="#"
          class="contact element2"
          >Contactez nous</router-link>
        
        <router-link
          class="copyright element2"
          to="/login"
          >copyright ©2022</router-link>
    </div>
        
 
    </div>
        
</template>

<style scoped>
.main1{
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
 /* position:absolute;*/
 /* right: 0;*/
 /* left: 0;*/
 /* bottom:0;*/
  width:100%;
  /*height:80px;  */
  background:#E0E0E0;
  padding-top: 20px;
  padding-bottom: 20px;
}

.logo{
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    gap: 5px;

}

.logo_img {
    /* outline: 1px solid red; */
    height: auto;
    display: flex;
    width: 20%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .main_logo {
    margin-bottom: 5px;
    /*min-width: 50px;*/
    width: 100%;
    height: auto;
  }

  .logo_title {
    font-size: 1.2em;
    text-align: left;
    color: #026b30;
    font-family: Didno;
  }

  .right_tab_element{
    font-size: 1.2em;
    color: #026b30;
    font-family: NotoSans-Regular;
    align-items: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    gap: 5px;

  }

  .a_propos{
    font-size: 1.2em;
    color: #026b30;
    font-family: NotoSans-Regular;
    align-items: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    gap: 5px;
  }

  .contact{
    font-size: 1.2em;
    color: #026b30;
    font-family: NotoSans-Regular;
    align-items: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    gap: 5px;

  }

  .copyright{
    font-size: 1.2em;
    color: #026b30;
    font-family: NotoSans-Regular;
    align-items: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    gap: 5px;

  }

  .item1{
    display: flex;
    font-size: 1em;
    width: 25%;

  }

  .item2{

    display: flex;
    flex-wrap: wrap;
    font-size: 1em;
    gap: 50px;
    width: 75%;

  }

  .element2{
    margin: 0;
  }

  @media(max-width:1200px){
    .item2{
    display: flex;
    flex-wrap: wrap;
    font-size: 0.8em;
    gap: 20px;
    }

    .logo{
    height: auto;
    width: 18%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    gap: 3px;


  }}

  
  @media(max-width:900px){
    .item2{
    display: flex;
    flex-wrap: wrap;
    font-size: 0.5em;
    gap: 5px;

  } 
  .logo_title {
    font-size: 1em;
    text-align: left;
    color: #026b30;
    font-family: Didno;
  }

  .main_logo {
    margin-bottom: 5px;
    min-width: 20px;
    width: 100%;
    height: auto;
  }
}

  
  
</style>

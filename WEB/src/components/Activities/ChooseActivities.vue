<script setup lang="ts">

import { ref, onMounted } from 'vue'

const details = ref()

const listActivities = {
    flashCards: "FlashCards", 
    DragAndLearn: "DragAndLearn"}

</script>
<template>
    <div class="main">
        <div class="title">
            <p class="text">Choisissez le type d'activité</p>
            <hr class = "ligne">
            <p class="underline"></p>
        </div>
        <div class="content">
            <div class="typeActi">
              <div class="carte">
               <img src="../../assets/logo/dalcard.svg" class="logo">
              </div>
              <div class="carte">
               <img src="../../assets/logo/flashcards.svg" class="logo">  
              </div>
            </div>
            <div class="description">
               <div class="descrTitle">Type sélectionné:</div>
               <div class="actiName">FlashCards</div>
               <div class="textDescrip">
                <p>Activité dans laquelle l'étudiant doit trouver de mots et doit s'autoevaluer. Les mots
                    sont representé sous forme de carte. Un systeme de poids est mise en place pour que les
                    cartes plus dure de l'élève réaparaissent le plus souvent.
                </p>
               </div>
               <div>
                <button class="button">Créer une activité</button>
               </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.main{
     gap: 20px;
     padding:40px;
     display: flex;
     flex-direction: column;
     align-items: center;
}
 
.title {
}

.carte{
   display: flex;
   align-items: center;
   justify-content: center;
   width: 18%;
   height: 45%;
   border: 2px solid grey; 
   border-radius: 15px;
   box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.10) 0px 8px 10px;
   padding: 5px;
   margin-bottom: 17px;
    
}

hr.ligne{
  /* border: 4px solid green;
  border-radius: 5px;   */
  border: 1px solid green;
  background-color: green;
}

.text{
    font-size: 1.8em;
    color: grey;
}
.content{
    gap:5%;
    /* width: 90%;
    height: 50%; */
    display: flex;
    flex-direction:row;
    /* align-items: center; */
    justify-content: center;
    width: 100%;
    height: 100vh;
    
}
.typeActi{
    gap: 3%;
    height: 60%;
    display: flex; 
    flex-direction: row; 
    /* align-items: flex-start; */
    border: 1px black solid;
    border-radius: 5px;
   
    width: 65%;
     
    padding: 20px;
}

.descrTitle{
    color: green;
    font-size: 1em;
}

.description{
    border: solid 1px black;
    /* width: 20%; */
    border-radius: 5px;
    padding: 25px 10px;
    padding-left: 30px;
    padding-right: 30px;
    width: 20%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
}
.actiName{
    font-size: 1.2em;
    color: grey;
}
.button{
    background-color: green;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    color: white;
    padding: 8px 12px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
}
.textDescrip{
    text-align: center;
    /* font-family:monospace; */
}
.logo{
    width:90%;
    height: auto;
}
</style>
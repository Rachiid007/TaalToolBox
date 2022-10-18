<script setup lang="ts">

</script>
<template>
    <div class="main">
        <div class="title">
            <p class="text">Choisissez le type d'activité</p>
            <hr class = "ligne">
            <p class="underline"></p>
        </div>
        <div class="content">
            <div class="typeActi">Photo activité</div>
            <div class="description">
               <div class="descrTitle">Type sélectionné:</div>
               <div class="actiName">FlashCards</div>
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
     padding:   40px;
     display: flex;
     flex-direction: column;
     align-items: center;
}
 
.title {
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
    gap: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.typeActi{
    border: 1px solid black;
   padding: 5em;
}

.descrTitle{
    color: green;
    font-size: 1em;
}

.description{
    border: 1px solid black;
    padding: 5vmax;
}
.actiName{
    font-size: 1.2em;
    color: grey;
}
.button{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    height: 30px;
    background-color: green;
    border-radius: 5px;
    cursor: pointer;
    /* transition: all 0.2s ease-in-out; */
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    padding-bottom:20px;
}
</style>
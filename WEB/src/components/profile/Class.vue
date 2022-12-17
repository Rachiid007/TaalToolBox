<template>
    <div class="class" v-if="user.schoolclass">
        <div class="title">
            <b>Classe</b>
        </div> 
        <div class="school">
            <b>Ecole: </b>{{user.school}}
        </div>
        <div class="class">
            <b>Classe: </b>{{user.schoolclass[0]}}
        </div>
    </div>
    <div class="class2" v-else>
        <div class="title">
            <b>Classe</b>
        </div> 
        <div class="school">
            <b>Ecole: </b>
        </div>
        <div class="class">
            <b>Classe: </b>
        </div>
    </div>
</template>

<script  setup lang="ts">
const user_json = localStorage.getItem('user');
let user = {school: null, schoolclass: null};

if (user_json){
    user = JSON.parse(user_json);
}
//console.log(user)
</script>
<style>
    .title{
        text-align: center;
        font-size: 40px;
    }
</style>
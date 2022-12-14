<template>
    <div class="title">
        <b>Classe</b>
    </div> 
    <div class="school">
        <b>Ecole: </b>{{user.school}}
    </div>
    <div class="class">
        <b>Classe: </b>{{user.schoolclass[0]}}
    </div>
</template>

<script  setup lang="ts">
const user_json = localStorage.getItem('user');
const user = JSON.parse(user_json);
//console.log(user)
</script>
<style>
    .title{
        text-align: center;
        font-size: 40px;
    }
</style>
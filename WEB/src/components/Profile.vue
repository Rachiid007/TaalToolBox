<template>
    <div class="profile">
        <div class="prenom">
            Prenom
        </div>
        <div class="nom"> 
            Nom
        </div>
        <div class="photo">
            <img src="https://i.goopics.net/7rqy9u.jpg" width="200" height="200">
        </div>
    </div>
</template>

<script  setup lang="ts">

</script>

<style>
    .profile{
        display: block;
        float: left;
        font-size: 28px;
        width: 80%;
        border: ridge 5px #cccccc;
        height: 20em;
        margin-top: 6%;
        margin-left: 2%;
        padding: 5%;
    }
    .photo{
        display: block;
        float: right;
    }
</style>
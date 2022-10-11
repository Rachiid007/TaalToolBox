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
        width: 90%;
        border: solid #000000;
        height: 13em;
        margin-top: 70px;
    }
    .photo{
        display: block;
        float: right;
    }
</style>
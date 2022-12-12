<template>
    <div class="profile">
        <div class="name">
            {{user.name}} {{user.surname}}
        </div>
        <div class="mail">
            Adresse mail: {{user.email}}
        </div>
        <div class="birthdate">
            Date de naissance: {{birthdate}}
        </div>
        <div class="phone">
            Télephone: {{user.phone}}
        </div>
        <div class="photo">
            <img src="https://i.goopics.net/7rqy9u.jpg" width="200" height="200">
        </div>
    </div>
</template>

<script  setup lang="ts">
    const user_json = localStorage.getItem('user');
    const user = JSON.parse(user_json);
    const birthdateStr = user.birthdate;
    const birthdateTab = birthdateStr.split('-');
    const birthdate = birthdateTab[2] + '/' + birthdateTab[1] + '/' + birthdateTab[0];
</script>

<style>
    .name{
        text-align: center;
        font-size: 40px;
    }
    .photo{
        display: block;
        float: right;
    }
</style>
<template>
    <div class="profile">
        <div class="name">
            {{user.name}} {{user.surname}}
        </div>
        <div class="mail">
            <p style="float:left"><img src="https://i.goopics.net/b4v2r4.png" width="20" height="0"></p><p><b> Mail:</b> {{user.email}}</p>
        </div>
        <div class="birthdate">
            <p style="float:left"><img src="https://i.goopics.net/vnaji7.png" width="20" height="0"></p><b>Naissance:</b> {{birthdate}}
        </div>
        <div class="phone">
            <p style="float:left"><img src="https://i.goopics.net/u7c814.png" width="20" height="0"></p><b> Télephone:</b> {{user.phone}}
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
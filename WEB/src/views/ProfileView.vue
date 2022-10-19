<script setup lang="ts">
  import Profile from '@/components/Profile.vue'
  import Class from '@/components/Class.vue'
  import Success from '@/components/Success.vue'
  import MainHeader from '@/components/headers/MainHeader.vue'
  import { ref } from 'vue'
  //const store = useCardStore()
  //const remaining = computed(() => store.remaining)
  const compProfile = ref(true)
  const compClass = ref(true)
  const compSuccess = ref(true)

  function showProfile(){
    compProfile.value = true
    compClass.value = false
    compSuccess.value = false
  }
  function showClass(){
    compProfile.value = false
    compClass.value = true
    compSuccess.value = false
  }
  function showSuccess(){
    compProfile.value = false
    compClass.value = false
    compSuccess.value = true
  }
  function logOut(){
    //à completer
  }
</script>

<template>
  <div>
    <MainHeader />
  </div>
  <div class="contents">
    <div class="buttons">
      <button @click="showProfile">
        Profil
      </button>
      <button @click="showClass">
        Classe
      </button>
      <button @click="showSuccess">
        Succés
      </button>
      <button @click="logOut">
        Log out
      </button>
    </div>
    <div class="compP">
      <div v-if="compProfile">
        <Profile />
      </div>
      <div v-else-if="compClass">
        <Class />
      </div>
      <div v-else="compSuccess">
        <Success />
      </div>
    </div>
  </div>
</template>

<style scoped>

  button {
    display: block;
    background-color: #fdfdfd;
    /*border-radius: 10px;*/
    border: 4px double #cccccc;
    color: #242928;
    text-align: center;
    font-size: 28px;
    padding: 40px;
    margin: 8%;
    width: 100%;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    cursor: pointer;
  }
  button:hover {
    background-color: green;
  }
  .buttons{
    float: left;
    margin-top: 5%;
  }
</style>

<script setup lang="ts">
  import Profile from '@/components/profile/Profile.vue'
  import Class from '@/components/profile/Class.vue'
  import Success from '@/components/profile/Success.vue'
  import MainHeader from '@/components/headers/MainHeader.vue'
  import { useUserStore } from '@/stores/user'
  import { ref } from 'vue'
  const userStore = useUserStore()
  //const store = useCardStore()
  //const remaining = computed(() => store.remaining)
  console.log(localStorage.getItem('user'))
  const comp = ref(0)

  function changeComp(nb: number){
    comp.value = nb;
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
      <button @click="changeComp(0)">
        Profil
      </button>
      <button @click="changeComp(1)">
        Classe
      </button>
      <button @click="changeComp(2)">
        Succès
      </button>
      <button @click="logOut">
        Log out
      </button>
    </div>
    <div class="compP">
      <div v-if="comp == 0">
        <Profile />
      </div>
      <div v-else-if="comp == 1">
        <Class />
      </div>
      <div v-else="comp == 2">
        <Success />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .contents{
    display: flex;
    flex-direction: row;
  }
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
  .compP{
    border: ridge 5px #cccccc;
    height: 20em;
    margin-top: 6%;
    margin-left: 2%;
    padding: 5%;
    width: 80%;
    display: block;
    float: left;
    font-size: 28px;
  }
</style>

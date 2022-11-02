<script setup lang="ts">
  import Login from '@/components/Login.vue'
  import SignIn from '@/components/SignIn.vue'
  import { ref, reactive } from 'vue'

  const state = reactive({ connection: 'connection1', inscription: 'inscription1' })
  const showConnection = ref(true)

  const swapToFalse = () => {
    showConnection.value = false
    state.connection = 'connection2'
    state.inscription = 'inscription2'
  }
  const swapToTrue = () => {
    showConnection.value = true
    state.connection = 'connection1'
    state.inscription = 'inscription1'
  }
</script>

<template>
  <div class="master">
    <div class="component">
      <div class="title">
        <p
          :id="state.connection"
          ref="connection"
          class="connectInscri"
          @click="swapToTrue"
        >
          Connexion
        </p>
        <p
          :id="state.inscription"
          ref="inscription"
          class="connectInscri"
          @click="swapToFalse"
        >
          Inscription
        </p>
      </div>
      <div>
        <Login v-if="showConnection" />
        <SignIn v-else />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .master {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1600px;
    width: 100vw;
    margin-top: 70px;
    font-family: NotoSans-Regular;
    color: #707070;
    z-index: 1;
  }
  .component {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid grey 1px;
    max-width: 450px;
  }
  .title {
    display: flex;
    flex-direction: row;
    min-width: 400px;
    width: 100%;
  }
  .connectInscri {
    flex-grow: 5;
    border-bottom: solid 1px grey;
    /* padding: 10px 5% 10px 5%; */
    font-size: 1.5em;
    cursor: pointer;
  }

  #connection1 {
    background-color: #026b30;
    color: white;
  }
  #inscription1 {
    background-color: white;
    color: grey;
  }

  #connection2 {
    background-color: white;
    color: grey;
  }
  #inscription2 {
    background-color: #026b30;
    color: white;
  }
</style>

<script lang="ts">
import Login from './Login.vue'
import SignIn from './SignIn.vue'

export default {
  name: 'SinLog',
  components: {
    Login,
    SignIn
    // Container
  },
  data() {
    return { showConnection: true }
  },
  methods: {
    swapToFalse() {
      this.showConnection = false
      document.getElementById('connection').style.backgroundColor = 'white'
      document.getElementById('connection').style.color = 'grey'
      document.getElementById('inscription').style.backgroundColor = '#026b30'
      document.getElementById('inscription').style.color = 'white'
    },
    swapToTrue() {
      this.showConnection = true
      document.getElementById('connection').style.backgroundColor = '#026b30'
      document.getElementById('connection').style.color = 'white'
      document.getElementById('inscription').style.backgroundColor = 'white'
      document.getElementById('inscription').style.color = 'grey'
    }
  }
}
</script>

<template>
  <div class="master">
    <div class="component">
      <div class="title">
        <p id="connection" class="connectInscri" @click="swapToTrue">Connection</p>
        <p id="inscription" class="connectInscri" @click="swapToFalse">Inscription</p>
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
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid grey 1px;
}
.title {
  display: flex;
  flex-direction: row;
}
.connectInscri {
  border-bottom: solid 1px grey;
  padding: 10px 50px 10px 50px;
  font-size: 1.5em;
  cursor: pointer;
}
#connection {
  background-color: #026b30;
  color: white;
}
#inscription {
  background-color: white;
  color: grey;
}
</style>

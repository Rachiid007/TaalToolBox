<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import type { Ref } from 'vue'
  import logo from '@/assets/logo/mic-logo.svg'

  const micAccess: Ref<boolean> = ref(false)

  const player: any = ref(null)
  const mediaRecorder: any = ref(null)
  const dataList: Ref<never[] | []> = ref([])

  const soundBlob: Ref<null | Blob> = ref(null)
  const soundData: Ref<null | File> = ref(null)

  const audioUrl: Ref<null | string> = ref(null)

  // Utilisé pour activer / désactiver les console.log
  const debugMode = true

  const debug = (param: any) => {
    if (debugMode) {
      console.log(param)
    }
  }

  // Si l'utilisateur à accordé l'accès au micro on crée un nouveau MediaRecorder
  const handleSuccess = (stream: any) => {
    micAccess.value = true
    mediaRecorder.value = new MediaRecorder(stream)
  }

  // On regarde si l'utilisateur à accordé l'accès | On demande à l'utilisateur pour accéder au micro
  const grandAcces = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess)
      .catch((error: any) => {
        console.log(error)
      })
  }

  // Quand on clic sur le bouton du micro soit on démare l'enregistrement soit on le coupe
  const recordClicked = () => {
    if (mediaRecorder.value.state == 'recording') {
      // On coupe le record
      mediaRecorder.value.stop()
      debug(mediaRecorder.value.state)
      debug(dataList.value)

      // On met un set timeout pour qu'il ai bien le temps de mettre les valeurs dans dataList
      setTimeout(() => {
        // On crée un nouveau Blob à partir de ces données et on le stocke dans une ref
        soundBlob.value = new Blob(dataList.value, { type: 'audio/wav; codecs=opus' })
        audioUrl.value = window.URL.createObjectURL(soundBlob.value)
        // On assigne le blob en temps que source de la balise audio pour que l'utilisateur puisse s'écouter
        player.value.src = audioUrl.value
        // On crée un nouveau fichier à partir des informations contenues dans le Blob
        soundData.value = new File([audioUrl.value], 'record')
        // On réinitialise le tableau de données
        dataList.value = []
      }, 1000)
      // Si le record n'est pas lancé on rentre ici
    } else {
      // On lance l'enregistrement
      mediaRecorder.value.start()
      debug(mediaRecorder.value.state)
      // Quand les données sont disponibles => Donc quand on arrête l'enregistrement, on met les données dans la liste de données "dataList"
      mediaRecorder.value.ondataavailable = (e: any | never) => {
        dataList.value.push(e.data)
      }
    }
  }

  onMounted(() => {
    // Quand le composant est chargé, on demande l'accès au micro
    // grandAcces()
    navigator.permissions.query({ name: 'microphone' }).then((result) => {
      if (result.state == 'granted' || result.state == 'prompt') {
        grandAcces()
      }
    })
  })
</script>
<template>
  <div class="main">
    <h1 class="title">Prononcer le mot:</h1>
    <p class="word">Elektriciteit</p>
    <div
      class="recorder"
      @click="recordClicked"
    >
      <img
        :src="logo"
        alt="mic recorder logo"
        class="mic_logo"
      />
    </div>
    <p class="desc">Appuyer pour enregister</p>
    <audio
      ref="player"
      controls
      volume="0.5"
      style="margin-top: 25px; outline: none"
    ></audio>
    <h2
      class="no_acces"
      v-if="!micAccess"
    >
      Veuillez accorder l'accès au microphone et rafraichir la page pour que l'activité puisse
      fonctionner
    </h2>
  </div>
</template>
<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    max-width: 1600px;
  }
  .title {
    color: var(--second-verbalize-color);
    font-size: 35px;
    font-family: 'Corbel';
    margin-top: 35px;
  }
  .word {
    color: var(--main-verbalize-color);
    font-size: 30px;
    font-weight: bold;
    font-family: 'Corbel';
  }
  .recorder {
    display: flex;
    justify-content: center;
    border: 5px solid var(--second-verbalize-color);
    border-radius: 50%;
    /* padding: 30px 0; */
    width: 10%;
    margin-top: 100px;
    aspect-ratio: 1;
    cursor: pointer;
    transition: 0.5s ease;
    background: transparent;
  }
  .recorder:hover {
    box-shadow: inset 0 0 15px -1px rgb(178, 0, 255, 0.5);
    transition: 0.2s ease;
  }
  .mic_logo {
    width: 40%;
    height: auto;
  }
  .desc {
    color: var(--second-verbalize-color);
    font-size: 30px;
    padding-top: 5px;
    font-family: 'Corbel';
  }
  .no_acces {
    color: red;
    font-size: 22px;
    padding: 25px 10px;
    font-weight: bold;
    opacity: 0;
    animation: appear 0.5s ease 2s forwards;
  }
  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>

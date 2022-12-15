<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import type { Ref, Component } from 'vue'
  import logo from '@/assets/logo/mic-logo.svg'
  import axios from 'axios'
  import { encodeWavFileFromAudioBuffer } from 'wav-file-encoder'

  const micAccess: Ref<boolean> = ref(false)
  const audioContext: Ref<AudioContext | null> = ref(null)

  const player: Ref<HTMLImageElement | null> = ref(null)
  const mediaRecorder: Ref<MediaRecorder | null> = ref(null)
  const dataList: Ref<any[]> = ref([])

  const soundBlob: Ref<null | Blob> = ref(null)
  // const soundData: Ref<null | File> = ref(null)
  const soundName: Ref<string> = ref('')

  const recording: Ref<boolean> = ref(false)
  const recordingState: Ref<any> = ref(null)

  const playerDisplay = ref(false)

  const recorderStateClass: Ref<string> = ref('recorder_state')

  const prononc_result: Ref<{ prononciation: boolean | string; word: string }> = ref({
    prononciation: false,
    word: ''
  })
  const goodResponse: Ref<boolean> = ref(false)
  const badResponse: Ref<boolean> = ref(false)
  const errorResponse: Ref<boolean> = ref(false)

  // Utilisé pour activer / désactiver les console.log
  const debugMode = false

  const debug = (param: any) => {
    if (debugMode) {
      console.log(param)
    }
  }

  // Si l'utilisateur à accordé l'accès au micro on crée un nouveau MediaRecorder
  const handleSuccess = (stream: any) => {
    debug(stream)
    micAccess.value = true
    mediaRecorder.value = new MediaRecorder(stream)
    audioContext.value = new window.AudioContext()
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
    if (mediaRecorder.value?.state == 'recording') {
      // On coupe le record
      mediaRecorder.value?.stop()
      recording.value = false
      recordingState.value.style.visibility = 'hidden'
      debug(mediaRecorder.value.state)
      debug(dataList.value)
      playerDisplay.value = true

      // On met un set timeout pour qu'il ai bien le temps de mettre les valeurs dans dataList
      // On va prendre l'ArrayBuffer contenu dans le blob et le reconvertir en .wav (car de base on peut uniquement record en .webm avec js)
      setTimeout(() => {
        debug(audioContext.value)
        debug(mediaRecorder.value)
        debug(dataList.value[0])
        dataList.value[0].arrayBuffer().then((response: ArrayBuffer) => {
          debug(response)
          audioContext.value?.decodeAudioData(response).then((audioBuff: AudioBuffer) => {
            const arrayBuffer: ArrayBuffer = encodeWavFileFromAudioBuffer(audioBuff, 0)
            debug(arrayBuffer)

            // On crée un nouveau Blob à partir de ces données
            soundBlob.value = new Blob([arrayBuffer], { type: 'audio/wav' })
            debug(soundBlob.value)
            const audioUrl: string = window.URL.createObjectURL(soundBlob.value)

            // On assigne le blob en temps que source de la balise audio pour que l'utilisateur puisse s'écouter
            soundName.value = audioUrl
            player.value!.src = soundName.value

            // On crée un nouveau fichier à partir des informations contenues dans le Blob
            // soundData.value = new File([audioUrl.value], 'record')

            // On réinitialise le tableau de données
            dataList.value = []
          })
        })
      }, 1)
      // Si le record n'est pas lancé on rentre ici
    } else {
      // On lance l'enregistrement
      // Quand les données sont disponibles => Donc quand on arrête l'enregistrement, on met les données dans la liste de données "dataList"
      mediaRecorder.value?.start()

      recording.value = true
      goodResponse.value = false
      badResponse.value = false
      errorResponse.value = false
      recordingState.value.style.visibility = 'visible'

      debug(mediaRecorder.value?.state)

      if (mediaRecorder.value) {
        mediaRecorder.value.ondataavailable = (e: any) => {
          dataList.value.push(e.data)
        }
      }
    }
  }

  const sendToDjango = () => {
    let formData = new FormData()
    formData.append('data', soundBlob.value!, soundName.value)
    formData.append('word', 'bestelling')

    axios
      .post('http://localhost:8000/polls/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
          // 'Access-Control-Allow-Origin': '*'
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .then((response) => {
        console.log(response)
        prononc_result.value = response.data
        if (prononc_result.value.prononciation) {
          prononc_result.value.prononciation == 'error'
            ? (errorResponse.value = true)
            : (goodResponse.value = true)
        } else {
          badResponse.value = true
        }
        // router.push('/')
      })
  }

  onMounted(() => {
    // Quand le composant est chargé, on demande l'accès au micro
    // grandAcces()
    let permission: any = { name: 'microphone' }
    navigator.permissions.query(permission).then((result) => {
      if (result.state == 'granted' || result.state == 'prompt') {
        grandAcces()
      }
    })
  })
</script>
<template>
  <div class="main">
    <h1 class="title">Prononcer le mot:</h1>
    <p class="word">Bestelling</p>
    <p
      :class="recorderStateClass"
      ref="recordingState"
    >
      Enregistrement en cours
    </p>
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
    <div class="last_row">
      <audio
        ref="player"
        controls
        volume="0.5"
        style="outline: none"
        v-if="playerDisplay"
      ></audio>
      <button
        @click="sendToDjango"
        class="send"
        v-if="playerDisplay && !recording"
      >
        Vérifier
      </button>
    </div>
  </div>
  <h2
    class="no_acces"
    v-if="!micAccess"
  >
    Veuillez accorder l'accès au microphone et rafraichir la page pour que l'activité puisse
    fonctionner
  </h2>
  <h2
    class="response good_res"
    v-if="goodResponse"
  >
    Félicitation, vous avez bien prononcé le mot !
  </h2>
  <h2
    class="response bad_res"
    v-if="badResponse"
  >
    Dommage, vous avez mal prononcé le mot. Réessayer !
  </h2>
  <h2
    class="response error_res"
    v-if="errorResponse"
  >
    Une erreur est survenue lors de la vérification de la prononciation. Réessayer!
  </h2>
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
    margin-top: 10px;
  }
  .word {
    color: var(--main-verbalize-color);
    font-size: 30px;
    font-weight: bold;
    font-family: 'Corbel';
  }
  .recorder_state {
    color: red;
    font-size: 25px;
    text-align: center;
    margin: 20px 0;
    visibility: hidden;
  }
  #active {
    visibility: visible;
  }
  .recorder {
    display: flex;
    justify-content: center;
    border: 5px solid var(--second-verbalize-color);
    border-radius: 50%;
    /* padding: 30px 0; */
    width: 150px;
    /* margin-top: 100px; */
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
    font-size: 25px;
    padding-top: 5px;
    font-family: 'Corbel';
  }
  .last_row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    gap: 25px;
  }
  .no_acces {
    color: red;
    font-size: 22px;
    padding: 25px 10px;
    font-weight: bold;
    opacity: 0;
    animation: appear 0.5s ease 2s forwards;
  }
  .send {
    border: 2px solid var(--main-verbalize-color);
    color: var(--second-verbalize-color);
    padding: 12px 25px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    transition: 0.2s ease;
  }
  .send:hover {
    background: rgb(178, 0, 255, 0.1);
    transform: scale(1.05);
    transition: 0.2s ease;
  }
  .response {
    margin-top: 25px;
    font-size: 25px;
    color: green;
    font-weight: 500;
    text-align: center;
  }
  .good_res {
    color: green;
  }
  .bad_res {
    color: red;
  }
  .error_res {
    color: var(--main-verbalize-color);
  }
  @media (max-width: 900px) {
    .recorder {
      width: 40%;
    }
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

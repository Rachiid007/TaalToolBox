<script setup lang="ts">
  import Map from 'ol/Map'
  import Overlay from 'ol/Overlay'
  import TileLayer from 'ol/layer/Tile'
  import View from 'ol/View'
  import XYZ from 'ol/source/XYZ'
  import { toLonLat } from 'ol/proj'
  import { toStringHDMS } from 'ol/coordinate'
  import { OSM } from 'ol/source'
  import { onMounted, ref } from 'vue'

  const onCloserClick = () => {
    document.getElementById('popup').style.display = 'none'
    // closer.style.display = 'none'
    return false
  }
  const closer = document.getElementById('popup-closer')
  onMounted(() => {
    const container = document.getElementById('popup')
    const content = document.getElementById('popup-content')

    const overlay = new Overlay({
      element: container,
      autoPan: {
        animation: {
          duration: 250
        }
      }
    })

    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      overlays: [overlay],
      target: 'map',
      view: new View({
        center: [485151.97, 6586152.84],
        // center: fromLonLat([4.39064, 50.83756]),
        zoom: 12
      })
    })

    map.on('singleclick', function (evt) {
      const coordinate = evt.coordinate
      document.getElementById('popup').style.display = 'block'
      overlay.setPosition(coordinate)
    })
  })
</script>

<template>
  <div
    id="map"
    class="map"
  ></div>
  <div
    id="popup"
    class="ol-popup"
  >
    <a
      href="#"
      id="popup-closer"
      class="ol-popup-closer"
      @click="onCloserClick"
    ></a>
    <div
      id="popup-content"
      class="popup-content"
    >
      <p class="popup-title">Level 1</p>
      <p class="level-details">Quizz Flashcard 1</p>
      <img
        class="gamemode-image"
        src="@/assets/logo/flashcards.svg"
        alt="flashcards gamemode logo"
      />
      <router-link
        to="/CardNumberSelector"
        class="playButton"
        >PLAY</router-link
      >
    </div>
  </div>
</template>
<style scoped>
  .map {
    width: 100%;
    height: 100vh;
  }
  .ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    gap: 45px;
  }
  .ol-popup:after,
  .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
  .popup-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  .popup-title {
    color: #026b30;
    font-size: 1.2em;
    font-weight: bold;
  }
  .level-details {
    color: #707070;
    font-size: 1.1em;
    font-weight: bold;
  }
  .gamemode-image {
    margin-top: 15px;
    width: 50%;
    height: auto;
  }
  .playButton {
    margin-top: 15px;
    background: #026b30;
    color: white;
    border-radius: 5px;
    padding: 5px;
    width: 80%;
  }
  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }
  .ol-popup-closer:after {
    content: '✖';
  }
</style>

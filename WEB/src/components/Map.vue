<template>
  <div id="map"></div>
</template>

<script>
import { Map, View } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import { OSM } from 'ol/source'
import MapView from '../views/MapView.vue'

export default {
  name: 'Map',
  mounted() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
          // name: "OSM",
        })
      ],
      view: new View({
        // center: [-9869708.964428628, 4908948.052576464],
        center: [485151.97, 6586152.84],
        // center: [5634052.84, 595151.97],
        zoom: 12
      })
    })
    this.$store.commit('setMap', this.map)
  }
}
</script>

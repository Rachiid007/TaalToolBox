<template>
  <div id="map"></div>
</template>

<script>
import { Map, View } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import { OSM } from 'ol/source'
import MapView from "../views/MapView.vue"

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
        center: [-9869708.964428628, 4908948.052576464],
        zoom: 4
      })
    })

    this.$store.commit('setMap', this.map)
  }
}
</script>

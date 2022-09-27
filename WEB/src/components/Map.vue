<template>
  <div id="map"></div>
</template>

<script>
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Map, View, Feature } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM,Vector as VectorSource } from 'ol/source'
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
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point(fromLonLat([4.39064, 50.83756])) //[4.39064, 50.83756]
              })
            ]
          })
        })
      ],
      view: new View({
        center: [485151.97, 6586152.84],
        // center: fromLonLat([4.39064, 50.83756]),
        zoom: 12
      })
    })
    // var layer = new VectorL({
    //   source: new VectorS({
    //     features: [
    //       new Feature({
    //         geometry: new Point(fromLonLat([4.39064, 50.83756])) //[4.39064, 50.83756]
    //       })
    //     ]
    //   })
    // })
    // this.map.addLayer(layer)

    // this.$store.commit('setMap', this.map)
  }
}
</script>

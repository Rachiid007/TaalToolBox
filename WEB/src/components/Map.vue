<template>
  <div id="map"></div>
</template>

<script setup>
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Map, View, Feature } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM, Vector as VectorSource } from 'ol/source'
import { Icon, Style } from 'ol/style'
import { Modify } from 'ol/interaction'
import MapView from '../views/MapView.vue'
import { onMounted, ref } from 'vue'
import useMapStore from '../stores/map'

const mapStore = useMapStore()

const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'src/assets/images/geo-alt-isj.svg',
  })
})

const ISJFeature = new Feature({
  geometry: new Point(fromLonLat([4.39064, 50.83756])), //[4.39064, 50.83756],
  name: 'Institut Saint Joseph'
})

const IDBFeature = new Feature({
  geometry: new Point(fromLonLat([4.42537, 50.83826])) //[4.39064, 50.83756]
})

const ICMFeature = new Feature({
  geometry: new Point(fromLonLat([4.37576, 50.87358])) //[4.39064, 50.83756]
})
ISJFeature.setStyle(iconStyle)
IDBFeature.setStyle(iconStyle)
ICMFeature.setStyle(iconStyle)

onMounted(() => {
  // mapStore.setMap(
  const map2 = ref(
    new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
          // name: "OSM",
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [ISJFeature]
          })
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [IDBFeature]
          })
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [ICMFeature]
          })
        })
      ],
      view: new View({
        center: [485151.97, 6586152.84],
        // center: fromLonLat([4.39064, 50.83756]),
        zoom: 12
      })
    })
  )
  console.log(map2)
})
// this.$store.commit('setMap', this.map)
// }:
</script>

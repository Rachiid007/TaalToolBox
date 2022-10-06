<template>
  <div id="map"></div>
</template>
<script setup lang="ts">

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
  import router from '@/router'
  import { viewDepthKey } from 'vue-router'

  const mapStore = useMapStore()

  const iconStyle = new Style({
    // stroke: new Stroke({
    //       width: 5,
    //       color: "#ff0000"
    //     },
    image: new Icon({
      anchor: [0.5, 45],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'src/assets/images/localisation_icon.svg',
      scale: 0.5
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
  const featureListener = function () {
    console.log('featureListenerCalled')
    alert('Feature Listener Called')
  }

  onMounted(() => {
    // mapStore.setMap(
    const map2 = new Map({
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
        ],
        view: new View({
          center: [485151.97, 6586152.84],
          // center: fromLonLat([4.39064, 50.83756]),
          zoom: 12
        })
      ],
      view: new View({
        center: [489151.97, 6594152.84],
        // center: fromLonLat([4.39064, 50.83756]),
        zoom: 12,
        minZoom: 11
      })
    })
    map2.on('singleclick', function (evt) {
      map2.forEachFeatureAtPixel(evt.pixel, function (feature, layer: any) {
        // let source = layer.getSource()
        // console.log(layer)
        // console.log(feature)
        router.push({ name: 'CardNumberSelector' })
      })
    })
    console.log(map2.getLayers())
    console.log(map2)
  })
  // this.$store.commit('setMap', this.map)
  // }:
</script>

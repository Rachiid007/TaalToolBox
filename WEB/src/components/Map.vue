<script setup lang="ts">
  import 'ol-popup/src/ol-popup.css'
  import 'ol/ol.css'
  import Overlay from 'ol/Overlay'
  import TileLayer from 'ol/layer/Tile'
  import XYZ from 'ol/source/XYZ'
  import { toLonLat } from 'ol/proj'
  import { toStringHDMS } from 'ol/coordinate'
  import { OSM } from 'ol/source'
  import { onMounted, ref, reactive, Transition } from 'vue'
  import { Icon, Style } from 'ol/style'
  import { Point } from 'ol/geom'
  import { fromLonLat, transform } from 'ol/proj'
  import { ApiKeyManager } from '@esri/arcgis-rest-request'
  import { geocode, type IGeocodeResponse } from '@esri/arcgis-rest-geocoding'
  import { Map, View, Feature } from 'ol'
  import { Vector as VectorLayer } from 'ol/layer'
  import { Vector as VectorSource } from 'ol/source'
  import { Control, defaults as defaultControls } from 'ol/control'
  import { defaults as defaultInteractions } from 'ol/interaction.js'
  import geoCoderSvg from '@/assets/images/geo-marker.svg'
  import { RouterLink } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  // import { Popup } from 'ol-popup';
  //
  //
  // TODO: Essayer de régler ce typeScript de m*rde
  //
  //

  // Cette ref correspond à la div du popup
  const userRole = useUserStore().user.role
  const userSchool = useUserStore().user.school
  const userReward = useUserStore().userReward
  // const schoolUser = useUserStore().user.

  const popup = ref(null)

  const map = ref()

  const isMobile = ref(false)
  // On utilise cet état pour afficher ou désafficher le popup
  const popupVisibility = ref(false)
  // Cette ref permet de stocker le nom du niveau à ensuite afficher
  const levelName = ref('')
  // Cette ref permet de stocker le numéro du niveau à ensuite afficher
  const levelNumber = ref(1)
  // Pour changer le type de partie on utilise gamemode
  const gamemode = ref(1)
  // Ici on stocke les différents points que l'on va afficher sur la map

  const pointState = reactive({
    points: [
      {
        label: 'Institut Saint Joseph',
        coordinates: [4.39064, 50.83756],
        levelId: 1
      },
      {
        coordinates: [4.42537, 50.83826], //[4.39064, 50.83756]
        label: 'Institut Don Bosco',
        levelId: 2
      },
      {
        coordinates: [4.37576, 50.87358], //[4.39064, 50.83756]
        label: 'Institut Cardinal Mercier',
        levelId: 3
      }
    ]
  })
  // Permet de désactiver le dézoom et les mouvements sur la carte quand le popup est ouvert
  const allowControls = ref(true)

  const onCloserClick = () => {
    popupVisibility.value = false
    // closer.style.display = 'none'
    for (let intercation in map.value.getInteractions().getArray()) {
      let template = map.value.getInteractions().getArray()
      template[intercation].setActive(true)
    }
    return false
  }

  onMounted(() => {
    let mobileNav = false

    //On regarde si l'utilisateur est sur un mobile ou pas grace à son os
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
      mobileNav = true
    }

    //On regarde si l'utilisateur est sur un mobile ou pas grace à l'option touch screen
    'ontouchstart' in document.documentElement || mobileNav
      ? (isMobile.value = true)
      : (isMobile.value = false)

    // OUVERTURE DU POPUP
    function setActive() {
      for (let intercation in map.value.getInteractions().getArray()) {
        let template = map.value.getInteractions().getArray()
        template[intercation].setActive(true)
      }
    }

    function setNotActive() {
      for (let intercation in map.value.getInteractions().getArray()) {
        let template = map.value.getInteractions().getArray()
        template[intercation].setActive(false)
      }
    }

    const iconStyle = new Style({
      // stroke: new Stroke({
      //       width: 5,
      //       color: "#ff0000"
      //     },
      image: new Icon({
        anchor: [10, 10],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        src: geoCoderSvg,
        displacement: [-5, 25],
        scale: 1
      })
    })
    const overlay = new Overlay({
      element: popup.value,
      autoPan: {
        animation: {
          duration: 250
        }
      }
    })

    map.value = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      overlays: [overlay],
      target: 'map',
      view: new View({
        center: [489191.97, 6595852.84],
        // center: fromLonLat([4.39064, 50.83756]),
        zoom: 12,
        minZoom: 11
      }),
      controls: defaultControls({
        attribution: false,
        zoom: false,
        rotate: false
      }),
      interactions: defaultInteractions({
        // doubleClickZoom: allowControls.value,
        // dragPan: allowControls.value,
        // keyboardZoom: allowControls.value,
        // mouseWheelZoom: allowControls.value
      })
    })
    const setPointOnMap = (point: { label: string; coordinates: number[]; levelId: number }) => {
      let feature = new Feature({
        geometry: new Point(fromLonLat([point.coordinates[0], point.coordinates[1]])), //[4.39064, 50.83756]
        name: point.label
      })
      // feature.setId(point.levelId)
      feature.setStyle(iconStyle)
      let vector = new VectorLayer({
        source: new VectorSource({
          features: [feature]
        })
      })
      // On ajoute la nouvelle feature à la fin de la liste des layers de la map
      map.value.getLayers().extend([vector])
    }

    console.log(map.value)

    // ---------------------------------------------------------------
    // On génère les points sur la map à partir de la liste des objets
    // ---------------------------------------------------------------
    if (
      userRole.includes('Administrateur') ||
      userRole.includes('Créateur') ||
      userReward >= 50
    ) {
      // TODO AFFICHER TOUTES LES PREMIERE ACTIVITE SI LELEVE A PLUS DE 50 POINTS
      // TODO CHANGER LEMPLACEMENT DE TOUTES LES PREMIERES ACTIVITES CAR ELLE NE DOIVENT PAS SE TROUVER DANS LECOLE
      // TODO FAIRE UN CONDITION SI LELEVE A DEJA COMPLETER LACTIVITE DANS SON ECOLE
      for (let point of pointState.points) {
        setPointOnMap(point)
      }
    } else {
      for (let point of pointState.points) {
        //TODO NAFFICHER QUE LACTIVITE PRINCIPALE LORS DE LA PREMIERE ARRIVER DE LELEVE SUR LE SITE
        if (point.label === userSchool) {
          setPointOnMap(point)
        }
      }
    }
    //TODO si le créateur clique sur un point qui vient d'être rajouter, on démarrer la création d'une activité

    map.value.on('singleclick', function (evt: { pixel: any; coordinate: any }) {
      // Si on click autre part que sur un point, le popup se désaffiche
      popupVisibility.value = false
      setActive()
      console.log(map.value.getInteractions().getArray())
      map.value.forEachFeatureAtPixel(
        evt.pixel,
        function (
          feature: {
            getProperties: () => { (): any; new (): any; name: string }
            getId: () => number
          },
          layer: any
        ) {
          // On attribue les valeurs de nom de niveau et de numéro de niveau
          levelName.value = feature.getProperties().name
          levelNumber.value = feature.getId()
          // On enregistre les coordonnées pour mettre le popup au bon endroit
          const coordinate = evt.coordinate
          overlay.setPosition(coordinate)
          popupVisibility.value = true
          allowControls.value = false
          setNotActive()
        }
      )
    })
    map.value.on('pointermove', function (evt: any) {
      var touche = this.forEachFeatureAtPixel(evt.pixel, function () {
        return true
      })
      if (touche) {
        this.getTargetElement().style.cursor = 'pointer'
      } else {
        this.getTargetElement().style.cursor = ''
      }
    })
  })
  // map.value.setView(
  //   new View({
  //     center: fromLonLat([151.2093, -33.8688]), // Sydney

  //     zoom: 13
  //   })
  // )
  const basemapId = 'ArcGIS:Streets'
  const basemapURL =
    'https://basemaps-api.arcgis.com/arcgis/rest/services/styles/' +
    basemapId +
    '?type=style&token=' +
    import.meta.env.VITE_API_KEY

  // olms(map, basemapURL)

  const authentication = ApiKeyManager.fromKey(import.meta.env.VITE_API_KEY)

  const handleGeocode = () => {
    // get the value of the input element
    const query = (<HTMLInputElement>document.getElementById('geocode-input')).value

    // recupère les coordonnées
    const center = transform(map.value.getView().getCenter(), 'EPSG:3857', 'EPSG:4326')
    geocode({
      singleLine: query,
      authentication,

      params: {
        outFields: '*',
        location: center.join(','),
        outSR: 3857 // Request coordinates in Web Mercator to simplify displaying
      }
    })
      .then((response: IGeocodeResponse) => {
        const result: any = response.candidates[0]
        const coords = [result.attributes.X, result.attributes.Y]
        console.log(result)
        let feature = new Feature({
          geometry: new Point(fromLonLat(coords)), //[4.39064, 50.83756]
          name: result.address
        })
        feature.setStyle(
          new Style({
            // stroke: new Stroke({
            //       width: 5,
            //       color: "#ff0000"
            //     },
            image: new Icon({
              anchor: [10, 10],
              anchorXUnits: 'pixels',
              anchorYUnits: 'pixels',
              src: geoCoderSvg,
              displacement: [-5, 25],
              scale: 1
            })
          })
        )
        let vector = new VectorLayer({
          source: new VectorSource({
            features: [feature]
          })
        })

        console.log(map.value.getLayers())
        // Au lieu d'ajouter à la fin de la liste de layers on sort un popup qui permettra de créer l'activité
        // On ajoute la nouvelle feature à la fin de la liste des layers de la map
        map.value.getLayers().extend([vector])

        if (!result) {
          alert("That query didn't match any geocoding results.")
          return
        }

        // popup.show(coords, result.attributes.LongLabel)
        // map.getView().setCenter(coords)
      })

      .catch((error) => {
        alert('There was a problem using the geocoder. See the console for details.')
        console.error(error)
      })
  }
  // geocode({
  //   address: '1600 Pennsylvania Ave',
  //   postal: 20500,
  //   countryCode: 'USA',
  //   authentication
  // }).then((response) => {
  //   console.log('Candidates:', response.candidates)
  // })
</script>

<template>
  <div
    id="map"
    class="map"
  ></div>
  <div
    class="search"
    v-if="userRole.includes('Administrateur') || userRole.includes('Créateur')"
  >
    <input
      id="geocode-input"
      ref="inputGeocode"
      type="text"
      placeholder="Enter an address or place e.g. 1 York St"
      size="50"
    />
    <!-- On click sur le bouton geocode ,  -->
    <button
      id="geocode-button"
      @click="handleGeocode"
    >
      Geocode
    </button>
  </div>
  <div
    v-show="popupVisibility"
    ref="popup"
    id="popup"
    class="ol-popup"
    v-if="userRole.includes('Administrateur') || userRole.includes('Créateur') || userReward >= 50"
  >
    <!-- SHOW ALL THE ACTIVITIES TO THE CREATOR AND ADMINISTRATOR -->
    <div
      class="swipper_right"
      @click="gamemode = 0"
    >
      {{ '>' }}
    </div>
    <div
      class="swipper_left"
      @click="gamemode = 1"
    >
      {{ '<' }}
    </div>
    <a
      href="#"
      id="popup-closer"
      class="ol-popup-closer"
      @click="onCloserClick"
    ></a>
    <div class="popup-content">
      <Transition>
        <div
          id="popup-content"
          class="sub_content"
          v-if="gamemode"
        >
          <p class="popup-title">{{ levelName }}</p>
          <p class="level-details">Quizz Flashcard {{ levelNumber }}</p>
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
        <div
          class="sub_content"
          v-else
        >
          <p
            class="popup-title"
            id="levelDad"
          >
            {{ levelName }}
          </p>
          <p class="level-details">Quizz Drag&Learn {{ levelNumber }}</p>
          <img
            class="gamemode-image-dal"
            src="@/assets/logo/dalcard.svg"
            alt="flashcards gamemode logo"
          />
          <router-link
            v-if="isMobile"
            to="/dadmobile"
            class="playButton"
            id="buttonDad"
            >PLAY</router-link
          >
          <router-link
            v-else
            to="/dad"
            class="playButton"
            id="buttonDad"
            >PLAY</router-link
          >
        </div>
      </Transition>
    </div>
  </div>
  <div
    v-show="popupVisibility"
    ref="popup"
    id="popup"
    class="ol-popup"
    v-else-if="userReward >= 0 && userReward < 50"
  >
    <div class="popup-content">
      <div
        id="popup-content"
        class="sub_content"
      >
        <p class="popup-title">{{ levelName }}</p>
        <p class="level-details">Activité principale {{ levelNumber }}</p>
        <img
          class="gamemode-image"
          src="@/assets/logo/start_game.svg"
          alt="start_game gamemode logo"
        />
        <!-- CREATION DE LACTIVITE PRINCIPALE -->
        <router-link
          to="/start-game"
          class="playButton"
          >PLAY</router-link
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
  .map {
    width: 100%;
    height: 100vh;
  }
  .search {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  #geocode-input,
  #geocode-button {
    font-size: 16px;
    margin: 0 2px 0 0;
    padding: 4px 8px;
  }
  #geocode-input {
    width: 300px;
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
    min-width: 220px;
    min-height: 300px;
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
    display: flex;
    justify-content: center;
    gap: 5px;
    overflow: hidden;
    /* border: 1px solid red; */
  }
  .sub_content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    /* position: absolute; */
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
    border-radius: 5px;
    padding: 35px 3px 35px 3px;
    width: 50%;
    height: auto;
    border: 2px solid grey;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 6px 0px;
  }
  .gamemode-image-dal {
    margin-top: 15px;
    width: 47%;
    padding: 10px 5px 10px 5px;
    border: 2px solid grey;
    border-radius: 5px;
    height: auto;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 6px 0px;
  }
  .playButton {
    margin-top: 15px;
    background: #026b30;
    color: white;
    border-radius: 5px;
    padding: 5px;
    width: 80%;
  }
  .swipper_right {
    position: absolute;
    left: 85%;
    top: 42%;
    font-weight: bold;
    font-size: 1.5em;
    z-index: 5;
    cursor: pointer;
  }
  .swipper_left {
    position: absolute;
    right: 85%;
    top: 42%;
    font-weight: bold;
    font-size: 1.5em;
    z-index: 5;
    cursor: pointer;
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
  #buttonDad {
    background-color: #00307e;
  }
  #levelDad {
    color: #00307e;
  }
  .v-enter-from {
    opacity: 0;
    display: none;
  }
  .v-enter-active {
    opacity: 0;
  }
  .v-enter-to {
    opacity: 0;
  }
</style>

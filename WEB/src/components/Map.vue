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
  import geoCoderSvgDal from '@/assets/images/geo-markerDal.svg'
  import geoCoderSvgFlash from '@/assets/images/geo-markerFlash.svg'
  import { RouterLink } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  import useMapStore from '@/stores/map'
  import router from '@/router'
  import mapService from '@/services/mapService'
  import type { LevelMapWithId } from '@/types/map'
  // import { Popup } from 'ol-popup';
  //
  //
  // TODO: Essayer de régler ce typeScript de m*rde
  //
  //

  // Cette ref correspond à la div du popup
  const userScope = await useUserStore().checkUserAccessAndReturnUser()
  const userRole = userScope.role
  const userSchool = userScope.school
  const userReward = userScope.score
  const mapStore = useMapStore()
  // const schoolUser = useUserStore().user.

  const popup = ref<HTMLElement | undefined>()

  const map = ref()

  const isMobile = ref(false)
  // On utilise cet état pour afficher ou désafficher le popup
  const popupVisibility = ref(false)
  // Cette ref permet de stocker le nom du niveau à ensuite afficher
  const levelName = ref('')
  // Cette ref permet de stocker le numéro du niveau à ensuite afficher
  const levelNumber = ref(0)
  // Pour changer le type de partie on utilise gamemode
  const levelType = ref(0)
  // Ici on stocke les différents points que l'on va afficher sur la map
  const levelId = ref(0)
  interface Point {
    address: string
    position: number[]
    levelId: number
    levelActivityType: number
  }
  const popupCreateGame = ref(false)

  let newPointState: Point = reactive({
    address: '',
    position: [],
    levelId: 0,
    levelActivityType: 0
  })
  const pointState = reactive({
    points: [
      {
        address: 'Institut Saint Joseph',
        position: [4.39064, 50.83756],
        levelId: 0,
        levelActivityType: 0
      },
      {
        position: [4.42537, 50.83826], //[4.39064, 50.83756]
        address: 'Institut Don Bosco',
        levelId: 0,
        levelActivityType: 0
      },
      {
        position: [4.37576, 50.87358], //[4.39064, 50.83756]
        address: 'Institut Cardinal Mercier',
        levelId: 0,
        levelActivityType: 0
      }
    ]
  })
  // Chercher tous les niveaux dans la base de données (pour la démo)
  const levelMap = await mapStore.getLevelMap()
  //Ajout des niveau dans le tableau de niveau
  if (levelMap) {
    if (levelMap.length) {
      pointState.points.push.apply(
        pointState.points,
        levelMap.map((x: LevelMapWithId) => {
          return {
            address: x.address,
            position: x.position,
            levelId: x.id,
            levelActivityType: x.activityId
          }
        })
      )
    }
  }
  // Permet de désactiver le dézoom et les mouvements sur la carte quand le popup est ouvert
  const allowControls = ref(true)

  const onCloserClick = () => {
    popupVisibility.value = false
    popupCreateGame.value = false
    // closer.style.display = 'none'
    for (let interaction in map.value.getInteractions().getArray()) {
      let template = map.value.getInteractions().getArray()
      template[interaction].setActive(true)
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
      for (let interaction in map.value.getInteractions().getArray()) {
        let template = map.value.getInteractions().getArray()
        template[interaction].setActive(true)
      }
    }

    function setNotActive() {
      for (let interaction in map.value.getInteractions().getArray()) {
        let template = map.value.getInteractions().getArray()
        template[interaction].setActive(false)
      }
    }

    const createIconStyle = (logo: string) => {
      return new Style({
        image: new Icon({
          anchor: [10, 10],
          anchorXUnits: 'pixels',
          anchorYUnits: 'pixels',
          src: logo,
          displacement: [-5, 25],
          scale: 1
        })
      })
    }

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
    const setPointOnMap = (point: {
      address: string
      position: number[]
      levelId: number
      levelActivityType: number
    }) => {
      let feature = new Feature({
        geometry: new Point(fromLonLat([point.position[0], point.position[1]])), //[4.39064, 50.83756]
        name: point.address
      })
      // feature.setId(point.levelId)
      if (point.levelActivityType === 0) {
        feature.setStyle(createIconStyle(geoCoderSvg))
      } else if (point.levelActivityType === 1) {
        feature.setStyle(createIconStyle(geoCoderSvgFlash))
      } else if (point.levelActivityType === 2) {
        feature.setStyle(createIconStyle(geoCoderSvgDal))
      }

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
    if (userRole.includes('Administrateur') || userRole.includes('Créateur')) {
      // TODO AFFICHER TOUTES LES PREMIERE ACTIVITE SI LELEVE A PLUS DE 50 POINTS
      // TODO CHANGER LEMPLACEMENT DE TOUTES LES PREMIERES ACTIVITES CAR ELLE NE DOIVENT PAS SE TROUVER DANS LECOLE
      // TODO FAIRE UN CONDITION SI LELEVE A DEJA COMPLETER LACTIVITE DANS SON ECOLE
      for (let point of pointState.points) {
        setPointOnMap(point)
        console.log(point)
      }
    } else if (userReward >= 50) {
      console.log('ok')
      console.log(pointState.points)
      for (let point of pointState.points) {
        //TODO NAFFICHER QUE LACTIVITE PRINCIPALE LORS DE LA PREMIERE ARRIVER DE LELEVE SUR LE SITE
        if (point.levelId > 0) {
          setPointOnMap(point)
        } else if (point.address === userSchool) {
          setPointOnMap(point)
        }
      }
    } else {
      for (let point of pointState.points) {
        //TODO NAFFICHER QUE LACTIVITE PRINCIPALE LORS DE LA PREMIERE ARRIVER DE LELEVE SUR LE SITE
        if (point.address === userSchool) {
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
          console.log(feature)
          levelName.value = feature.getProperties().name
          // levelNumber.value = feature.getId()
          levelNumber.value = pointState.points.filter(
            (x) => x.address === levelName.value
          )[0].levelId
          console.log(levelNumber.value)

          levelType.value = pointState.points.filter(
            (x) => x.address === levelName.value
          )[0].levelActivityType
          console.log(levelType.value)
          // Stocker dans un store le niveau que l'elève veut jouer
          mapStore.setActualLevelMapId(levelNumber.value )
          // On enregistre les coordonnées pour mettre le popup au bon endroit
          const coordinate = evt.coordinate
          console.log(coordinate)
          overlay.setPosition(coordinate)
          console.log(overlay)

          popupVisibility.value = true
          allowControls.value = false
          setNotActive()
        }
      )
    })
    map.value.on('pointermove', function (evt: any) {
      let touche = map.value.forEachFeatureAtPixel(evt.pixel, function () {
        return true
      })
      if (touche) {
        map.value.getTargetElement().style.cursor = 'pointer'
      } else {
        map.value.getTargetElement().style.cursor = ''
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
  // console.log(import.meta.env.VITE_API_KEY)
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
        // stocker les cooordonnées de l'adresse et le nom de l'adresse
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
        popupCreateGame.value = true
        console.log(vector)
        newPointState = {
          address: result.address,
          position: coords,
          levelId: 1,
          levelActivityType: 0
        }
        // Au lieu d'ajouter à la fin de la liste de layers on sort un popup qui permettra de créer l'activité
        // On ajoute la nouvelle feature à la fin de la liste des layers de la map
        // map.value.getLayers().extend([vector])

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

  const onConfirmAddress = () => {
    // Enregistrer l'adresse dans le store et switch de page
    console.log(
      mapStore.$patch({
        newLevel: { address: newPointState.address, position: newPointState.position }
      })
    )
    router.replace('/choose-activities')
  }
</script>

<template>
  <div class="main">
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
        placeholder="Entrer l'adresse du nouveau niveau"
        size="50"
        class="geoSearch"
      />
      <!-- On click sur le bouton geocode ,  -->
      <button
        id="geocode-button"
        @click="handleGeocode"
        class="geoButton"
      >
        Geocode
      </button>
    </div>
    <!-- Contenu du PoPuP et mode de jeu -->
    <div
      v-show="popupVisibility"
      ref="popup"
      id="popup"
      class="ol-popup"
    >
      <div
        v-if="
          (userRole.includes('Administrateur') && levelNumber > 0 && levelType === 1) ||
          (userRole.includes('Créateur') && levelNumber > 0 && levelType === 1) ||
          (userReward >= 50 && levelNumber > 0 && levelType === 1)
        "
      >
        <a
          href="#"
          id="popup-closer"
          class="ol-popup-closer"
          @click="onCloserClick"
        ></a>
        <div class="popup-content">
          <Transition>
            <!-- v-if="gamemode" -->
            <div
              id="popup-content"
              class="sub_content"
            >
              <p class="popup-title">
                {{ levelName }}
              </p>
              <p class="level-details">Quizz Flashcard {{ levelNumber }}</p>
              <img
                class="gamemode-image"
                src="@/assets/logo/flashcards.svg"
                alt="flashcards gamemode logo"
              />
              <router-link
                to="/card-number-selector"
                class="playButton"
                >PLAY</router-link
              >
            </div>
          </Transition>
        </div>
      </div>
      <div
        v-if="
          (userRole.includes('Administrateur') && levelNumber > 0 && levelType === 2) ||
          (userRole.includes('Créateur') && levelNumber > 0 && levelType === 2) ||
          (userReward >= 50 && levelNumber > 0 && levelType === 2)
        "
      >
        <a
          href="#"
          id="popup-closer"
          class="ol-popup-closer"
          @click="onCloserClick"
        ></a>
        <div class="popup-content">
          <Transition>
            <!-- v-if="gamemode" -->
            <div
              id="popup-content"
              class="sub_content"
            >
              <p
                class="popup-title"
                id="levelDad"
              >
                {{ levelName }}
              </p>
              <p class="level-details">Quizz DragAndLearn {{ levelNumber }}</p>
              <img
                class="gamemode-image-dal"
                src="@/assets/logo/dalcard.svg"
                alt="dragandlearn gamemode logo"
              />

              <router-link
                id="buttonDad"
                to="/dad-mobile"
                class="playButton"
                v-if="isMobile"
                >PLAY</router-link
              >
              <router-link
                id="buttonDad"
                to="/dad"
                class="playButton"
                v-else="isMobile"
                >PLAY</router-link
              >
            </div>
          </Transition>
        </div>
      </div>
      <div v-else-if="levelType === 0">
        <a
          href="#"
          id="popup-closer"
          class="ol-popup-closer"
          @click="onCloserClick"
        ></a>
        <div class="popup-content">
          <div
            id="popup-content"
            class="sub_content"
          >
            <p
              class="popup-title"
              style="color: #ff9900"
            >
              {{ levelName }}
            </p>
            <p class="level-details">Activité principale</p>
            <img
              class="gamemode-image"
              src="@/assets/logo/start_game.svg"
              alt="start_game gamemode logo"
            />
            <!-- CREATION DE LACTIVITE PRINCIPALE -->
            <router-link
              to="/start-game"
              class="playButton"
              style="background-color: #ff9900"
              >PLAY</router-link
            >
          </div>
        </div>
      </div>
      <!-- SHOW ALL THE ACTIVITIES TO THE CREATOR AND ADMINISTRATOR -->
    </div>
    <!-- Redirection vers l'activité principale -->
    <!-- Concernant la création de jeu Faire un poppup avec lavec la confirmation de l'adresse -->

    <div
      id="create__game__popup"
      v-show="popupCreateGame"
    >
      <a
        href="#"
        id="popup-closer"
        class="ol-popup-closer"
        @click="onCloserClick"
      ></a>
      <h2 id="create__game__popup__title">Veuillez Confirmer l'adresse du nouveau niveau</h2>
      <p id="create__game__popup__address">{{ newPointState.address }}</p>
      <!-- Quand il confirme envoyer l'adresse dans le store -->
      <button
        id="create__game__popup__confirm"
        @click="onConfirmAddress"
      >
        Confirmer
      </button>
    </div>
  </div>
</template>
<style scoped>
  @import '../assets/map.css';
</style>

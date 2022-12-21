<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  import { onMounted, ref } from 'vue'
  import router from '@/router'

  const userStore = useUserStore()
  const userScope = await userStore.checkUserAccessAndReturnUser()

  let slideIndex = ref(1)
  window.addEventListener('load', () => {
    showSlides(1)
  })

  // Next/previous controls
  function plusSlides(n: number) {
    showSlides((slideIndex.value += n))
  }

  // Thumbnail image controls
  function currentSlide(n: number) {
    showSlides((slideIndex.value = n))
  }

  function showSlides(n: number) {
    // let slides = document.getElementsByClassName('mySlides')
    let slides = document.getElementsByClassName('mySlides')
    let next = document.getElementsByClassName('next')
    console.log(slides)
    // Si on arrive a la fin des slides on doit remplacer le bouton suivant par completer
    if (n > slides.length) {
      // Ajouter l'argent de l'utilisateur pour
      if (userScope.userReward == 0) {
        console.log(userScope.userReward)
        userScope.addScoreToUser(50)
        router.replace('/map')
        return
      } else {
        router.replace('/map')
        return
      }
    } else if (n == slides.length) {
      // slideIndex.value = 1
      next[0].innerHTML = 'Completer'
    } else if (n < 1) {
      slideIndex.value = slides.length
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].setAttribute('style', 'display: none')
    }
    // for (i = 0; i < dots.length; i++) {
    //   dots[i].className = dots[i].className.replace(' active', '')
    // }
    slides[slideIndex.value - 1].setAttribute('style', 'display: block')
    // dots[slideIndex - 1].className += ' active'
  }
</script>
<template>
  <!--TODO PRESENTATION DE LA PLATEFORME -->
  <!-- 1. Montrer l'interface de connexion de la plateforme et le montrer comment se connecter -->
  <!-- 2. commencer par montrer l'interface d'acceuil de la plateforme  -->
  <!-- 3. Lui montre comment naviguer sur la barre de navigation pour acceder au jeu -->
  <!-- 4. Lui montrer ensuite comment il peut naviguer sur la carte -->
  <!--  5. Montrer son profile sur la plateforme :: profil à mettre sur la navigation-->
  <!-- montrer chaque etape avec un bouton suivant -->
  <!-- <div id="ecran__connexion"></div>
  <div id="ecran__acceuil"></div> -->
  <div id="slideshow">
    <div class="slideshow-container">
      <!-- Full-width images with number and caption text -->
      <div class="mySlides fade">
        <div class="explication__text">
          <p>
            Bienvenue sur la plateforme TaalToolbox, la plateforme d'apprentissage des langues en
            ligne<br />
            Lorsque vous vous présenter sur l'application rendez vous sur la page se connecter pour
            avoir accès à votre compte personnel
          </p>
        </div>
        <img
          src="../assets/images/start_game/plateforme/acceuil_non_connecté.png"
          class="slide__img"
        />
        <!-- <div class="text">Caption Text</div> -->
      </div>
      <div class="mySlides fade">
        <div class="explication__text">
          <p>
            Une fois sur la page de connexion entrez vos identifiants de connexion qui vous ont été
            fourni <br />
          </p>
        </div>
        <img
          src="@/assets/images/start_game/plateforme/ecran_connexion.png"
          class="slide__img"
        />
        <!-- <img src="img1.jpg" style="width: 100%" /> -->
        <!-- <div class="text">Caption Text</div> -->
      </div>

      <div class="mySlides fade">
        <div class="explication__text">
          <p>
            Une fois connecté vous auriez accès à la carte intératif dans la barre de navigation qui
            vous permettra d'effectuer des activités <br />
          </p>
        </div>
        <img
          src="@/assets/images/start_game/plateforme/acceuil_connecté.png"
          class="slide__img"
        />

        <!-- <div class="text">Caption Two</div> -->
      </div>

      <div class="mySlides fade">
        <div class="explication__text">
          <p>
            Vous venez de compléter l'activité principale 😉 vous pouvez maintenant effectuer
            d'autres activités sur la carte <br />
          </p>
        </div>
        <!-- <div class="numbertext">3 / 3</div> -->
        <!-- <img
          src="@/assets/images/start_game/plateforme/barre_navigation.png"
          class="slide__img"
        /> -->
        <!-- <div class="text">Caption Three</div> -->
      </div>
    </div>
    <div id="mouve">
      <!-- <a
        class="prev"
        @click="plusSlides(-1)"
        >precedent</a
      > -->
      <a
        class="next"
        @click="plusSlides(1)"
        >suivant</a
      >
    </div>

    <!-- Next and previous buttons -->
    <br />

    <!-- The dots/circles -->
    <!-- <div style="text-align: center">
      <span
        class="dot"
        onclick="currentSlide(1)"
      ></span>
      <span
        class="dot"
        onclick="currentSlide(2)"
      ></span>
      <span
        class="dot"
        onclick="currentSlide(3)"
      ></span>
    </div> -->
  </div>
</template>

<style scoped>
  /* Slideshow container */
  #slideshow {
    /* border: solid blue 1px; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .slideshow-container {
    /* border: solid red 1px; */
    margin: 15px auto;
    /* margin: auto; */
    /* margin-top: 15px; */
    /* max-width: 1000px; */
    /* position: relative; */
    /* display: flex;
    justify-content: center;
    align-items: center; */
    width: 80%;
    height: 100%;
    padding-bottom: 15px;
  }
  .slide__img {
    /* max-width: 100%;
    max-height: 100%;
    margin: 0 auto; */
    /* width: 80%; */
    /* margin: 0 auto; */
    /* max-width: 100%; */
    width: 100%;
    height: 500px;
    /* height: auto; */
    object-fit: contain;
  }

  .explication__text {
    text-align: center;
    padding-bottom: 15px;
  }
  /* Hide the images by default */
  .mySlides {
    display: none;
  }
  .mySlides:first-child {
    display: block;
  }
  .fade {
    animation-name: fade;
    animation-duration: 1.5s;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
  }
  .mouve {
    display: flex;
    margin-right: 5px;
  }
  /* Next & previous buttons */
  .prev,
  .next {
    border: solid #026630 0.1px;
    cursor: pointer;
    /* position: fixed;
    top: 50%; */
    width: auto;
    /* margin-top: -22px; */
    padding: 16px;
    color: #026b30;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 3px;
    user-select: none;
    background-color: rgba(0, 0, 0, 0.2);
  }

  /* Position the "next button" to the right */
  .next {
    right: 10px;
    border-radius: 3px 0 0 3px;
  }
  .prev {
    left: 5px;
  }

  /* On hover, add a black background color with a little bit see-through */
  .prev:hover,
  .next:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }

  /* Caption text */
  .text {
    color: #f2f2f2;
    font-size: 15px;
    padding: 8px 12px;
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
  }

  /* Number text (1/3 etc) */
  .numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
  }

  /* The dots/bullets/indicators */
  .dot {
    border: solid green 1px;
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }

  .active,
  .dot:hover {
    background-color: #717171;
  }

  /* Fading animation */

  @keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }
</style>

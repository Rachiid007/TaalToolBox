<script setup lang="ts">
  import { useUserStore } from '@/stores/user'

  await useUserStore().checkUserAccessAndRole(['Adminstrateur', 'Créateur'])
</script>

<template>
  <h1 class="title">Ajouter une activité</h1>
  <div class="big-container">
    <div class="container excel">
      <h2 class="sub-title">Via un fichier Excel</h2>
      <img
        src="@/assets/excel.svg"
        alt="excel"
      />
      <p>Vous pouvez ajouter vos activités en les renseignant dans un fichier Excel.</p>
      <RouterLink to="/add-card/excel">
        <button class="btn">Excel</button>
      </RouterLink>
    </div>
    <div class="container forms">
      <h2 class="sub-title">Via un formulaire</h2>
      <img
        src="@/assets/forms.svg"
        alt="google forms"
      />
      <p>Vous pouvez ajouter vos activités en les renseignant dans un formulaire.</p>
      <RouterLink to="/add-card/form">
        <button class="btn">Formulaire</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
  @import './choiceHowToAdd.css';
</style>

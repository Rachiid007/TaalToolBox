<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  const userStore = useUserStore()
  const userScope = await userStore.getUserScope()
  const userRole = userScope.role
</script>

<template>
  <h1
    v-if="userRole.includes('Administrateur')"
    class="title"
  >
    Ajouter un Prof/Elève
  </h1>
  <h1
    v-else
    class="title"
  >
    Ajouter un Elève
  </h1>
  <div class="big-container">
    <div class="container excel">
      <h2 class="sub-title">Via un fichier Excel</h2>
      <img
        src="@/assets/excel.svg"
        alt="excel"
      />
      <p v-if="userRole.includes('Administrateur')">
        Vous pouvez ajouter des Professeurs/Elèves en les renseignant dans un fichier Excel.
      </p>
      <p v-else>
        Vous pouvez ajouter des Professeurs/Elèves en les renseignant dans un fichier Excel.
      </p>
      <!-- <RouterLink to="/add-user/excel"> -->
      <RouterLink to="/add-user/excel">
        <button class="btn">Excel</button>
      </RouterLink>
    </div>
    <div class="container forms">
      <h2 class="sub-title">Via un formulaire</h2>
      <img
        src="@/assets/forms.svg"
        alt="google forms"
      />
      <p v-if="userRole.includes('Administrateur')">
        Vous pouvez ajouter vos Prof/Elève en les renseignant dans un formulaire.
      </p>
      <p v-else>Vous pouvez ajouter vos Elève en les renseignant dans un formulaire.</p>
      <RouterLink to="/signIn">
        <button class="btn">Formulaire</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
  @import '@/components/card/add/choiceHowToAdd.css';
</style>

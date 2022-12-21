<script setup lang="ts">
  import DragndropTeacher from '@/components/dragndrop/DragNDropTeacher.vue'
  import TheHeader from '@/components/TheHeader.vue'
  import HowToAddDad from '@/components/dragndrop/HowToAddDad.vue'
  import SelectDragNDropImage from '@/components/dragndrop/SelectDragNDropImage.vue'
  import DragNDropResume from '@/components/dragndrop/DragNDropResume.vue'
  import { ref } from 'vue'
  import { useDadLevels } from '@/stores/dadLevels'
  import { useUserStore } from '@/stores/user'
  await useUserStore().checkUserAccessAndRole(['Adminstrateur', 'Créateur'])

  const actualPage = ref(0)
  const dadStore = useDadLevels()

  const changeActualPage = (nbrPage: number) => {
    actualPage.value = nbrPage
  }
</script>
<template>
  <div class="page">
    <TheHeader>
      <div class="title">
        <img
          class="headerLogo"
          src="@/assets/logo/dragandlearn.svg"
          alt="drag and drop gamemode logo"
        />
      </div>
    </TheHeader>
    <HowToAddDad
      v-if="!actualPage"
      @change-page="(nbr: number) => changeActualPage(nbr)"
    />
    <SelectDragNDropImage
      v-if="actualPage == 1"
      @change-page="(nbr: number) => changeActualPage(nbr)"
    />
    <DragndropTeacher
      v-if="actualPage == 2"
      @change-page="(nbr: number) => changeActualPage(nbr)"
    />
    <DragNDropResume
      v-if="actualPage == 3"
      @change-page="(nbr: number) => changeActualPage(nbr)"
    />
  </div>
</template>
<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 15px;
    overflow-x: hidden;
  }
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .headerLogo {
    height: 60px;
    width: auto;
  }
</style>

<script setup lang="ts">
  import DragndropTeacher from '@/components/dragndrop/DragNDropTeacher.vue'
  import TheHeader from '@/components/TheHeader.vue'
  import HowToAddDad from '@/components/dragndrop/HowToAddDad.vue'
  import { ref } from 'vue'
  import { useDadLevels } from '@/stores/dadLevels'

  const imageSelected = ref(false)
  const dadStore = useDadLevels()
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
    <DragndropTeacher v-if="imageSelected" />
    <HowToAddDad v-else />
  </div>
</template>
<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
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

<script setup lang="ts">

import { useSchoolsStore } from "@/stores/school"
import { onMounted, ref } from "vue";

const store = useSchoolsStore()

store.getSchoolName()

let list = ref(store.schoolList)


console.log(list)
</script>

<template>
  <div class="main">
    <div class="page">
      <div class="title">
        <p class="add">Ajouter une classe</p>
      </div>
      <div class="title-image">
        <img
          src="../../assets/logo/logo.svg"
          class="image"
        />
        <p class="logoName">TaalToolBox</p>
      </div>
      <div
        class="content"
      >
        <form class="form">
            <div class="select">
                <select
              name="select"
              class="select_input"
              placeholder="Rôle">

              <option
                hidden
                value="ecole"
                disabled
                selected
              >
                Ecole
              </option>
              <option v-for= "item in list" :key="item.id"> {{ item.name }}</option>
            </select>
            </div>             
          <input
            class="schoolFields"
            type="text"
            placeholder="Entrer une classe"            
          />
        </form>
        <div class="buttons">
          <button
            id="confirmer"
            class="clickButton"
           > Confirmer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>  
  .main {
    padding: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .page{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid grey 1px;
    border-radius: 4px;
    max-width: 500px;
  }
  .title {
    min-width: 400px;
    width: 100%;
    background-color: #026b30;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  .title-image {
    padding-top: 5%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2%;
    width: 100%;
  }
  .image {
    width: 10%;
    height: auto;
  }
  .logoName {
    font-family: Segoe print;
    color: #707070;
    font-size: 1.5em;
  }
  .form {
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 73%;
  }
  select {
    appearance: none;
    border: none;
    margin: 0;
    width: 100%;
    cursor: inherit;
    line-height: inherit;
  }
  .select_input {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 2px 4px -2px;
    border-radius: 5px;
    padding: 2px;
    outline: none;
    position: relative;
  }
  .select_input::after {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 15px solid #026b30;
    position: absolute;
    left: 90%;
    content: '';
  }
  .select {
    width: 100%;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    background-color: #fff;
    display: grid;
    color: #026b30;
    align-items: center;
    position: relative;
  }
  .select::after {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 10px solid #026b30;
    position: absolute;
    left: 92%;
    content: '';
  }
  input.schoolFields {
    color: #026b30;
    width: 100%;
    padding: 2px;
    border-radius: 5px;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 2px 4px -2px;
  }
  input.firstFields {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 2px 4px -2px;
    border-radius: 5px;
    padding: 2px;
    outline: none;
  }
  input::placeholder {
    color: #026b30;
  }
  .radioField {
    display: flex;
    flex-direction: row;
    gap: 25%;
    width: 100%;
  }
   
  .radioImage {
    height: auto;
    width: 100%;
  }
  .buttons {
    padding-bottom: 5%;
    gap: 28%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    padding: 20px;
  }
  .clickButton {
    display: flex;
    justify-content: center;
    border: none;
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    font-size: 1.1em;
    min-width: 100px;
  }
  /* .error {
    color: red;
    padding-bottom: 5%;
    font-weight: bold;
  } */
   
  #confirmer {
    align-items: center;
    color: white;
    background-color: #026b30;
  }
  .add {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #026b30;
    color: white;
    flex-grow: 5;
    border-bottom: solid 1px grey;
    font-size: 1.5em;
  }
</style>
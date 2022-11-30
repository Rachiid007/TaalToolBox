<script setup lang="ts">
  
 
</script>
<template>
  <div class="main">
    <div class="title">
      <h1 class="text">Informations du nouveau niveau</h1>
    </div>
    <div class="content">
        <div class="textArera">
            <div class="descriLevel">
                <h1>Description:</h1>
            </div>
            <div class="areaText">
                <textarea placeholder="Introduisez une description..." cols="30" rows="5"></textarea>
            </div>
        </div>
      <div class="fields">
        <form class="fieldForm">
            <div class="nameField">
                <h1 class="titleField">Nom du nouveau niveau:</h1>
                <input type="text" class="name" />
            </div>
            <div class="select">
            <select
              name="select"
              class="select_input"
              placeholder="activities">
              <option
                hidden
                value="theme du niveau"
                disabled
                selected
              >
                Changer l'activité
              </option>
              <option value="flashcard">FlashCard</option>
              <option value="dragandlearn">DragAndLearn</option>
            </select>
            </div>
            <div class="select">
            <select
              name="select"
              class="select_input"
               >
              <option
                hidden
                value="theme du niveau"
                disabled
                selected
              >
                Thême du niveau
              </option>
              <option value="flashcard">Pâtisserie</option>
              <option value="dragandlearn">Sport</option>
            </select>
            </div> 
            <div class="select"> 
            <select
              name="select"
              class="select_input"
               >
              <option
                hidden
                value="theme du niveau"
                disabled
                selected
              >
                Difficulté
            </option>  
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
            </select>
            </div>        
        </form>
        <div class="button">
            <button>Confirmer</button>
        </div>
      </div>
      </div>
    </div>
</template>
<style scoped>
.textArera{
    display: flex;
    flex-direction: column;
}
/* .titleField{
    color: black;
    
} */
textarea::placeholder{
    position: relative;
    text-align: left;
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
    padding: 4px;
    outline: none;
    position: relative;
  }
  .select_input::after {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
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
    color: grey;
    align-items: center;
    position: relative;
  }
  .select::after {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 11px solid #026b30;
    position: absolute;
    left: 93%;
    content: '';
  }

.name{
    border: 1px solid black;
}
.areaText{
    text-align: left;
}
.descriLevel {
    font-size: 1.5em;
    font-weight: 600;
    color: rgb(94, 89, 89)

}
textarea {
  width: 100%;
  height: 150px;
  padding: 200px 220px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  float: left;
  overflow-y: hidden;
  /* resize: none; */
}
.fieldForm {
    gap: 53px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
  .main {
    gap: 4%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    max-width: 1600px;
    text-align: center;
  }

  .title {
    padding-top: 20px;
  }

  .sms {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 50%;
    flex: 0.2;
    border: 2px solid grey;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.1) 0px 8px 10px;
    padding: 5px;
    transition: 0.1s ease;
  }

  .carte:hover {
    cursor: pointer;
  }

  .carte:active {
    transform: scale(1.1);
  }
  .text {
    font-size: 28px;
    color: grey;
    border-bottom: 2px solid green;
    font-weight: 600;
  }
  .content {
    gap: 5%;
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: row;
    max-height: 700px;
    /* align-items: center; */
    justify-content: center;
  }
 
  .fields{
    gap: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    padding: 10px;
    width: 30%;
    height: 80%;
    max-height: 700px;
    align-items: center;
  }
 
  .button {
    background-color: green;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    color: white;
    padding: 8px 12px;
    display: inline-block;
    font-size: 20px;
    margin: 20px 2px;
    cursor: pointer;
    border-radius: 5px;
  }
  
</style>

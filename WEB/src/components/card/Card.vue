<script lang="ts">
  export default {
    name: 'Card'
  }
</script>

<template>
  <div class="card">
    <div class="question">
      <p>Traduire le mot: <span id="question value">Found</span></p>
    </div>
    <div class="question response-value">
      <p>Réponse : <span id="response-value">Trouvée</span></p>
    </div>
    <div class="answer">
      <ul>
        <li class="response">
          <label
            ><input
              type="radio"
              name="answer"
              value="trouve"
            />
            Trouvé</label
          >
        </li>
        <li class="response">
          <input
            type="radio"
            name="answer"
            value="presque"
          />
          <label for="reponse-1">J'y suis presque</label>
        </li>
        <li class="response">
          <label
            ><input
              type="radio"
              name="answer"
              value="rate"
            />
            Raté</label
          >
        </li>
      </ul>
    </div>
    <button class="next">suivant</button>
  </div>
</template>

<style>
  .card {
    border: solid rgba(0, 0, 0, 0.09) 1px;
    width: 500px;
    height: 300px;
    position: relative;
    background: rgba(0, 0, 0, 0.07);
    box-shadow: inset;
    border-radius: 5px;
    padding: 5px;
  }
  .next {
    background: #ed1b0d;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    bottom: 20px;
    right: 25px;
  }
  .question {
    /* border: solid red 1px; */
    margin: 15px 0;
    text-align: left;
    padding-left: 10px;
  }
  .answer {
    /* border: solid black 1px; */
    text-align: left;
    margin: 20px 0;
    padding-left: 10px;
  }
  .response {
    /* border: solid green 1px ;   */
    margin: 15px 0;
  }

  @media (max-width: 768px) {
    .card {
      width: 100%;
      margin: 0 5px;
    }
  }
</style>

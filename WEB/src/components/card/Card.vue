<script lang="ts">
export default {
  name: 'Card'
}
</script>
<!-- 03 Parties : -->
<template>
  <div class="card-container">
    <div class="question">
      <!-- Doit être remplacer par le mot lors de la révélation -->
      <p>Comment dit-on</p>
    </div>
    <div class="word-answer hidden">
      <p>Cheval</p>
    </div>
    <div class="card">
      <!-- Réponse de la carte avec une image éventuelle -->
      <div class="word-answer">
        <p>Cheval</p>
      </div>
      <div class="image-answer">
        <img class="image-answer-reveal" src="src/assets/images/cheval.svg" alt="" />
      </div>
    </div>
    <button class="reveal">Réveler</button>
    <!-- <div class="answer">
      <ul>
        <li class="response">
          <label><input type="radio" name="answer" value="trouve" /> Trouvé</label>
        </li>
        <li class="response">
          <input type="radio" name="answer" value="presque" />
          <label for="reponse-1">J'y suis presque</label>
        </li>
        <li class="response">
          <label><input type="radio" name="answer" value="rate" /> Raté</label>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<style>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border: solid rgba(0, 0, 0, 0.3) 2px;
  width: 350px;
  height: 400px;
  box-shadow: inset;
  border-radius: 15px;
  padding: 5px;
}
.word-answer {
  /* border: solid red 1px; */
  color: #74ac8c;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 25px;
}
.image-answer {
  /* border: solid red 1px; */
  margin-top: 25px;
  /* margin: auto 0; */
  text-align: center;
  display: flex;
  justify-content: center;
}
.image-answer-reveal {
  object-fit: contain;
}
.question {
  /* border: solid red 1px; */
  margin: 15px 0;
  padding-left: 10px;
  font-size: 25px;
  color: rgba(0, 0, 0, 0.5);
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

.reveal {
  /* background: #ed1b0d; */
  color: #40dd84;
  border: solid #40dd84 2.5px;
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  margin-top: 30px;
  width: 100%;
  font-size: 18px;
  font-weight: bolder;
  /* position: absolute;
  bottom: 20px;
  right: 25px; #c5dece*/
}
.reveal:hover {
  color: #40ef84;
  border: solid #40ef84 2.5px;
}
@media (max-width: 768px) {
  .card {
    width: 100%;
    margin: 0 5px;
  }
}
</style>

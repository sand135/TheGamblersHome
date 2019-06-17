<template>
  <div>
    <div id="bg">
      <img src="poker-table-drawing-11.png">
    </div>


      <div id="player1">
      <img src="Images/player_avatars/avatar1.png" class="avatar">
      <div class="playerNameText">{{ $store.state.player1.name }}</div>
    <div>

      <img v-if="$store.state.player1.cards.length === 0" src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player1_card1" class="playercards">
      <img v-else-if="$store.state.player1.isTurn === true" :src="$store.state.player1.cards[0].imageUrl" id="player1_card1" class="playercards">
      <img v-else="" src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player1_card1" class="playercards">

      <img v-if="$store.state.player1.cards.length === 0" src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player1_card2" class="playercards">
      <img v-else-if="$store.state.player1.isTurn === true" :src="$store.state.player1.cards[1].imageUrl" id="player1_card2" class="playercards">
      <img v-else="" src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player1_card2" class="playercards">

    </div>
    </div>

      <div id="player2">
      <img src="Images/player_avatars/avatar2.png" class="avatar">
      <div class="playerNameText">{{ $store.state.player2.name }}</div>

      <img v-if="$store.state.player2.cards.length === 0" src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player2_card1" class="playercards">
      <img v-else-if="$store.state.player2.isTurn === true" :src="$store.state.player2.cards[0].imageUrl" id="player2_card1" class="playercards">
      <img v-else="" src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player2_card1" class="playercards">

      <img v-if="$store.state.player2.cards.length === 0" src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player2_card2" class="playercards">
      <img v-else-if="$store.state.player2.isTurn === true" :src="$store.state.player2.cards[1].imageUrl" id="player2_card2" class="playercards">
      <img v-else="" src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player2_card2" class="playercards">


        <div class="betSlider">
       <input type="range" min="0" max="100" step="5" v-model="$store.state.value">
       <input type="number" v-model="$store.state.value"/>
       <input type="button" value="Bet" id="betbutton"
       v-on:click="$store.commit('betMoney')">
       <span v-text="$store.state.value+'$'"></span>
</div>
    </div>

    <game-button />

    <img v-for="card in $store.state.cardsOnTable" :src="card.imageUrl" :id="card.id" class="tablecards"/>

    <div id="totalpot">
        Total pot: {{ $store.state.pot }}$
    </div>
</div>
</template>
<script>
  import GameButtons from './GameButtons.vue'
export default {
  components: {
    'game-button': GameButtons
  },
  data() {
    return {

    }
  },
   computed:{
         total: function(){
            return this.value + "$"
         }
         },
  methods: {
    onClick() {}
  }
};
</script>
<style scoped>
#bg {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-color: black;
}
#bg img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  min-width: 45%;
  min-height: 45%;
}
/* #thetable {
  /* position: relative;
  bottom: center;
  right: center;
  width: 80%;
  z-index: 1;
} */
/* #table {
  position: center;
  width: 80%;
  resize: both;
  overflow: auto;
} */
#totalpot {
    position: fixed;
    bottom: 65%;
    right: 50%;
    color: black;
    font-size: 200%;
}
#tablecard0 {
  position: fixed;
  bottom: 40%;
  right: 61.5%;
}
#tablecard1 {
  position: fixed;
  bottom: 40%;
  right: 54%;
}
#tablecard2 {
  position: fixed;
  bottom: 40%;
  right: 46.5%;
}
#tablecard3 {
  position: fixed;
  bottom: 40%;
  right: 39%;
}
#tablecard4 {
  position: fixed;
  bottom: 40%;
  right: 31.5%;
}
.tablecards {
  z-index: 2;
  width: 7%;
}
#player1 {
  position: fixed;
  bottom: 80%;
  left: 85%;
}
#player2 {
  position: fixed;
  bottom: 12%;
  left: 85%;
}
.avatar {
  width: 25%;
}
.playerNameText {
  color: green;
  text-align: left;
  font-weight: bold;
  font-size: 1em;
  font-family: sans-serif;
}
.playercards {
    width: 15%;
}
.betSlider{
   color: black;
   background-color: aliceblue;
}
#betbutton {
    position: relative;
}


</style>

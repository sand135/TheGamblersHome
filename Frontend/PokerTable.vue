<template>
<div>
  <div id="bg">
    <img src="poker-table-drawing-11.png">
  </div>

  <game-button />

  <bank />
  <div id="player1">
    <img class="avatar" src="Images/player_avatars/avatar1.png">
    <div class="playerNameText">{{ $store.state.player1.name }}</div>
    <div class="money">{{ $store.state.player1.money }}</div>
    <div>
      <img v-if="$store.state.player1.cards.length === 0" src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player1_card1" class="playercards">
      <img v-else-if="$store.state.player1.isTurn === true" :src="$store.state.player1.cards[0].imageUrl" id="player1_card1" class="playercards">
      <img v-else="" src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player1_card1" class="playercards">

      <img v-if="$store.state.player1.cards.length === 0" src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player1_card2" class="playercards">
      <img v-else-if="$store.state.player1.isTurn === true" :src="$store.state.player1.cards[1].imageUrl" id="player1_card2" class="playercards">
      <img v-else="" src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player1_card2" class="playercards">
    </div>
  </div>/>

  <div id="player2">
    <img class="avatar" src="Images/player_avatars/avatar2.png">
    <div class="playerNameText">{{ $store.state.player2.name }}</div>
    <div class="money">{{ $store.state.player2.money }}</div>
    <div>
      <img v-if="$store.state.player2.isTurn === true" id="player2_card1" class="playercards" :src="$store.state.player2.cards[0].imageUrl">
      <img v-else="" id="player2_card1" class="playercards" src="Images/Playing_cards/backsides/playingcard_backside.jpg">
      <img v-if="$store.state.player2.isTurn === true" id="player2_card2" class="playercards" :src="$store.state.player2.cards[1].imageUrl">
      <img v-else="" id="player2_card2" class="playercards" src="Images/Playing_cards/backsides/playingcard_backside.jpg">
    </div>
  </div>

  <div class="betSlider">
    <input v-if="$store.state.player1.isTurn === true" v-model="$store.state.value" type="range" min="40" :max="$store.state.player1.money" step="5">
    <input v-else-if="$store.state.player2.isTurn === true" v-model="$store.state.value" type="range" min="40" :max="$store.state.player2.money" step="5">
    <input v-model="$store.state.value" type="number">
    <span v-text="$store.state.value+'$'"/>
  </div>

  <div id="pokerchips">
    <img src="Images/small_blind.png" class="small_blind">
    <img src="Images/big_blind.png" class="big_blind">
    <img src="Images/stack-chips.png" class="chips">
    <!-- <img src="Images/pile-of-poker-chips.png" class="pot_chips"> -->
  </div>

  <img v-for="card in $store.state.cardsOnTable" :src="card.imageUrl" :id="card.id" class="tablecards" />

  <div id="totalpot">
    Total pot: {{ $store.state.pot }}$
  </div>
</div>
</template>
<script>
import GameButtons from './GameButtons.vue'
import Bank from './Bank.vue'
export default {
  components: {
    'game-button': GameButtons,
    'bank': Bank
  },
  data() {
    return {}
  },
  computed: {
    total: function() {
      return this.value + "$"
    }
  },
  methods: {
    loan() {
      console.log("Loan Button clicked")
    },
    onClick() {}
  }
}
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
  bottom: 65%;
  left: 85%;
}

#player2 {
  position: fixed;
  bottom: 10%;
  left: 85%;
}

.avatar {
  width: 30%;
}

.playerNameText {
  color: red;
  text-align: left;
  font-weight: bold;
  font-size: 1em;
  font-family: sans-serif;
}

.money {
  color: red;
  text-align: left;
  font-weight: bold;
  font-size: 1em;
  font-family: sans-serif;
}

.playercards {
  width: 30%;
}

.betSlider {
  position: fixed;
  margin-bottom: 10%;
  /* margin-bottom: 30px; */
  background-color: #f44336;
  border-radius: 16px;
  color: black;
  padding: 8px 8px;
  text-align: center;
  text-decoration: none;
  /*color: white; */
  /* background-color: aliceblue;*/
}

#betbutton {
  position: relative;
}

#pokerchips {
  position: fixed;
}

.small_blind {
  position: fixed;
  bottom: 65%;
  right: 15%;
  width: 4%;
}

.big_blind {
  position: fixed;
  bottom: 35%;
  right: 15%;
  width: 5%;
}

.chips {
  position: fixed;
  bottom: 74%;
  right: 47%;
  width: 15%;
}
</style>

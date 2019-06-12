<template>
  <div id="game">
    <!-- Buttons -->

    <div class="btn-group">
      <input
        class="button"
        type="button"
        value="Raise"
        @click="raise()">

      <input
        class="start"
        type="button"
        value="StartGame"
        @click="startGame()">

      <button class="button">Call</button>
      <button class="button">Bet</button>
      <button class="button">Fold</button>
    </div>
    <div class="playerNameText">{{ playerNameText }}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        playerNameText: this.$store.state.playerNames[0].name,
        counter: 0,
        rounds: 1
      }
    },
    methods: {
      startGame() {
        console.log('startGame clicked')
        this.$store.commit('dealCardsToPlayer')
      },
      raise(){
        console.log('raisebutton clicked')
        this.nextPlayersTurn()
      },
      nextPlayersTurn() {

        if (this.counter === this.$store.state.playerNames.length -1){
          this.counter = 0
        }else{
          this.counter ++
        }
        this.playerNameText = this.$store.state.playerNames[this.counter].name
      }
    }
  }
</script>
<style scoped>
#game {
  position: relative;
  z-index: 2;
  color: white;
}

.btn-group .button {
  position: relative;
  background-color: #4CAF50; /* Green */
  border: 1px solid green;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  float: left;
}

.btn-group .button:not(:last-child) {
  border-right: none; /* Prevent double borders */
}

.btn-group .button:hover {
  background-color: #3e8e41;
}

.start {
  background-color: red;
}
  </style>

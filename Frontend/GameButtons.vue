<template>
  <div id="game">
    <div class="btn-group">
      <input
        class="button"
        type="button"
        value="Raise/Bet"
        @click="raise()"
      >
      <input
        class="start"
        type="button"
        value="StartGame"
        @click="startGame()"
      >
      <button class="button">Call</button>
      <button class="button">Check</button>
      <button class="button">Fold</button>
    </div>
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
        this.nextPlayersTurn()
      },
      raise(){
        this.$store.state.playerNames[this.counter].isTurn = false
        console.log('raisebutton clicked')
        this.nextPlayersTurn()
      },
      nextPlayersTurn() {
        if (this.counter === this.$store.state.playerNames.length -1){
          this.counter = 0
          this.rounds ++
        }else{
          this.counter ++
        }
        this.playerNameText = this.$store.state.playerNames[this.counter].name
        this.$store.state.playerNames[this.counter].isTurn = true

        if(this.$store.state.playerNames[this.counter].name === "dealer" && this.rounds === 2){
          this.$store.commit('drawFlop')
          this.nextPlayersTurn()
        }else if (this.$store.state.playerNames[this.counter].name === "dealer" && this.rounds < 4){
          this.$store.commit('drawTurnAndRiver')
          this.nextPlayersTurn()
        }else if (this.$store.state.playerNames[this.counter].name === "dealer" && this.rounds === 4){
          this.$store.commit('drawTurnAndRiver')
          console.log('Count your points!!! :D i am toooooo tired')
        }
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
  margin-top: 50%;
  background-color: #f44336;
  /* border-radius: 12px; */
  color: white;
  padding: 8px 32px;
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

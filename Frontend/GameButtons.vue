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
          class="button"
          type="button"
          value="Call"
          @click="call()">


      <input
        class="start"
        type="button"
        value="StartGame"
        @click="startGame()">


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
        playerNameText: this.$store.state.players[0].name,
        counter: 0,
        rounds: 1,
        swap:false,
        firstPlayerDidCallOnce: false
      }
    },
    methods: {
      startGame() {
        console.log('startGame clicked')
        this.$store.dispatch('dealCardsToPlayer')

        //TODO flytta ut till index.js och gör en funktion som körcontext.commit('nextPlayersTurn')
        this.nextPlayersTurn()


      },
      raise(){
        this.$store.state.players[this.counter].isTurn = false
        //console.log('raisebutton clicked')
        this.$store.state.players[this.counter].didRaise = true
        this.nextPlayersTurn()
      },
      call(){
        this.$store.state.players[this.counter].isTurn = false
        //console.log('callbutton clicked')
        this.$store.state.players[this.counter].didRaise = false

        //kollar om det är första gången som första spelaren calls
        if (this.$store.state.players[this.counter].isFirstPlayer === true && this.$store.state.players[this.counter].didCall === true){
          console.log("player1 did call second time")
          this.nextPlayersTurn(true)
        }else if(this.$store.state.players[this.counter].isFirstPlayer ===   true && this.$store.state.players[this.counter + 1 ].didRaise === true){

          //console.log("player 2 did raise, player1 called")
          this.nextPlayersTurn(true)

        }else if (this.$store.state.players[this.counter].isFirstPlayer ===   true && this.$store.state.players[this.counter].didCall === false){
          //console.log("player1 called first round")
          this.$store.state.players[this.counter].didCall = true
          this.nextPlayersTurn(false)
        }else{
          this.nextPlayersTurn(false)
        }

      },
      setValuesForNewRound(){
        console.log("sets values for new round!")
        for (var i = 0; i < this.$store.state.players.length; i++ ){
          this.$store.state.players[i].didCall = false
          this.$store.state.players[i].didRaise = false
          console.log(this.$store.state.players[i].didCall)
        }

      },
      dealerDealsCard(){
        if(this.rounds === 2){
          this.$store.commit('drawFlop')
          this.nextPlayersTurn()
        }else if (this.rounds < 4){
          this.$store.commit('drawTurnAndRiver')
          this.nextPlayersTurn()
        }else if ( this.rounds === 4){
          this.$store.commit('drawTurnAndRiver')
          console.log('Count your points!!! :D i am toooooo tired')
        }
      },
      goback(){
        this.counter--
      },
      goNext(newRound){
        if(newRound){
          this.counter += 2
        }
        if (this.counter >= this.$store.state.players.length -1){
          this.counter = 0
          this.rounds ++
        }else{
          this.counter ++
        }
        console.log("countern är nu efter goNext:" + this.counter)
      },
      nextPlayersTurn(newRound) {
        console.log("newround har värdet: "+ newRound)

        if(this.$store.state.players[this.counter].didRaise === true && this.$store.state.players[this.counter].isFirstPlayer === false){
          console.log("goes back!")
          this.goback()
        }else{
          console.log("moves on with newRound" + newRound)
          this.goNext(newRound)
        }

        this.playerNameText = this.$store.state.players[this.counter].name
        this.$store.state.players[this.counter].isTurn = true

        if(this.$store.state.players[this.counter].name === "dealer" && this.rounds === 2){
          this.$store.commit('drawFlop')
          this.setValuesForNewRound()
          this.nextPlayersTurn()
        }else if (this.$store.state.players[this.counter].name === "dealer" && this.rounds < 4){
          this.$store.commit('drawTurnAndRiver')
          this.setValuesForNewRound()
          this.nextPlayersTurn()
        }else if (this.$store.state.players[this.counter].name === "dealer" && this.rounds === 4){
          this.$store.commit('drawTurnAndRiver')
          this.setValuesForNewRound()
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

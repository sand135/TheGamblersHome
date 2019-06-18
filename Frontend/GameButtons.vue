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
      <input
        class="button"
        type="button"
        value="Call"
        @click="call()"
      >
      <input
        class="button"
        type="button"
        value="Check"
        @click="check()"
      >
      <input
        class="button"
        type="button"
        value="Fold"
        @click="fold()"
      >
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      startGame() {
        console.log('startGame clicked')
        this.$store.dispatch('fetchCardsForPlayers')
        this.$store.commit('payBlinds')
        //this.$store.commit('nextPlayersTurn')
      },
      raise(){
        console.log('raisebutton clicked')
        this.$store.commit('raise')
      },
      check() {
        console.log('Check button clicked')
        this.$store.commit('check')
      },
      call() {
        console.log('Check button clicked')
        this.$store.commit('call')
      },
      fold() {
        console.log('Fold button clicked')
        this.$store.commit('fold')
      }
    }
  }
</script>
<style scoped>
#game {
  position: relative;
  z-index: 2;
  /*color: white;*/
}

.btn-group {
  position: fixed;
  bottom: 0;
}

.btn-group .button {
  position: relative;
  margin-top: 10%;
  background-color: #f44336;
  border-radius: 12px;
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
  margin-left: 50%;
  background-color: #4CAF50;
  border: none;
  border-radius: 50%;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
  </style>

<template>
  <div>
     
    <div id="bg">
      <img src="poker-table-drawing-11.png">
    </div>
        
      
      <div id="player1">
      <img src="Images/player_avatars/avatar1.png" class="avatar">
      <div class="playerNameText">JONATAN</div>
    <div>
    <img src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player1_card1" class="playercards">
    <img src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player1_card2" class="playercards">
    </div>
    </div>

      <div id="player2">
      <img src="Images/player_avatars/avatar2.png" class="avatar">
      <div class="playerNameText">ALEXANDER</div>
    <img src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player2_card1" class="playercards">
    <img src="Images/Playing_cards/backsides/playingcard_backside.jpg" id="player2_card2" class="playercards">
    </div>
    
    <img src="Images/Playing_cards/2_of_clubs.png" id="tablecard1" class="tablecards">
    <img src="Images/Playing_cards/2_of_diamonds.png" id="tablecard2" class="tablecards">
    <img src="Images/Playing_cards/2_of_hearts.png" id="tablecard3" class="tablecards">
    <img src="Images/Playing_cards/2_of_spades.png" id="tablecard4" class="tablecards">
    <img src="Images/Playing_cards/3_of_clubs.png" id="tablecard5" class="tablecards">

    
    <div id="totalpot">
        Total pot: {{ this.potMoney }}
            </div>
    
  
  </div>
</template>
<script>
export default {
  data() {
    
    return {};
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

#tablecard1 {
  position: fixed;
  bottom: 40%;
  right: 61.5%;

}

#tablecard2 {
  position: fixed;
  bottom: 40%;
  right: 54%;
}
#tablecard3 {
  position: fixed;
  bottom: 40%;
  right: 46.5%;
}
#tablecard4 {
  position: fixed;
  bottom: 40%;
  right: 39%;
} 
#tablecard5 {
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
</style>
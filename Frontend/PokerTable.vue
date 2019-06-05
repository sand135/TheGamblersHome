<template>
  <div>
    <div id="bg">
      <img src="poker-table-drawing-11.png">
    </div>
    <img src="Images/Playing_cards/2_of_clubs.png" id="tablecard1" class="tablecards">
    <img src="Images/Playing_cards/2_of_diamonds.png" id="tablecard2" class="tablecards">
    <img src="Images/Playing_cards/2_of_hearts.png" id="tablecard3" class="tablecards">
    <img src="Images/Playing_cards/2_of_spades.png" id="tablecard4" class="tablecards">
    <img src="Images/Playing_cards/3_of_clubs.png" id="tablecard5" class="tablecards">

    <span id="player1">
      <img src="Images/player_avatars/avatar1.png" class="avatar">
      <div class="playerNameText">JONATAN</div>
    </span>
    <span id="player2">
      <img src="Images/player_avatars/avatar2.png" class="avatar">
      <div class="playerNameText">ALEXANDER</div>
    </span>
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

#thetable {
  position: relative;
  bottom: center;
  right: center;
  width: 80%;
  z-index: 1;
}

/* #table {
  position: center;
  width: 80%;
  resize: both;
  overflow: auto;
} */

#tablecard1 {
  position: fixed;
  bottom: 40%;
  right: 50%;

}

#tablecard2 {
  position: fixed;
  bottom: 40%;
  right: 40%;
}
#tablecard3 {
  position: fixed;
  bottom: 40%;
  right: 46.5%;
}
#tablecard4 {
  position: fixed;
  bottom: 40%;
  right: 30%;
} 
#tablecard5 {
  position: fixed;
  bottom: 40%;
  right: 20%;
} 

.tablecards {
  z-index: 2;
  width: 7%;
}
#player1 {
  position: fixed;
  bottom: 8%;
  right: 0%;
}

#player2 {
  position: fixed;
  bottom: 80%;
  right: 0%;
}

.avatar {
  width: 40%;
}

.playerNameText {
  color: green;
  text-align: left;
  font-weight: bold;
  font-size: 5%;
  font-family: fantasy;
}
</style>
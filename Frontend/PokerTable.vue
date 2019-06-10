<template>
 <div>
 <img src="poker-table-drawing-11.png" id="backgroundImage">
    <!-- <img src="Images/Playing_cards/2_of_clubs.png" id="tablecard1"> -->
            <!-- <img src="Images/Playing_cards/2_of_diamonds.png" id="tablecard2">
            <img src="Images/Playing_cards/2_of_hearts.png" id="tablecard3">
            <img src="Images/Playing_cards/2_of_spades.png" id="tablecard4">
             <img src="Images/Playing_cards/3_of_clubs.png" id="tablecard5"> -->
            <picture id="avatar1" class="player1">
                <img src ="Images/player_avatars/avatar1.png" class="avatar">
                <div id="player1" class="player1">Kalle</div>
            </picture>
             <img src ="Images/player_avatars/avatar2.png" id="avatar2" class="avatar"> -->
 </div>
</template>
<script>

  export default {
    data() {
      return {
        
      }
    },
    methods: {

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



 }
 #tablecard5 {
    position: fixed;
    bottom: 300px;
    right: 470px;
    width: 100px;

 }
 #avatar1 {
        position: fixed;
    bottom: 100px;
    right: 180px;
    width: 100px;
    color: blue;

 }

#avatar2 {
            position: fixed;
    bottom: 550px;
    right: 150px;
    width: 100px;
 }

</style>

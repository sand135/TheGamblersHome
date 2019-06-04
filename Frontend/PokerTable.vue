<template>
 <div>
 <img src="poker-table-drawing-11.png" id="backgroundImage">
            <img src="Images/Playing_cards/2_of_clubs.png" id="tablecard1">
            <img src="Images/Playing_cards/2_of_diamonds.png" id="tablecard2">
            <img src="Images/Playing_cards/2_of_hearts.png" id="tablecard3">
            <img src="Images/Playing_cards/2_of_spades.png" id="tablecard4">
             <img src="Images/Playing_cards/3_of_clubs.png" id="tablecard5">
            <span id="player1">                 
                <img src ="Images/player_avatars/avatar1.png" class="avatar"> 
                <div class="playerNameText">JONATAN</div>
            </span>
            <span id="player2">
                 <img src ="Images/player_avatars/avatar2.png" class="avatar">
                 <div class="playerNameText">ALEXANDER</div>
                </span>
            
             
             
 </div>
</template>
<script>


  export default {
    data() {
      return {
     
      }
    },
    methods: {
      onClick() {
       
      }
    }
  }
</script>
<style scoped>
input {
    width: 100%;
}

#backgroundImage {
    position: center; 
    width: 1300px; 
    
}

 #tablecard1 {
    position: fixed;
    bottom: 300px;
    right: 950px;
    width: 100px;

 }

  #tablecard2 {
    position: fixed;
    bottom: 300px;
    right: 830px;
    width: 100px;

 }
 #tablecard3 {
    position: fixed;
    bottom: 300px;
    right: 710px;
    width: 100px;

 }
 #tablecard4 {
    position: fixed;
    bottom: 300px;
    right: 590px;
    width: 100px;

 }
 #tablecard5 {
    position: fixed;
    bottom: 300px;
    right: 470px;
    width: 100px;

 }
 #player1 {
        position: fixed;
    bottom: 100px;
    right: 180px;
    width: 100px;
    
 }

#player2 {
    position: fixed;
    bottom: 650px;
    right: 150px;
    width: 100px;
 }

.avatar {
    width: 100px
}

.playerNameText {
    color: blue; 
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    font-family: fantasy;
}


</style>
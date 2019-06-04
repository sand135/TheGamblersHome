<template>
 <div>
 <img src="poker-table-drawing-11.png" id="backgroundImage">
            <img src="Images/Playing_cards/2_of_clubs.png" id="tablecard1">
            <img src="Images/Playing_cards/2_of_diamonds.png" id="tablecard2">
            <img src="Images/Playing_cards/2_of_hearts.png" id="tablecard3">
            <img src="Images/Playing_cards/2_of_spades.png" id="tablecard4">
             <img src="Images/Playing_cards/3_of_clubs.png" id="tablecard5">
            <picture id="avatar1" class="player1">                 
                <img src ="Images/player_avatars/avatar1.png" class="avatar"> 
                <div id="player1" class="player1">Kalle</div>
            </picture>
             <img src ="Images/player_avatars/avatar2.png" id="avatar2" class="avatar">
             
             
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
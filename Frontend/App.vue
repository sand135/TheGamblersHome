<template>
  <div>
    <sign-up-helper></sign-up-helper>
  </div>

</template>
<script>
  import SignupHelper from './loginFunctionality/SignupHelper.vue'
  import Card from './Card.vue'
  import PokerTable from './PokerTable.vue'
  import GameButtons from './GameButtons.vue'
  export default{
    components: {
       'sign-up-helper': SignupHelper,
       'game-buttons': GameButtons
    }
  }
</script>
<style>
body {
  background-color: black;
}
</style>

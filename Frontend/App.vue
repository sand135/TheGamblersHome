<template>
<div>
  <sign-up-helper></sign-up-helper>
  <card></card>
  <poker-table></poker-table>
  </div>
</template>
<script>
  import SignupHelper from './loginFunctionality/SignupHelper.vue'
  import Card from './Card.vue'
  import PokerTable from './PokerTable.vue'
  export default{
    components: {
      'sign-up-helper': SignupHelper,
      'poker-table': PokerTable,
      'card': Card,
    }
  }
</script>
<style>
</style>

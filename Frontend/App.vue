<template>
  <div>
    <sign-up-helper />
    <card />
    <poker-table />
  </div>
</template>
<script>
  import SignupHelper from './loginFunctionality/SignupHelper.vue'
  import Card from './Card.vue'
  import PokerTable from './PokerTable.vue'
  export default{
    components: {
      'card': Card,
      'poker-table': PokerTable,
      'sign-up-helper': SignupHelper,
    }
  }
</script>
<style>
</style>

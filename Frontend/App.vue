<template>
  <div>
    <sign-up-helper />
  </div>
</template>
<script>
  import SignupHelper from './loginFunctionality/SignupHelper.vue'
  // import Card from './Card.vue'
  import PokerTable from './PokerTable.vue'
  export default{
    components: {
      'sign-up-helper': SignupHelper
    }
  }
</script>
<style>
body {
  background-color: black;
}
</style>

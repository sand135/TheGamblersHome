<template>
  <div>
    <sign-up-helper></sign-up-helper>
    <poker-table />
     <card />
  </div>

</template>
<script>
  import SignupHelper from './loginFunctionality/SignupHelper.vue'
  export default{
    components: {
       'poker-table': PokerTable,
       'card': Card,
       'sign-up-helper': SignupHelper
    }
  }
</script>
<style>
body {
  background-color: black;
}
</style>

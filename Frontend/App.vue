<template>
  <div>
    <sign-up-helper></sign-up-helper>
  </div>

</template>
<script>
  import SignupHelper from './loginFunctionality/SignupHelper.vue'
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

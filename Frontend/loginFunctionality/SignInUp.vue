<template>
<div id="signInUpButtons">
  <button class="button" v-on:click="redirectToLogin()">Log in</button>

  <button class="button" v-on:click="redirectToRegister()">Register</button>
</div>

</template>

<script type="text/javascript">
export default {
  name: 'SignInUp',
  methods: {
    redirectToLogin(){
        this.$router.push({ name: "SignIn" })
    },
    redirectToRegister(){
      this.$router.push({ name: "Register" })
    }
  }
}
</script>

<style>
.button {
  background-color: #4CAF50; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 25px;
}
</style>
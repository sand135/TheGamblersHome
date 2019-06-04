<template>
  <div id ="register">
    <input
      type="text"
      placeholder="Username"
      v-model="input.username">>
    <input
      type="text"
      v-model="input.password"
      placeholder="password">>
    <input
      type="button"
      value="Register"
      v-on:click="register()">>
  </div>
</template>
<script>
  export default {
    name: 'Register',
    data() {
      return {
        input: {
          username: "",
          password: ""
        }
      }
    },
    methods: {
      register() {
        //Kolla mot sql databasen att användarnamnet inte redan finns-
        //Om OK ladda in användaren  i databasen och gå över till main
        //OM INTE visa pop-up att användarnamnet redan används.
        this.$router.replace({ name: "main" })
      }
    }
  }
</script>
<style scoped>
  #register {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
</style>

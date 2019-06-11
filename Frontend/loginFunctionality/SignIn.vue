<template>
<div id ="login">
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
      value="Sign in"
      v-on:click="login()">>
    <input
    type="button"
    value="Back"
    v-on:click="">>
  </div>
</template>
<script>
  export default {
    name: 'SignIn',
    data() {
      return {
        input: {
          username: "",
          password: ""
        }
      }
    },
    methods: {
      login() {
        fetch('http://localhost:8080/api/users/'+this.input.username+'/'+this.input.password,)
          .then(response => {
            console.log(response);
            console.log(response.status)
            if(response.status >= 400 && response.status <= 499){
              console.log('Login Failed')
            }else{
              console.log('Login Successfull' + response.statusText)
              this.$store.state.authenticated = true
              //TODO: Samma som i register
              this.$router.replace({ name: "game" })
            }
          })
      },
    }
  }
</script>
<style>
    #login {
      width: 500px;
      border: 1px solid #CCCCCC;
      background-color: #FFFFFF;
      margin: auto;
      margin-top: 200px;
      padding: 20px;
    }

</style>

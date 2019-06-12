<template >
<div id ="login">
  <h1>Login</h1>
    <input
      type="text"
      placeholder="Username"
      v-model="input.username">
    <input
      type="password"
      v-model="input.password"
      placeholder="password">
    <input
      type="button"
      value="Sign in"
      v-on:click="login()">
    <input
    type="button"
    value="Back"
    v-on:click="back()">
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
            if(response.status === 400){
              console.log('Login Failed')
            }else{
              console.log('Login Successfull' + response.statusText)
              this.$store.state.authenticated = true
              this.$router.replace({ name: "main" })
            }
          })
      },
       back(){
        this.$router.replace({ name: "SignInUp" })

      }
    }
  }
</script>
<style>
    #login {
      width: 30%;
      border: 1px solid #CCCCCC;
      background-color: #FFFFFF;
      margin: auto;
      margin-top: 200px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      padding: 15px;
      /* background-color: grey; */
      border: 3px solid black;
    }
    input{
      height: 35px;
    padding: 5px 5px;
    margin: 10px 0px;
    background-color: #e0dada;
    border: none;
    border-radius: 25px;
    }
    h1{
      margin-left: auto;
      margin-right: auto
    }

</style>

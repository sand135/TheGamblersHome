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
    v-on:click="back()">>
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
        //BYT UT TILL SQL
        if(this.input.username != "" && this.input.password != "") {
          if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
            this.$store.state.authenticated = true
            this.$router.replace({ name: "main" })
          } else {
            console.log("The username and / or password is incorrect")
          }
        } else {
          console.log("A username and password must be present")
        }
      },
      back(){
        this.$router.replace({ name: "SignInUp" })
      },

    },

  }




</script>
<style scoped>
    #login {
      width: 500px;
      border: 1px solid #CCCCCC;
      background-color: #FFFFFF;
      margin: auto;
      margin-top: 200px;
      padding: 20px;
    }
</style>

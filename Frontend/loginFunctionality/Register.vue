<template>
  <div id="container">
    <div id="image">
      <img src="./images/casino_2.png">
    </div>
    <div id="register">
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
      <input
        type="button"
        value="Back"
        v-on:click="back()">>
    </div>
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
        },
        successfullRegistration:true,
      }
    },
    methods: {
      register() {
        fetch('http://localhost:8080/api/', {
          body: '{"username":"'+ this.input.username+'", "password":"'+this.input.password+'"}',
          headers: {
            'Content-Type':'application/json'
          },
          method: 'POST'
        }).then(response => {
          console.log(response)
          if(response.status !== 200 ){
            alert("Username already excists. Please try again!")
            console.log("Username already excists. Please try again!")
          }else{
            this.$store.state.authenticated = true
            //TODO: Sätta playerobjekt namn med input värde
            this.$router.replace({ name: "game" })
          }
        }).catch(e => console.log(e))

        if(this.authenticated){
          this.$router.replace({ name: "main" })
        }
      },
      back(){
        this.$router.replace({ name: "SignInUp" })

      }

    }
  }
</script>
<style scoped>
  div {
    background-color: #780001;
  }
  #image{
    flex-grow: 1;
    margin: 40px 80px;
    /* position: fixed; */
  }
  #image img {
    height: 400px;
  }
  #container {
    align-items: center;
    display: flex;
  }
  #register {
    /* position: absolute; */
    /* margin-top: 25%; */
    /* margin-left: 400px; */
    /* width: 50%; */
    border: 3px solid #73AD21;
    margin: 40px 80px;
    padding: 10px;
    padding: 20px;
  }
</style>

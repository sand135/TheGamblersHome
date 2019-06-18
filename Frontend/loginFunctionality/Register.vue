<template>
<div>
  <!-- <h1>The Gamblers home</h1> -->
  <div id="bg">
      <img src="./images/pokerCardsBackground.jpg">
    </div>
  <div id="container">
    <div id="register">
       <h1>Register new user</h1>
       <img id="registerIcon" src="./images/new-user.png">
      <input
        id="inputFields"
        type="text"
        placeholder="New Username"
        v-model="input.username">
      <input
        id="inputFields"
        type="password"
        v-model="input.password"
        placeholder="New password">
      <input
        id="btn"
        type="button"
        value="Register"
        v-on:click="register()">
      <input
        id="btn"
        type="button"
        value="Back to login"
        v-on:click="back()">
    </div>
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
            this.$router.replace({ name: "main" })
          }
        }).catch(e => console.log(e))
        if(this.authenticated){
          this.$router.replace({ name: "main" })
        }
      },
      back(){
        this.$router.replace({ name: "SignIn" })
      }
    }
  }
</script>
<style scoped>
 #registerIcon{
    width: 20%;
   margin: 10px 180px;
  }
#bg {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  z-index: -1;
}
#bg img {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  min-width: 45%;
  min-height: 45%;
}
#inputFields{
    z-index: 2;
    height: 35px;
    width: 70%;
    padding: 5px 5px;
    margin: 10px 60px;
    background-color: #e0dadac6;
    border: none;
    border-radius: 25px;
    border: 3px solid rgba(0, 0, 0, 0.515);
}
#btn{
  background-color: rgba(75, 213, 48, 0.755);
   width: 50%;
   padding: 5px 5px;
   margin: 10px 100px;
    transition-duration: 0.4s;
}
#btn:hover{
  background-color: white;
  color: black;
}
  h1{
    color: black;
  }
  #register {
     background-color: rgba(255, 255, 255, 0.433);
    z-index: 1;
     width: 30%;
     border: 3px solid black;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
    display:flex;
    flex-direction: column;
    padding: 15px;
    text-align: center;
  }
</style>

<template >
<div>
<div id="bg">
      <img src="./images/pokerCardsBackground.jpg">
    </div>
<div id ="login">
  <h1>Login</h1>
    <img id="loginIcon" src="./images/user.png">
    <input
    id="inputFields"
      type="text"
      placeholder="Username"
      v-model="input.username">
    <input
     id="inputFields"
      type="password"
      v-model="input.password"
      placeholder="password">
    <input
    id="btn"
      type="button"
      value="Sign in"
      v-on:click="login()">
    <input
    id="btn"
    type="button"
    value="Back"
    v-on:click="back()">
  </div>
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

  #loginIcon{
    width: 20%;
      /* padding: 5px 5px; */
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
   background-color:rgba(75, 213, 48, 0.755); 
   width: 50%;
   padding: 5px 5px;
   margin: 10px 100px;
   transition-duration: 0.4s;
}
#btn:hover{
  background-color: white;
  color: black;
}
    #login {
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

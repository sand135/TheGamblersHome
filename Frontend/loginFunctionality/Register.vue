<template>
  <div id="container">
    <!-- <div id="image">
      <img src="./images/casino_2.png">
    </div> -->
   
    <div id="register">
       <h1>Register</h1>
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
        value="Register"
        v-on:click="register()">
      <input
        type="button"
        value="Back"
        v-on:click="back()">
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
        this.$router.replace({ name: "SignInUp" })

      }

    }
  }
</script>
<style scoped>

input{
    height: 35px;
    padding: 5px 5px;
    margin: 10px 0px;
    background-color: #e0dada;
    border: none;
    border-radius: 25px;

  /* position: relative;
  padding: 5px 0;
 font-family: 'sans-serif', 'Segoe UI', 'Robot', sans-serif; */
  
}
   /* div {
    background-color: #780001;
  } 
   #image{
    flex-grow: 1;
    margin: 40px 80px;
     position: fixed; 
    
  }
  #image img {
    height: 100%;
    width: auto
  }  */
  /* #container {
    align-items: center;
    display: flex;
    background-size: cover;
  } */
  #register {
    /* position: absolute; */
    /* margin-top: 25%; */
    /* margin-left: 400px; */
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

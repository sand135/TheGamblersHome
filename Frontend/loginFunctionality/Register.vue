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
      <input
      type="button"
      value="Back"
      v-on:click="back()">>
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
          body: '{"username":"'+ this.input.username+'", "password":'+this.input.password+'}',
          headers: {
            'Content-Type':'application/json'
          },
          method: 'POST'
        }).then(response => response.json())
          .then(result =>{
            console.log(result.status)
            if(result === "Bad request"){
              console.log('registration failed')
            }else{
              console.log('registration sucessfull'+ result)
              this.$router.replace({ name: "main" })
            }
          })
          
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
  #register {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
</style>

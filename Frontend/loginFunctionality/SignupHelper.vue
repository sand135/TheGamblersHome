<template>
  <div>
    <div id="nav">
      <router-link id="logout" v-if="this.$store.state.authenticated" to="/signinup/signin" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
  export default {
    name: 'SignupHelper',
    mounted() {
      if(!this.$store.state.authenticated) {
        this.$router.push({ name: "SignIn" })
      }
      window.onpopstate = () => {
        if (
          this.$store.state.authenticated &&
          this.$route.path == "/signinup/signin"
        ) {
          this.$router.push("/game")
        }
      }
    },
    methods: {
      logout() {
        this.$store.state.authenticated = false
      }
    }
  }
</script>

<style scoped>
    /* body {
        background-color: #F0F0F0;
    } */
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 1024px;
        margin: auto;
    }
    #logout {
      position: relative;
      z-index: 2;
      color: white;
    }
</style>

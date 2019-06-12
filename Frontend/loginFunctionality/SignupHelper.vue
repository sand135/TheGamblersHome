<template>
  <div>
    <div id="nav">
      <router-link v-if="this.$store.state.authenticated" to="/SignInUp" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
  export default {
    name: 'SignupHelper',
    mounted() {
      if(!this.$store.state.authenticated) {
        this.$router.replace({ name: "SignInUp" })
      }
      window.onpopstate = () => {
        if (
          this.$store.state.authenticated &&
          this.$route.path == "/signinup"
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

<style>
    body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 1024px;
        margin: auto;
    }
<<<<<<< HEAD
    #nav {
      position: relative;
=======
    .nav {
      position: absolute;
>>>>>>> JonatanMaster
    }
</style>

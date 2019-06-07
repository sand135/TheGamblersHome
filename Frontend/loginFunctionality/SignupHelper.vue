<template>
  <div>
    <div id="nav">
      <router-link v-if="this.$store.state.authenticated" to="/signInUp" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
    <!-- <router-view @authenticated="setAuthenticated" /> -->
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'SignupHelper',

    data() {
      return {
        //authenticated: false,
        //authenticated: this.$store.state.authenticated,
        //mockAccount ska ändras till sql!!!!!!!!!!
        mockAccount: {
          username: "nraboy",
          password: "password"
        }
      }
    },
    mounted() {
      if(!this.$store.state.authenticated) {
        this.$router.replace({ name: "SignInUp" })
      }
      window.onpopstate = () => {
        if (
          this.$store.state.authenticated &&
          this.$route.path == "/signinup"
        ) {
          this.$router.push("/main")
        }
      }
    },
    methods: {
      // setAuthenticated(status) {
      //   this.authenticated = status
      // },
      logout() {
        //this.authenticated = false
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
</style>

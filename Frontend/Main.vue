<template>
  <div id="secure">
    <div>
      <h1>Secure Area</h1>
      <p>
        This is a secure area
      </p>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'main',
    data() {
      return {
        authenticated: this.$store.state.authenticated
      }
    },
    mounted() {
      if(!this.authenticated) {
        this.$router.replace({ name: "SignInUp" })
      }
    }
  }
</script>

<style scoped>
    #secure {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>

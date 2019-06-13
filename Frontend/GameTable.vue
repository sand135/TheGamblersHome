
<template>
  <div>
    <poker-table />
    <card />
  </div>
</template>
<script>
  import Card from './Card.vue'
  import PokerTable from './PokerTable.vue'
  export default {
    components: {
      'card': Card,
      'poker-table': PokerTable,

    },
    mounted() {
      if(!this.$store.state.authenticated) {
        this.$router.replace({ name: "SignInUp" })
      }
    }
  }
</script>
<style>
body {
  background-color: white;
}
</style>

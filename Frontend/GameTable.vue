
<template>
  <div>
    <poker-table></poker-table>
     <card></card>
  </div>

</template>
<script>
  import Card from './Card.vue'
  import PokerTable from './PokerTable.vue'
  export default {
    components: {
      'poker-table': PokerTable,
      'card': Card,
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

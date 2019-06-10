<template>
  <div>
    <card />
    <poker-table />
  </div>
</template>
<script>
  import Card from './Card.vue'
  import PokerTable from './PokerTable.vue'

  export default {
    components: {
      'card': Card,
      'poker-table': PokerTable
    }
  }
</script>

<style>
body {
  background-color: black;
}
</style>

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
       'poker-table': PokerTable,
       'card': Card,

    }
  }
</script>
<style>
body {
  background-color: black;
}
</style>

<template>
  <div>
    <card />
    <poker-table />
  </div>
</template>
<script>
  import CounterButton from './CounterButton.vue'
  import Card from './Card.vue'
  import PokerTable from './PokerTable.vue'

  export default {
    components: {
       'counter-button': CounterButton,
       'card': Card,
       'poker-table': PokerTable
    }
  }
</script>
<style> 
body{
  background-color: black;
}
</style>


<template>
  <div>
  
   <poker-table />
  </div>
</template>
<script>
  import CounterButton from './CounterButton.vue'
  import PokerTable from './PokerTable.vue'

  export default {
    components: {
      'counter-button': CounterButton,
      'poker-table': PokerTable
    }
  }
</script>
<style>
 body {
      background-color:black;
      
  }
</style>
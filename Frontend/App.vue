<template>
  <div>
    <counter-button />
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
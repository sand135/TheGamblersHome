<template>
  <div>
<<<<<<< HEAD
    <counter-button />
    <cards />
=======
    <card />
    <poker-table />
>>>>>>> master
  </div>
</template>
<script>
  import CounterButton from './CounterButton.vue'
<<<<<<< HEAD
  import Cards from './Cards.vue'
=======
  import Card from './Card.vue'
  import PokerTable from './PokerTable.vue'
>>>>>>> master

  export default {
    components: {
       'counter-button': CounterButton,
<<<<<<< HEAD
       'cards': Cards
    }
  }
</script>
=======
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
>>>>>>> master

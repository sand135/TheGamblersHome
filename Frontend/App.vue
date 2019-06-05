<template>
  <div>
    <counter-button />
    <cards />
  </div>
</template>
<script>
  import CounterButton from './CounterButton.vue'
  import Cards from './Cards.vue'

  export default {
    components: {
       'counter-button': CounterButton,
       'cards': Cards
    }
  }
</script>

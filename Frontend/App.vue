<template>
  <div>
    <card />
    <counter-button />
  </div>
</template>
<script>
  import CounterButton from './CounterButton.vue'
  import Card from './Card.vue'

  export default {
    components: {
       'counter-button': CounterButton,
       'card': Card
    }
  }
</script>

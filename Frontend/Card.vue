<template>
  <div class="outline">
    <div v-on:click="onClick"> {{ this.card }}</div>
  </div>
</template>
<script>
  export default {
    created() {
      this.createDeck(this.deck)
    },
    data() {
      return {
        deck: [],
        bool: true,
        card: {}
      }
    },
    methods: {
      onClick() {

        console.log(this.deck[0].suit+this.deck[0].value)
        this.deck.splice(0,1)
        this.card = this.deck[0].suit+this.deck[0].value
      },
      createDeck(deck) {
        const suits = ['♥', '♠', '♦', '♣']
        const values = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K']
        for (var i = 0; i < suits.length; i++) {
          for (var n = 0; n < values.length; n++) {
            deck.push({suit:suits[i], value: values[n]})
          }
        }
        //console.log(deck)
        this.shuffle(deck)
      },
      shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]
        }
        this.deck = array
        this.card = this.deck[0].suit+this.deck[0].value
        //console.log(this.deck)
      }
    }
  }
</script>
<style scoped>
  input {
    width: 100%;
  }
</style>

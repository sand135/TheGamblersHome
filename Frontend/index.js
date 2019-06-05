import Vue from 'vue'
import App from './App.vue'

<<<<<<< HEAD

new Vue({
  el: '#app',
  created(){
    this.createDeck()
    
  },
  data:{
      suits: ['♥','♦','♠','♣'],
      values: ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'],
      cards:[],
      suitColor: {
       "♠": 'black',
       "♣": 'black',
       '♦': 'red',
       '♥': 'red',
      }
  },
  methods:{
    createDeck(){
      let id = 1
      this.cards = []

      for(let suit = 0; suit < this.suits.length; suit++){
        for (let value = 0 ; value < this.values.length; value++){
          let card = {
            id: id,
            suit: this.suits[suit],
            value: this.values[value],
          }
          this.cards.push(card)
          id++
        }
      }
      console.log(this.cards);
      
    }
   
  },

  render: h => h(App)

=======
import App from './App.vue'

new Vue({
  el: '#app',
  data: {
    katt: "Hej"
  },
  methods: {

  },
  render: h => h(App)
>>>>>>> master
})







import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Router from './router'

Vue.use(Vuex)

Vue.config.devtools = true

const state = {
  imgArray: [],
  deck: null,
  bool: true,
  card: {},
  cardsOnTable: [],
  players: [{}],
  pot: 100,
  currentBet: null,
  value: 50,
  authenticated: false

}

const mutations = {

  bet(state) {
    state.pot = Number(state.pot) + Number(state.value)
  },

  drawTurnAndRiver(state) {
    // Lägger till turn och river till cardsOnTable
    // Om cardsOnTable.length är 3 så ska id vara tablecard4 annars tablecard5
    if (state.cardsOnTable.length === 3) {
      state.deck.splice(0, 1)
      let card = {suit: state.deck[0].suit, value: state.deck[0].value, imageUrl: state.deck[0].imageUrl, id: "tablecard3"}
      state.cardsOnTable.push(card)
      state.deck.splice(0, 1)
    } else if (state.cardsOnTable.length === 4) {
      state.deck.splice(0, 1)
      let card = {suit: state.deck[0].suit, value: state.deck[0].value, imageUrl: state.deck[0].imageUrl, id: "tablecard4"}
      state.cardsOnTable.push(card)
      state.deck.splice(0, 1)
    }
  },
  drawFlop(state) {
    // Tar bort översta kortet innan man delar ut flop
    state.deck.splice(0,1)
    for (var i = 0; i < 3; i++) {
      state.deck[i].id = 'tablecard'+i
      state.cardsOnTable.push(state.deck[i])
    }
    state.deck.splice(0,3)
    // this.commit('drawTurnAndRiver')
  },
  createDeck(state) {
    const arr = []
    const suits = ['♥', '♠', '♦', '♣']
    const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
    for (var i = 0; i < suits.length; i++) {
      for (var n = 0; n < values.length; n++) {
        arr.push({
          suit: suits[i],
          value: values[n],
          imageUrl: '',
          id: ''
        })
      }
    }
    state.deck = arr

    for (let i = state.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [state.deck[i], state.deck[j]] = [state.deck[j], state.deck[i]]
    }
    this.commit('addCardsToTable')
  },
  addCardsToTable(state) {
    for (var index in state.deck) {
      switch (state.deck[index].value) {
      case 'A':
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/ace_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/ace_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/ace_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/ace_of_clubs.png'
        }
        break
      case 2:
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/2_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/2_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/2_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/2_of_clubs.png'
        }
        break
      case 3:
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/3_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/3_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/3_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/3_of_clubs.png'
        }
        break
      case 4:
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/4_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/4_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/4_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/4_of_clubs.png'
        }
        break
      case 5:
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/5_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/5_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/5_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/5_of_clubs.png'
        }
        break
      case 6:
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/6_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/6_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/6_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/6_of_clubs.png'
        }
        break
      case 7:
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/7_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/7_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/7_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/7_of_clubs.png'
        }
        break
      case 8:
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/8_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/8_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/8_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/8_of_clubs.png'
        }
        break
      case 9:
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/9_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/9_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/9_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/9_of_clubs.png'
        }
        break
      case 10:
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/10_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/10_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/10_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/10_of_clubs.png'
        }
        break
      case 'J':
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/jack_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/jack_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/jack_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/jack_of_clubs.png'
        }
        break
      case 'Q':
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/queen_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/queen_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/queen_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/queen_of_clubs.png'
        }
        break
      case 'K':
        if (state.deck[index].suit === '♥') {
          state.deck[index].imageUrl = 'Images/Playing_cards/king_of_hearts.png'
        } else if (state.deck[index].suit === '♠') {
          state.deck[index].imageUrl = 'Images/Playing_cards/king_of_spades.png'
        } else if (state.deck[index].suit === '♦') {
          state.deck[index].imageUrl = 'Images/Playing_cards/king_of_diamonds.png'
        } else {
          state.deck[index].imageUrl = 'Images/Playing_cards/king_of_clubs.png'
        }
        break
      }
    }
  }
}

const store = new Vuex.Store({
  mutations,
  state
})

new Vue({
  el: '#app',
  created() {
    this.$store.commit('createDeck')
    this.$store.commit('drawFlop')
  },
  store: store,
  router: Router,
  render: h => h(App)
})

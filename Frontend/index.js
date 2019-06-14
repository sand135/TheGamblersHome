import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Router from './router.js'
// const express  =require('express')
// const cors = require('cors')
// import Express from 'express'
// App.use(cors())
// Vue.use(Express)
Vue.use(Vuex)
Vue.use(Router)
// const app = express()
// app.use(express.json())




Vue.config.devtools = true


const state = {
  deck: null,
  bool: true,
  card: {},
  cardsOnTable: [],
  playerNames:[{cards:[], money:null, name:"dealer", isTurn: false}],

  player1: {cards: [], money: 0, name: '', isTurn: false, isFirstPlayer: true, hasAct: false, activePot: 0},
  player2: {cards: [], money: 0, name: 'Daniel Negreanu', isTurn: false, isFirstPlayer: false, hasAct: false, activePot: 0},
  pot: 0,
  rounds: 0,
  currentBet: null,
  value: 0,
  authenticated: false,
  currentPlayer: null,
  halfPot: 0,
  counter: 0
}

const actions = {
  // Är en async metod som anropas från signin komponenten
  fetchPlayer(context) {
    if (state.authenticated === true) {
      fetch('http://localhost:8080/api/users/' + state.player1.name)
        .then(response => response.json())
        .then(result => {
          context.commit('setPlayerInfo', result.money)
        })
    }
  }
}

const mutations = {
  raise(state){
    //state.playerNames[this.counter].isTurn = false
    console.log('raisebutton clicked')
    this.commit('testBet')
    this.commit('checkForActions')
    // this.commit('nextPlayersTurn')
  },
  check(state) {
    //state.playerNames[this.counter].isTurn = false
    console.log('Check button clicked')
    this.commit('testBet')
    this.commit('checkForActions')
  },
  call(state) {
    //state.playerNames[this.counter].isTurn = false
    console.log('Call button clicked')
    this.commit('testBet')
    this.commit('checkForActions')
    // this.commit('nextPlayersTurn')
  },
  checkForActions(state) {
    console.log('checkForActions metod')
    // Jämför player isTurns aktiva pot ifall den är hälften av vad pot är. Då ska nextPlayersTurn anropas och byta spelare
    if (state.playerNames[1].isTurn === true) {
      // Player1 har agerat och vi vill sätta isTurn på player 2 till true ifall aktiva poten är hälften av totalpot
      state.halfPot = state.pot / 2
      console.log(state.halfPot)
      if (state.halfPot === 40) {
        // Player1 har investerat hälften av totalpot första agerande. Alltså en call preflop
        console.log('Player1 Check eller call preflop')
        state.playerNames[1].hasAct = true
        state.playerNames[0].isTurn = true
        state.rounds ++
        this.commit('nextPlayersTurn')
      }
      if (state.halfPot === state.playerNames[1].activePot && state.halfPot > 40) {
        // Player1 har investerat hälften av totalpot, alltså en call eller check
        console.log('Player1 Call eller check')
        state.playerNames[0].isTurn = true
        this.commit('nextPlayersTurn')
      } else if (state.halfPot < state.playerNames[1].activePot) {
        // Player1 har investerat mer än vad halfpot är, alltså en raise.
        console.log('Player1 Raise')
        // state.playerNames[1].isTurn = !state.playerNames[1].isTurn
        // state.playerNames[2].isTurn = !state.playerNames[2].isTurn
        this.commit('nextPlayersTurn')
      }
    } else if (state.playerNames[2].isTurn === true) {
      // Player2 har agerat och vi vill sätta isTurn på player 1 till true ifall aktiva poten är hälften av totalpot
      state.halfPot = state.pot / 2
      console.log(state.halfPot)
      if (state.halfPot === 40) {
        // Player2 har investerat hälften av totalpot första agerande. Alltså en call preflop
        console.log('Player2 Check eller call preflop')
        state.playerNames[1].hasAct = true
        state.playerNames[0].isTurn = true
        state.rounds ++
        this.commit('nextPlayersTurn')
      }
      console.log('Här loggar vi halfpot'+state.halfPot)
      if (state.halfPot === state.playerNames[2].activePot && state.halfPot > 40) {
        // Player2 har investerat hälften av totalpot, alltså en call eller check.
        console.log('Player2 Call eller check')
        state.playerNames[0].isTurn = true
        this.commit('nextPlayersTurn')
      } else if (state.halfPot < state.playerNames[2].activePot) {
        // Player2 har investerat mer än vad halfpot är, alltså en raise.
        console.log('Player2 Raise')
      }
    }
  },
  testBet(state) {
    if (state.playerNames[1].isTurn === true) {
      state.playerNames[1].activePot += Number(state.value)
      console.log('Player1 är isTurn true i bet')
    } else {
      state.playerNames[2].activePot += Number(state.value)
      console.log('Player2 är isTurn true i bet')
    }
    state.pot = state.playerNames[1].activePot + state.playerNames[2].activePot
  },
  nextPlayersTurn(state) {
    // Första valet innan flop osv...
    if (state.playerNames[1].isFirstPlayer === true && state.playerNames[1].activePot === 20 && state.cardsOnTable < 2) {
      console.log('Player1 är firstplayer och börjar agera')
      state.player1.isTurn = false
      state.player2.isTurn = true
    } else if (state.playerNames[2].isFirstPlayer === true && state.playerNames[2].activePot === 20 && state.cardsOnTable < 2) {
      console.log('Player2 är firstplayer och börjar agera')
      state.player2.isTurn = false
      state.player1.isTurn = true
    }

    console.log('Här testar vi')
    console.log(state.playerNames[1].hasAct)
    console.log('Detta är false right? '+state.playerNames[2].hasAct)

    if (state.playerNames[0].isTurn === true) {
      if (state.halfPot > 40) {
        state.rounds ++
        state.playerNames[0].isTurn = false
      } else if (state.halfPot === 40 && state.playerNames[1].hasAct === true && state.playerNames[2].hasAct === true) {
        // Call av player1 preflop och check av player2 preflop
          state.playerNames[1].hasAct = false
          state.playerNames[2].hasAct = false
          state.rounds++
      }
    }

    state.playerNames[1].isTurn = !state.playerNames[1].isTurn
    state.playerNames[2].isTurn = !state.playerNames[2].isTurn

    console.log(state.playerNames[0].isTurn)
    if(state.playerNames[0].isTurn === true && state.rounds === 2){
      console.log('Körs detta??')
      state.playerNames[0].isTurn === false
      this.commit('drawFlop')
      // this.nextPlayersTurn()
    }else if (state.playerNames[0].isTurn === true && state.rounds < 5){
      state.playerNames[0].isTurn === false
      this.commit('drawTurnAndRiver')
      // this.nextPlayersTurn()
    }else if (state.playerNames[0].isTurn === true && state.rounds === 5){
      state.playerNames[0].isTurn === false
      this.commit('drawTurnAndRiver')
      console.log('Count your points!!! :D i am toooooo tired')
    }
  },
  payBlinds(state) {
    if (state.player1.isFirstPlayer === true) {
      // Dra av small blind från player1 money
      console.log('Player 1 betalar SB')
      state.pot += 20
      state.player1.activePot += 20
    } else {
      console.log('Player1 betalar BB')
      // Dra av big blind från player1 money
      state.pot += 40
      state.player1.activePot += 40
    }
    if (state.player2.isFirstPlayer === true) {
      // Dra av small blind från player2 money
      console.log('Player2 betalar SB')
      state.pot += 20
      state.player2.activePot += 20
    } else {
      // Dra av big blind från player2 money
      console.log('Player2 betalar BB')
      state.pot += 40
      state.player2.activePot += 40
    }
  },
  setPlayerInfo(state, money) {
    // Sätter money till player via action metoden fetchPlayer
    state.player1.money = money
  },
  bet(state) {
    state.pot = Number(state.pot) + Number(state.value)

    fetch('http://localhost:8080/api/'+state.currentPlayer , {
      body: JSON.stringify({
        "money": 500
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
      .then(response => response.text())
      .then(result => {
        state.players = result
        console.log(result)
      })

  },
  dealCardsToPlayer(state) {
    console.log('dealCardsToPlayer metod')
    let playerOne2Cards = false
    let playerTwoCards = false
    //Lägger till 2 kort till varje spelare, ska igentligen ge ett till p1 sen ett till p2 sen ett till p1 sen ett till p2. Ej två till p1 sen två till p2
    while (playerOne2Cards == false && playerTwoCards == false) {
      if (state.player1.cards.length < 2) {
        state.player1.cards.push(state.deck[0])
        state.deck.splice(0, 1)
      } else if (state.player2.cards.length < 2) {
        state.player2.cards.push(state.deck[0])
        state.deck.splice(0, 1)
      } else {
        playerOne2Cards = true
        playerTwoCards = true
      }
    }
  },
  drawTurnAndRiver(state) {
    console.log('drawTurnAndRiver metod')
    // Lägger till turn och river till cardsOnTable
    // Om cardsOnTable.length är 3 så ska id vara tablecard3 annars tablecard4
    if (state.cardsOnTable.length === 3) {
      state.deck.splice(0, 1)
      let card = {
        suit: state.deck[0].suit,
        value: state.deck[0].value,
        imageUrl: state.deck[0].imageUrl,
        id: "tablecard3"
      }
      state.cardsOnTable.push(card)
      state.deck.splice(0, 1)
    } else if (state.cardsOnTable.length === 4) {
      state.deck.splice(0, 1)
      let card = {
        suit: state.deck[0].suit,
        value: state.deck[0].value,
        imageUrl: state.deck[0].imageUrl,
        id: "tablecard4"
      }
      state.cardsOnTable.push(card)
      state.deck.splice(0, 1)
    }
  },
  drawFlop(state) {
    console.log('drawFlop metod')
    // Tar bort översta kortet innan man delar ut flop
    state.deck.splice(0, 1)
    for (var i = 0; i < 3; i++) {
      state.deck[i].id = 'tablecard' + i
      state.cardsOnTable.push(state.deck[i])
    }
    state.deck.splice(0, 3)
    // this.commit('drawTurnAndRiver')
  },
  createDeck(state) {
    console.log('createDeck metod')
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
  actions,
  mutations,
  state
})

new Vue({
  el: '#app',
  created() {
    this.$store.state.playerNames.push(this.$store.state.player1)
    this.$store.state.playerNames.push(this.$store.state.player2)
    this.$store.commit('createDeck')
    //this.$store.commit('drawFlop')
    //this.$store.commit('dealCardsToPlayer')
  },
  store: store,
  router: Router,
  render: h => h(App)
})

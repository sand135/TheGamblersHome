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
  playerNames: [{
    cards: [],
    money: null,
    name: "dealer",
    isTurn: false
  }],
  player1: {
    cards: [],
    money: 0,
    startMoney: 0,
    name: '',
    isTurn: false,
    isFirstPlayer: true,
    hasAct: false,
    activePot: 0,
    isWinner: false
  },
  player2: {
    cards: [],
    money: 1000,
    startMoney: 1000,
    name: 'Daniel Negreanu',
    isTurn: false,
    isFirstPlayer: false,
    hasAct: false,
    activePot: 0,
    isWinner: false
  },
  pot: 0,
  rounds: 0,
  currentBet: null,
  value: 0,
  authenticated: false,
  currentPlayer: null,
  halfPot: 0,
  sum: 0
}

const actions = {
  // Är en async metod som anropas från signin komponenten
  // Denna kanske kan tas bort och använda sig utav fetchCurrentPlayer ist. Sätta currentPlayer i sign in bara.
  fetchPlayer(context) {
    if (state.authenticated === true) {
      fetch('http://localhost:8080/api/users/' + state.player1.name)
        .then(response => response.json())
        .then(result => {
          context.commit('setPlayerInfo', result.money)
        })
    }
  },
  dealCardsToPlayer(context) {
    console.log('dealCardsToPlayer metod')
    // let playerOne2Cards = false
    // let playerTwoCards = false
    //Lägger till 2 kort till varje spelare, ska igentligen ge ett till p1 sen ett till p2 sen ett till p1 sen ett till p2. Ej två till p1 sen två till p2

    fetch('http://localhost:8080/api/cards/playerCards')
    .then(response => response.json())
    .then(result =>{
      console.log(result)
      for (var i = 0; i < result.length; i++) {
        if(i % 2 == 0){
          state.player1.cards.push(result[i])
        } else{
          state.player2.cards.push(result[i])
        }
      }
      console.log(state.player1.cards, state.player2.cards)
      context.commit('nextPlayersTurn', false)
    })
  },
  fetchCurrentPlayer(context) {
    if (state.authenticated === true) {
      fetch('http://localhost:8080/api/users/' + state.currentPlayer.name)
        .then(response => response.json())
        .then(result => {
          context.commit('updateMoneyToUser', result.money)
        })
    }
  },
  fetchWinner(context) {
    if (state.authenticated === true) {
      fetch('http://localhost:8080/api/users/' + state.currentPlayer.name)
        .then(response => response.json())
        .then(result => {
          context.commit('updateMoneyToWinner', result.money)
        })
    }
  },
  fetchLoser(context) {
    if (state.authenticated === true) {
      fetch('http://localhost:8080/api/users/' + state.currentPlayer.name)
        .then(response => response.json())
        .then(result => {
          context.commit('updateMoneyToLoser', result.money)
        })
    }
  },
  betMoney(context) {
    state.sum = 0
    if (state.player1.isTurn === true) {
      state.player1.activePot += Number(state.value)
      state.currentPlayer = state.player1
      console.log('Player1 isTurn är true i betMoney')
    } else {
      state.player2.activePot += Number(state.value)
      console.log('Player2 isTurn är true i betMoney')
      state.currentPlayer = state.player2
    }
    state.pot = state.player1.activePot + state.player2.activePot
    state.sum = state.currentPlayer.startMoney - state.currentPlayer.activePot

    fetch('http://localhost:8080/api/users/' + state.currentPlayer.name, {
        body: JSON.stringify({
          "money": state.sum
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      .then(response => response.text())
      .then(result => {
        console.log(result)
        this.dispatch('fetchCurrentPlayer')
      })
  },
  giveMoneyToWinner(context) {
    state.sum = 0
    if (state.player1.isWinner === true) {
      //Player1 vann rundan
      state.sum = state.player1.startMoney + state.pot
      state.currentPlayer = state.player1
      console.log('Loggar vinnaren 1 vilket borde vara Jonte ' + state.currentPlayer.name)
      state.player1.startMoney = state.sum
    } else {
      //Player2 vann rundan
      state.sum = state.player2.startMoney + state.pot
      console.log('Loggar vinnare 2 vilket borde vara danne ' + state.currentPlayer.name)
      state.currentPlayer = state.player2
      state.player2.startMoney = state.sum
    }
    state.player1.isWinner = false
    state.player2.isWinner = false
    fetch('http://localhost:8080/api/users/' + state.currentPlayer.name, {
        body: JSON.stringify({
          "money": state.sum
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      .then(response => response.text())
      .then(result => {
        console.log(result)
        this.dispatch('fetchWinner')
      })
  },
  giveMoneyToLoser(context) {
    state.sum = 0
    if (state.player1.isWinner === true) {
      //Player2 förlora rundan
      state.sum = state.player2.startMoney - state.player2.activePot
      state.currentPlayer = state.player2
      console.log('Loggar förlorare 2 vilket borde vara Danne ' + state.currentPlayer.name)
      state.player2.startMoney = state.sum
    } else {
      //Player1 förlora rundan
      state.sum = state.player1.startMoney - state.player1.activePot
      console.log('Loggar förlorare 1 vilket borde vara Jonte ' + state.currentPlayer.name)
      state.currentPlayer = state.player1
      state.player1.startMoney = state.sum
    }
    state.player1.isWinner = false
    state.player2.isWinner = false
    fetch('http://localhost:8080/api/users/' + state.currentPlayer.name, {
        body: JSON.stringify({
          "money": state.sum
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      .then(response => response.text())
      .then(result => {
        console.log(result)
        this.dispatch('fetchLoser')
      })
  },
  drawFlop(context) {
    //Hämtar tre kort från backend och sätter id + skickar dem till metoden som sätter ut dem på bordet.
    fetch('http://localhost:8080/api/cards/drawflop')
    .then(response=>response.json())
    .then(result =>{
      context.commit('setFlopOnTable', result)
    })
  },
  fetchCardsForPlayers(context){
    //Hämtar fyra nya kort från backend
    fetch('http://localhost:8080/api/cards/playerCards')
    .then(response => response.json())
    .then(result =>{
      context.commit('dealCardsToPlayer', result)
    })
  },
  createNewDeckInBackend(){
    //skapar en ny blandad kortlek i backend
    fetch('http://localhost:8080/api/cards')
    .then(response => response.json())
    .then(result =>{
      console.log(result)
    })

  },
  fetchTurnOrRiver(context){
    fetch('http://localhost:8080/api/cards/drawTurnAndRiver')
    .then(response => response.json())
    .then(result =>{
      if(result.suit !== ''){
        context.commit('setTurnOrRiverOnTable', result)
      }
    })
  }
}

const mutations = {
  raise(state) {
    console.log('raisebutton clicked')
    this.dispatch('betMoney')
    this.commit('checkForActions')
  },
  check(state) {
    console.log('Check button clicked')
    state.value = 0
    if (state.player1.isTurn === true) {
      state.player1.hasAct = true
      state.playerNames[0].isTurn = true
    } else {
      state.player2.hasAct = true
      state.playerNames[0].isTurn = true
    }
    this.commit('nextPlayersTurn')
  },
  call(state) {
    console.log('Call button clicked')
    let p1ActiveMoney = state.player1.activePot
    let p2ActiveMoney = state.player2.activePot
    if (p1ActiveMoney > p2ActiveMoney) {
      //Player 1 har raisat innan och player2 callar.
      let sum = p1ActiveMoney - p2ActiveMoney
      state.value = sum
      state.playerNames[0].isTurn = true
      state.player2.hasAct = true
    } else {
      //Player2 har raisat innan och player1 callar.
      let sum = p2ActiveMoney - p1ActiveMoney
      state.value = sum
      state.playerNames[0].isTurn = true
      state.player1.hasAct = true
    }
    this.dispatch('betMoney')
    this.commit('nextPlayersTurn')
  },
  fold(state) {
    console.log('Fold button clicked')
    if (state.player1.isTurn === true) {
      state.player2.isWinner = true
      this.dispatch('giveMoneyToWinner')
      this.dispatch('giveMoneyToLoser')
    } else {
      state.player1.isWinner = true
      this.dispatch('giveMoneyToWinner')
      this.dispatch('giveMoneyToLoser')
    }
    //
  },
  checkForActions(state) {
    console.log('checkForActions metod')
    // Jämför player isTurns aktiva pot ifall den är mer än av isTurns === false är. Då ska nextPlayersTurn anropas och byta spelare
    let p1ActiveMoney = state.player1.activePot
    let p2ActiveMoney = state.player2.activePot
    if (state.player1.isTurn === true) {
      if (p1ActiveMoney > p2ActiveMoney) {
        //Player1 har raisat sätt isTurn till player2 och hasAct till true på player1
        state.playerNames[1].isTurn = !state.playerNames[1].isTurn
        state.playerNames[2].isTurn = !state.playerNames[2].isTurn
        state.player1.hasAct = true
      }
    } else {
      //Player2 isTurn === true
      if (p2ActiveMoney > p1ActiveMoney) {
        //Player2 har raisat sätt isTurn till player1 och hasAct till true på player2
        state.playerNames[1].isTurn = !state.playerNames[1].isTurn
        state.playerNames[2].isTurn = !state.playerNames[2].isTurn
        state.player2.hasAct = true
      }
    }
  },
  // testBet(state) {
  //   if (state.playerNames[1].isTurn === true) {
  //     state.playerNames[1].activePot += Number(state.value)
  //     console.log('Player1 isTurn är true i bet')
  //   } else {
  //     state.playerNames[2].activePot += Number(state.value)
  //     console.log('Player2 isTurn är true i bet')
  //   }
  //   state.pot = state.playerNames[1].activePot + state.playerNames[2].activePot
  // },
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
    if (state.player1.hasAct === true && state.player2.hasAct === true) {
      // Här har båda agerat och nästa runda ska dras om de inte har raisat dvs!
      // Ska ha hand om call och check.
      console.log('Båda spelarna har agerat och är i nextPlayersTurn metoden')
      state.rounds++
      //Kollar vem som ska börja varje ny omgång efter man raisat osv.
      for (var i = 1; i < state.playerNames.length; i++) {
        if (state.playerNames[i].isFirstPlayer === true) {
          state.playerNames[i].isTurn = false
        } else {
          state.playerNames[i].isTurn = true
        }
      }
    }
    state.playerNames[1].isTurn = !state.playerNames[1].isTurn
    state.playerNames[2].isTurn = !state.playerNames[2].isTurn

    if (state.playerNames[0].isTurn === true && state.rounds === 1 && state.player1.hasAct === true && state.player2.hasAct === true) {
      state.playerNames[0].isTurn === false
      state.player1.hasAct = false
      state.player2.hasAct = false
      this.dispatch('drawFlop')
    } else if (state.playerNames[0].isTurn === true && state.rounds === 2 && state.player1.hasAct === true && state.player2.hasAct === true) {
      state.playerNames[0].isTurn === false
      state.player1.hasAct = false
      state.player2.hasAct = false
      this.dispatch('fetchTurnOrRiver')
    } else if (state.playerNames[0].isTurn === true && state.rounds === 3 && state.player1.hasAct === true && state.player2.hasAct === true) {
      state.playerNames[0].isTurn === false
      state.player1.hasAct = false
      state.player2.hasAct = false
      this.dispatch('fetchTurnOrRiver')
    } else if (state.playerNames[0].isTurn === true && state.rounds === 4 && state.player1.hasAct === true && state.player2.hasAct === true) {
      // TODO: Kör ny runda, resetta alla värden och arrayer som krävs för ny runda
      console.log('WHEOOOOO WINNER WINNER CHICKEN DINNER')
      state.player1.isWinner = true

      this.dispatch('giveMoneyToWinner')
      this.dispatch('giveMoneyToLoser')

      console.log('Loggar spelare 1 money ' + state.player1.money)
      console.log('Loggar spelare 1 startMoney ' + state.player1.startMoney)

      console.log('Loggar spelare 2 money ' + state.player2.money)
      console.log('Loggar spelare 2 startmoney ' + state.player2.startMoney)


    }
  },
  resetAllValuesForNewGame(state){
    state.player1.isWinner = false
    state.player2.isWinner = false
    this.dispatch('createNewDeckInBackend')
    state.player1.cards = []
    state.player2.cards =[]
    console.log('Inga kort i array' + state.player1.cards.length)
  },
  // TODO: Lägga till SB och BB i databasen. Ifall BB bara kan checka hela vägen så uppdateras inte hans money förens i slutet när man kör giveMoneyToLoser
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
    state.player1.startMoney = money
  },
  updateMoneyToWinner(state, money) {
    if (state.player1.isWinner === true) {
      //Spelare1 har vunnit
      state.player1.money = money
      state.player1.startMoney = money
    } else if (state.player2.isWinner === true) {
      //Spelare2 har vunnit
      state.player2.money = money
      state.player2.money = money
    }
  },
  updateMoneyToLoser(state, money) {
    if (state.player1.isWinner === true) {
      //Spelare2 har förlorat
      state.player2.money = money
      state.player2.startMoney = money
    } else if (state.player2.isWinner === true) {
      //Spelare1 har förlorat
      state.player1.money = money
      state.player1.startMoney = money
    }
  },
  updateMoneyToUser(state, money) {
    if (state.player1.name === state.currentPlayer.name) {
      //Spelare1 ska uppdatera money
      state.player1.money = money
    } else {
      //Spelare2 ska uppdatera money
      state.player2.money = money
    }
  },

  dealCardsToPlayer(state, cards) {
    console.log('dealCardsToPlayer metod')
    //Lägger till 2 kort till varje spelare
      console.log(cards)
      for (var i = 0; i < cards.length; i++) {
        if(i % 2 == 0){
          state.player1.cards.push(cards[i])
        } else{
          state.player2.cards.push(cards[i])
        }
      }
      console.log(state.player1.cards, state.player2.cards)
      this.commit('nextPlayersTurn')
  },
  //TODO Flytta till backend!
  setTurnOrRiverOnTable(state, card) {
    console.log('drawTurnAndRiver metod')
    // Lägger till turn och river till cardsOnTable efter att det hämtats ett kort från backend.
      state.cardsOnTable.push(card)
    // // Om cardsOnTable.length är 3 så ska id vara tablecard3 annars tablecard4
    // if (state.cardsOnTable.length === 3) {
    //   state.deck.splice(0, 1)
    //   let card = {
    //     suit: state.deck[0].suit,
    //     value: state.deck[0].value,
    //     imageUrl: state.deck[0].imageUrl,
    //     id: "tablecard3"
    //   }
    //   state.cardsOnTable.push(card)
    //   state.deck.splice(0, 1)
    // } else if (state.cardsOnTable.length === 4) {
    //   state.deck.splice(0, 1)
    //   let card = {
    //     suit: state.deck[0].suit,
    //     value: state.deck[0].value,
    //     imageUrl: state.deck[0].imageUrl,
    //     id: "tablecard4"
    //   }
    //
    //   state.deck.splice(0, 1)
    // }
  },
  setFlopOnTable(state, result) {
      for (var i = 0; i < result.length; i++) {
        state.cardsOnTable.push(result[i])
      }
  },

//   addCardsToDb(){
//     for (var i = 0; i < state.deck.length; i++) {
//       fetch('http://localhost:8080/api/cards', {
//         body: '{"value":"'+ state.deck[i].value+'", "suit":"'+state.deck[i].suit+'", "imageUrl":"'+state.deck[i].imageUrl+'","id":"'+state.deck[i].id+'"}',
//         headers: {
//           'Content-Type':'application/json'
//         },
//         method: 'POST'
//       }).then(response => {
//         console.log(response)
//       }).catch(e => console.log(e))
//   }
// },
  createDeck(state) {
    console.log('createDeck metod')
    this.dispatch('createNewDeckInBackend')
  },
  // createDeck(state) {
  //     console.log('createDeck metod')
  //     const arr = []
  //     const suits = ['♥', '♠', '♦', '♣']
  //     const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  //     for (var i = 0; i < suits.length; i++) {
  //       for (var n = 0; n < values.length; n++) {
  //         arr.push({
  //           suit: suits[i],
  //           value: values[n],
  //           imageUrl: '',
  //           id: ''
  //         })
  //       }
  //     }
  //     state.deck = arr
  //
  //     // for (let i = state.deck.length - 1; i > 0; i--) {
  //     //   let j = Math.floor(Math.random() * (i + 1));
  //     //   [state.deck[i], state.deck[j]] = [state.deck[j], state.deck[i]]
  //     // }
  //     this.commit('addCardsToTable')
  //
  //     this.commit('addCardsToDb')
  //
  //
  //
  //   },
  // addCardsToTable(state) {
  //   for (var index in state.deck) {
  //     switch (state.deck[index].value) {
  //       case 1:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/ace_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/ace_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/ace_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/ace_of_clubs.png'
  //         }
  //         break
  //       case 2:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/2_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/2_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/2_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/2_of_clubs.png'
  //         }
  //         break
  //       case 3:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/3_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/3_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/3_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/3_of_clubs.png'
  //         }
  //         break
  //       case 4:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/4_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/4_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/4_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/4_of_clubs.png'
  //         }
  //         break
  //       case 5:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/5_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/5_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/5_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/5_of_clubs.png'
  //         }
  //         break
  //       case 6:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/6_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/6_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/6_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/6_of_clubs.png'
  //         }
  //         break
  //       case 7:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/7_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/7_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/7_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/7_of_clubs.png'
  //         }
  //         break
  //       case 8:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/8_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/8_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/8_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/8_of_clubs.png'
  //         }
  //         break
  //       case 9:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/9_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/9_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/9_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/9_of_clubs.png'
  //         }
  //         break
  //       case 10:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/10_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/10_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/10_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/10_of_clubs.png'
  //         }
  //         break
  //       case 11:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/jack_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/jack_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/jack_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/jack_of_clubs.png'
  //         }
  //         break
  //       case 12:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/queen_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/queen_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/queen_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/queen_of_clubs.png'
  //         }
  //         break
  //       case 13:
  //         if (state.deck[index].suit === '♥') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/king_of_hearts.png'
  //         } else if (state.deck[index].suit === '♠') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/king_of_spades.png'
  //         } else if (state.deck[index].suit === '♦') {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/king_of_diamonds.png'
  //         } else {
  //           state.deck[index].imageUrl = 'Images/Playing_cards/king_of_clubs.png'
  //         }
  //         break
  //     }
  //   }
  //}

  // raise(){
  //   state.players[state.counter].isTurn = false
  //   //console.log('raisebutton clicked')
  //   state.players[state.counter].didRaise = true
  //   this.commit('nextPlayersTurn', false)
  // },
  // call(){
  //   state.players[state.counter].isTurn = false
  //   //console.log('callbutton clicked')
  //   state.players[state.counter].didRaise = false
  //
  //   //kollar om det är första gången som första spelaren calls
  //   if (state.players[state.counter].isFirstPlayer === true && state.players[state.counter].didCall === true){
  //     console.log("player1 did call second time")
  //     this.commit('nextPlayersTurn', false)
  //   }else if(state.players[state.counter].isFirstPlayer ===   true && state.players[state.counter + 1 ].didRaise === true){
  //
  //     //console.log("player 2 did raise, player1 called")
  //     this.commit('nextPlayersTurn', false)
  //
  //   }else if (state.players[state.counter].isFirstPlayer ===   true && state.players[state.counter].didCall === false){
  //     //console.log("player1 called first round")
  //     state.players[state.counter].didCall = true
  //     this.commit('nextPlayersTurn', false)
  //   }else{
  //     this.commit('nextPlayersTurn', false)
  //   }
  //
  // },
  // setValuesForNewRound(){
  //   console.log("sets values for new round!")
  //   for (var i = 0; i < this.$store.state.players.length; i++ ){
  //     state.players[i].didCall = false
  //     state.players[i].didRaise = false
  //     console.log(state.players[i].didCall)
  //   }
  //
  // },
  // dealerDealsCard(){
  //   if(state.rounds === 2){
  //     this.commit('drawFlop')
  //     this.commit('nextPlayersTurn')
  //   }else if (state.rounds < 4){
  //     //this.commit('drawTurnAndRiver')
  //     this.commit('nextPlayersTurn')
  //   }else if ( state.rounds === 4){
  //     //this.commit('drawTurnAndRiver')
  //     console.log('Count your points!!! :D i am toooooo tired')
  //   }
  // },
  // goback(){
  //   state.counter--
  // },
  // goNext(newRound){
  //   if(newRound){
  //     state.counter += 2
  //   }
  //   if (state.counter >= state.players.length -1){
  //     state.counter = 0
  //     state.rounds ++
  //   }else{
  //     state.counter ++
  //   }
  //   console.log("countern är nu efter goNext:" + state.counter)
  // },
  // nextPlayersTurn(newRound) {
  //
  //   if(state.players[state.counter].didRaise === true && state.players[state.counter].isFirstPlayer === false){
  //     this.commit('goback')
  //   }else{
  //     console.log("moves on with newRound" + newRound)
  //     this.commit('goNext', newRound)
  //   }
  //
  //
  // state.players[state.counter].isTurn = true
  //
  //   if(state.players[state.counter].name){
  //     this.commit('dealerDealsCard')
  //   }
  // }
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
    //this.$store.commit('addCardsToDb')
     this.$store.commit('createDeck')
    //this.$store.commit('drawFlop')
    //this.$store.commit('dealCardsToPlayer')

  },
  store: store,
  router: Router,
  render: h => h(App)
})

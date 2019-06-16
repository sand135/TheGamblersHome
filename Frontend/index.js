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
  players:[{cards:[], money:null, name:"dealer", isTurn: false, didRaise:false, didAllIn: false}],

  player1: {cards: [], money: 0, name: '', isTurn: false, didRaise:false, didAllIn: false, isFirstPlayer: true, didCall:false},
  player2: {cards: [], money: 0, name: 'Daniel Negreanu', isTurn: false, didRaise: false, didAllin:false, isFirstPlayer: false, didCall:false},
  pot: 100,

  currentBet: null,
  value: 50,
  authenticated: false,
  currentPlayer: null,
  counter: 0,
  rounds: 1

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
  }
}

const mutations = {
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
    //Lägger till 2 kort till varje spelare
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
    })

  },
  //TODO Flytta till backend!
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
    //Hämtar tre kort från backend och sätter id + delar ut dem på bordet
    fetch('http://localhost:8080/api/cards/drawflop')
    .then(response=>response.json())
    .then(result =>{
      for (var i = 0; i < result.length; i++) {
        state.cardsOnTable.push(result[i])
      }
    })
  },
  getUnusedCardsFromDb(){
    fetch('http://localhost:8080/api/cards')
    .then(response => response.text)
    .then(result => {
      console.log(result)
      })
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
    this.commit('getUnusedCardsFromDb')
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
     this.$store.state.players.push(this.$store.state.player1)
     this.$store.state.players.push(this.$store.state.player2)
    //this.$store.commit('addCardsToDb')
     this.$store.commit('createDeck')
    //this.$store.commit('drawFlop')
    //this.$store.commit('dealCardsToPlayer')

  },
  store: store,
  router: Router,
  render: h => h(App)
})

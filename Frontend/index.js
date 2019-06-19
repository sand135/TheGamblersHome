import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Router from './router.js'
var Hand = require('pokersolver').Hand

Vue.use(Vuex)
Vue.use(Router)

Vue.config.devtools = true

const state = {
  deck: null,
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
    isWinner: false,
    isBigBlind: false
  },
  player2: {
    cards: [],
    money: 0,
    startMoney: 0,
    name: 'Daniel Negreanu',
    isTurn: false,
    isFirstPlayer: false,
    hasAct: false,
    activePot: 0,
    isWinner: false,
    isBigBlind: false
  },
  pot: 0,
  rounds: 0,
  currentBet: null,
  value: 0,
  authenticated: false,
  currentPlayer: null
}

const actions = {
  // Är en async metod som anropas från signin komponenten
  // Denna kanske kan tas bort och använda sig utav fetchCurrentPlayer ist. Sätta currentPlayer i sign in bara.
  fetchPlayer(context) {
    if (state.authenticated === true) {
      fetch('http://localhost:8080/api/users/' + state.player1.name)
        .then(response => response.json())
        .then(result => {
          state.currentPlayer = state.player1
          context.commit('setPlayerInfo', result.money)
        })
    }
  },
  fetchPlayer2(context) {
    fetch('http://localhost:8080/api/users/' + 'Daniel Negreanu')
      .then(response => response.json())
      .then(result => {
        state.currentPlayer = state.player2
        context.commit('setPlayerInfo', result.money)
      })
  },
  fetchCurrentPlayer(context) {
    if (state.authenticated === true) {
      return fetch('http://localhost:8080/api/users/' + state.currentPlayer.name)
        .then(response => response.json())
        .then(result => {
          return context.commit('updateMoneyToUser', result.money)
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
  addBlindsToDB() {
    let sum = 0
    sum = state.currentPlayer.startMoney - state.currentPlayer.activePot

    return fetch('http://localhost:8080/api/users/' + state.currentPlayer.name, {
        body: JSON.stringify({
          "money": sum
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      .then(response => response.text())
      .then(result => {
        console.log(result)
        console.log('Loggar currentPlayer i addBlindsToDB ' + state.currentPlayer.name)
        return this.dispatch('fetchCurrentPlayer')
      })
  },
  betMoney() {
    let sum = 0
    if (state.player1.isTurn === true) {
      state.player1.activePot += Number(state.value)
      state.currentPlayer = state.player1
      state.player1.money = state.player1.startMoney - state.player1.activePot
      console.log('Player1 isTurn är true i betMoney ' + state.player1.activePot)
    } else {
      state.player2.activePot += Number(state.value)
      console.log('Player2 isTurn är true i betMoney ' + state.player2.activePot)
      state.currentPlayer = state.player2
      state.player2.money = state.player2.startMoney - state.player2.activePot
    }
    state.pot = state.player1.activePot + state.player2.activePot
    sum = state.currentPlayer.startMoney - state.currentPlayer.activePot

    return fetch('http://localhost:8080/api/users/' + state.currentPlayer.name, {
        body: JSON.stringify({
          "money": sum
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      .then(response => response.text())
      .then(result => {
        console.log(result)
        return this.dispatch('fetchCurrentPlayer')
      })
  },
  giveMoneyToWinner(context) {
    let sum = 0
    if (state.player1.isWinner === true) {
      //Player1 vann rundan
      sum = state.player1.money + state.pot
      state.currentPlayer = state.player1
      console.log('Loggar vinnaren 1 vilket borde vara Jonte ' + state.currentPlayer.name)
      state.player1.startMoney = sum
      console.log('Loggar summan för vinnare Jonte ' + sum)
    } else {
      //Player2 vann rundan
      sum = state.player2.money + state.pot
      console.log('Loggar vinnare 2 vilket borde vara danne ' + state.currentPlayer.name)
      state.currentPlayer = state.player2
      state.player2.startMoney = sum
      console.log('Loggar summan för vinnare Danne ' + sum)
    }
    fetch('http://localhost:8080/api/users/' + state.currentPlayer.name, {
        body: JSON.stringify({
          "money": sum
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      .then(response => response.text())
      .then(result => {
        console.log(result)
        context.commit('updateMoneyToWinner', sum)
      })
  },
  giveMoneyToLoser(context) {
    let sum = 0
    if (state.player1.isWinner === true) {
      //Player2 förlora rundan
      console.log('Loggar startMoney i spelare2 ' + state.player2.startMoney)
      console.log('Loggar spelare2 money ' + state.player2.money)
      sum = state.player2.money
      state.currentPlayer = state.player2
      console.log('Loggar förlorare 2 vilket borde vara Danne ' + state.currentPlayer.name)
      state.player2.startMoney = sum
      console.log('Loggar sum i förlorare danne ' + sum)
    } else {
      //Player1 förlora rundan
      sum = state.player1.money
      state.currentPlayer = state.player1
      console.log('Loggar förlorare 1 vilket borde vara Jonte ' + state.currentPlayer.name)
      state.player1.startMoney = sum
      console.log('Loggar sum i förlorare Jonte ' + sum)
    }
    fetch('http://localhost:8080/api/users/' + state.currentPlayer.name, {
        body: JSON.stringify({
          "money": sum
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      .then(response => response.text())
      .then(result => {
        console.log(result)
        context.commit('updateMoneyToLoser', sum)
      })
  },
  drawFlop(context) {
    //Hämtar tre kort från backend och sätter id + skickar dem till metoden som sätter ut dem på bordet.
    fetch('http://localhost:8080/api/cards/drawflop')
      .then(response => response.json())
      .then(result => {
        context.commit('setFlopOnTable', result)
      })
  },
  fetchCardsForPlayers(context) {
    //Hämtar fyra nya kort från backend
    fetch('http://localhost:8080/api/cards/playerCards')
      .then(response => response.json())
      .then(result => {
        context.commit('dealCardsToPlayer', result)
      })
  },
  createNewDeckInBackend(context, secondRound) {
    if (secondRound) {
      fetch('http://localhost:8080/api/cards')
        .then(response => response.json())
        .then(result => {
          console.log(result)
          this.commit('payBlinds')
          this.dispatch('fetchCardsForPlayers')
        })
    } else {
      //skapar en ny blandad kortlek i backend
      fetch('http://localhost:8080/api/cards')
        .then(response => response.json())
        .then(result => {
          console.log(result)
        })
    }
  },
  fetchTurnOrRiver(context) {
    console.log('Loggas detta i fetchTurnOrRiver???')
    fetch('http://localhost:8080/api/cards/drawTurnAndRiver')
      .then(response => response.json())
      .then(result => {
        console.log('Detta loggas')
        if (result.suit !== '') {
          console.log('Detta loggas inte')
          context.commit('setTurnOrRiverOnTable', result)
        }
      })
  },
  loanMoney() {
    store.dispatch('fetchPlayer')

    if (state.player1.isTurn) {
      fetch('http://localhost:8080/api/bank/' + state.player1.name)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          state.player1.money += 500
        })
    } else {
      fetch('http://localhost:8080/api/bank/' + state.player2.name)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          state.player2.money += 500
        })
    }
  }
}

const mutations = {
  raise() {
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
    this.dispatch('betMoney').then(() => {
      this.commit('nextPlayersTurn')
    })
  },
  fold(state) {
    console.log('Fold button clicked')
    if (state.player1.isTurn === true) {
      state.player2.isWinner = true
      console.log('Loggar vinnare efter fold, spelare2 ' + state.player2.name)
      this.dispatch('giveMoneyToWinner')
      this.dispatch('giveMoneyToLoser')
    } else {
      state.player1.isWinner = true
      console.log('Loggar vinnare efter fold, spelare1 ' + state.player1.name)
      this.dispatch('giveMoneyToWinner')
      this.dispatch('giveMoneyToLoser')
    }
    // Kör metod för att köra ny runda, byt isFirstPlayer på båda spelarna isWinner och allt möjligt.
    this.commit('playNextRound')
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
  playNextRound(state) {
    state.cardsOnTable = []
    state.player1.cards = []
    state.player2.cards = []
    state.pot = 0
    state.rounds = 0
    state.player1.activePot = 0
    state.player2.activePot = 0
    state.player1.isFirstPlayer = !state.player1.isFirstPlayer
    state.player2.isFirstPlayer = !state.player2.isFirstPlayer
    state.player1.hasAct = false
    state.player2.hasAct = false
    state.player1.money = state.player1.startMoney
    state.player2.money = state.player2.startMoney
    state.player1.isWinner = false
    state.player2.isWinner = false
    this.dispatch('createNewDeckInBackend', true)
  },
  nextPlayersTurn(state) {
    // Första valet innan flop osv...
    if (state.player1.isFirstPlayer === true && state.player1.activePot === 20 && state.cardsOnTable < 2) {
      console.log('Player1 är firstplayer och börjar agera')
      state.player1.isTurn = false
      state.player2.isTurn = true
    } else if (state.player2.isFirstPlayer === true && state.player2.activePot === 20 && state.cardsOnTable < 2) {
      console.log('Player2 är firstplayer och börjar agera')
      state.player2.isTurn = false
      state.player1.isTurn = true
    }
    if (state.player1.hasAct === true && state.player2.hasAct === true) {
      // Här har båda agerat och nästa runda ska dras om de inte har raisat dvs!
      // Ska ha hand om call och check.
      console.log('Båda spelarna har agerat och är i nextPlayersTurn metoden')
      console.log('Loggar dealer isTurn ' + state.playerNames[0].isTurn)
      state.rounds++
      console.log('Loggar rounds ' + state.rounds)
      console.log('Loggar player1 hasAct ' + state.player1.hasAct)
      console.log('Loggar player2 hasAct ' + state.player2.hasAct)
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
      console.log('WHEOOOOO WINNER WINNER CHICKEN DINNER')
      //kollar vem som vann och sätter den spelaren till winner = true
      this.commit('countPointsAndSetWinner')
      // Uppdaterar winner = true och winner = false
      this.dispatch('giveMoneyToWinner')
      this.dispatch('giveMoneyToLoser')
      //Resettar alla värden och börjar en ny runda
      this.commit('playNextRound')
    }
  },
  payBlinds(state) {
    if (state.player1.isFirstPlayer === true) {
      // Dra av small blind från player1 money
      console.log('Player 1 betalar SB')
      state.pot += 20
      state.player1.activePot += 20
      state.currentPlayer = state.player1
      this.dispatch('addBlindsToDB').then(() => {
        console.log('Nu borde player1 ha fått betala SB')
        state.currentPlayer = state.player2
        state.pot += 40
        state.player2.activePot += 40
        this.dispatch('addBlindsToDB')
      })
    } else {
      console.log('Player1 betalar BB')
      // Dra av big blind från player1 money
      state.pot += 40
      state.player1.activePot += 40
      state.player1.isBigBlind = true
      state.currentPlayer = state.player1
      this.dispatch('addBlindsToDB').then(() => {
        console.log('Nu borde player1 ha fått betala BB')
        state.currentPlayer = state.player2
        state.pot += 20
        state.player2.activePot += 20
        this.dispatch('addBlindsToDB')
      })
    }
  },
  setPlayerInfo(state, money) {
    // Sätter money till players via action metoden fetchPlayer
    if (state.currentPlayer.name === state.player1.name) {
      state.player1.money = money
      state.player1.startMoney = money
    }
    if (state.currentPlayer.name === state.player2.name) {
      state.player2.money = money
      state.player2.startMoney = money
    }
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
      if (i % 2 == 0) {
        state.player1.cards.push(cards[i])
      } else {
        state.player2.cards.push(cards[i])
      }
    }
    console.log(state.player1.cards, state.player2.cards)
    this.commit('nextPlayersTurn')
  },
  setTurnOrRiverOnTable(state, card) {
    console.log('drawTurnAndRiver metod')
    // Lägger till turn och river till cardsOnTable efter att det hämtats ett kort från backend.
    state.cardsOnTable.push(card)
  },
  setFlopOnTable(state, result) {
    for (var i = 0; i < result.length; i++) {
      state.cardsOnTable.push(result[i])
    }
  },
  countPointsAndSetWinner(state) {
    var player1Hand = state.player1.cards
    var player2Hand = state.player2.cards
    //Sätter även in korten på bordet i spelarnas "händer"
    for (var i = 0; i < state.cardsOnTable.length; i++) {
      player1Hand.push(state.cardsOnTable[i])
      player2Hand.push(state.cardsOnTable[i])
    }
    //konverterar båda spelarnas händer till rätt format för att kunna evaluera poängen.
    this.commit('convertHand', player1Hand)
    this.commit('convertHand', player2Hand)

    var finalHand1 = []
    var finalHand2 = []

    //sätter in endast kortets name
    for (var j = 0; j < player1Hand.length; j++) {
      finalHand1.push(player1Hand[j].name)
      finalHand2.push(player2Hand[j].name)
    }

    var solvedHand1 = Hand.solve(finalHand1)
    var solvedHand2 = Hand.solve(finalHand2)
    var winner = Hand.winners([solvedHand2, solvedHand1])
    console.log(solvedHand1.descr)
    console.log(solvedHand2.descr)

    var winner1Helper = 0
    var winner2Helper = 0

    //Loop som jämför winnarhanden(winner[0].cardPool) med spelarnas händer för att kolla vem av dem som har den vinnande handen.
    for (var m = 0; m < 7; m++) {
      var card = winner[0].cardPool[0].value + winner[0].cardPool[0].suit
      console.log(card)
      for (var s = 0; s < 7; s++) {
        if (card === finalHand1[s]) {
          console.log("player1 ++")
          winner1Helper++
        }
        if (card === finalHand2[s]) {
          console.log("player2 ++")
          winner2Helper++
        }
      }
      //tar bort första kortet i winnerhand-arrayen efter att man kollat om samma kort fanns i spelaranas arrayer.
      winner[0].cardPool.splice(0, 1)
    }
    //kollar vilken winnerhelper som blivit 7, d.v.s. alla kort matchade med winnerkort-arrayen, och sätter vilken spelare som vann.
    if (winner1Helper === 7) {
      alert("" + state.player1.name + " won with: " + solvedHand1.descr + ", " + state.player2.name + " had: " + solvedHand2.descr)
      state.player1.isWinner = true

    } else if (winner2Helper === 7) {
      alert("" + state.player2.name + " won with: " + solvedHand2.descr + ", " + state.player1.name + " had: " + solvedHand1.descr)
      state.player2.isWinner = true
    }
  },
  convertHand(state, cards) {
    for (var i = 0; i < cards.length; i++) {
      switch (cards[i].value) {
        case 1:
          if (cards[i].suit === '♥') {
            cards[i].name = 'Ah'
          } else if (cards[i].suit === '♠') {
            cards[i].name = 'As'
          } else if (cards[i].suit === '♦') {
            cards[i].name = 'Ad'
          } else {
            cards[i].name = 'Ac'
          }
          break
        case 2:
          if (cards[i].suit === '♥') {
            cards[i].name = '2h'
          } else if (cards[i].suit === '♠') {
            cards[i].name = '2s'
          } else if (cards[i].suit === '♦') {
            cards[i].name = '2d'
          } else {
            cards[i].name = '2c'
          }
          break
        case 3:
          if (cards[i].suit === '♥') {
            cards[i].name = '3h'
          } else if (cards[i].suit === '♠') {
            cards[i].name = '3s'
          } else if (cards[i].suit === '♦') {
            cards[i].name = '3d'
          } else {
            cards[i].name = '3c'
          }
          break
        case 4:
          if (cards[i].suit === '♥') {
            cards[i].name = '4h'
          } else if (cards[i].suit === '♠') {
            cards[i].name = '4s'
          } else if (cards[i].suit === '♦') {
            cards[i].name = '4d'
          } else {
            cards[i].name = '4c'
          }
          break
        case 5:
          if (cards[i].suit === '♥') {
            cards[i].name = '5h'
          } else if (cards[i].suit === '♠') {
            cards[i].name = '5s'
          } else if (cards[i].suit === '♦') {
            cards[i].name = '5d'
          } else {
            cards[i].name = '5c'
          }
          break
        case 6:
          if (cards[i].suit === '♥') {
            cards[i].name = '6h'
          } else if (cards[i].suit === '♠') {
            cards[i].name = '6s'
          } else if (cards[i].suit === '♦') {
            cards[i].name = '6d'
          } else {
            cards[i].name = '6c'
          }
          break
        case 7:
          if (cards[i].suit === '♥') {
            cards[i].name = '7h'
          } else if (cards[i].suit === '♠') {
            cards[i].name = '7s'
          } else if (cards[i].suit === '♦') {
            cards[i].name = '7d'
          } else {
            cards[i].name = '7c'
          }
          break
        case 8:
          if (cards[i].suit === '♥') {
            cards[i].name = '8h'
          } else if (cards[i].suit === '♠') {
            cards[i].name = '8s'
          } else if (cards[i].suit === '♦') {
            cards[i].name = '8d'
          } else {
            cards[i].name = '8c'
          }
          break
        case 9:
          if (cards[i].suit === '♥') {
            cards[i].name = '9h'
          } else if (cards[i].suit === '♠') {
            cards[i].name = '9s'
          } else if (cards[i].suit === '♦') {
            cards[i].name = '9d'
          } else {
            cards[i].name = '9c'
          }
          break
        case 10:
          if (cards[i].suit === '♥') {
            cards[i].name = 'Th'
          } else if (cards[i].suit === '♠') {
            cards[i].name = 'Ts'
          } else if (cards[i].suit === '♦') {
            cards[i].name = 'Td'
          } else {
            cards[i].name = 'Tc'
          }
          break
        case 11:
          if (cards[i].suit === '♥') {
            cards[i].name = 'Jh'
          } else if (cards[i].suit === '♠') {
            cards[i].name = 'Js'
          } else if (cards[i].suit === '♦') {
            cards[i].name = 'Jd'
          } else {
            cards[i].name = 'Jc'
          }
          break
        case 12:
          if (cards[i].suit === '♥') {
            cards[i].name = 'Qh'
          } else if (cards[i].suit === '♠') {
            cards[i].name = 'Qs'
          } else if (cards[i].suit === '♦') {
            cards[i].name = 'Qd'
          } else {
            cards[i].name = 'Qc'
          }
          break
        case 13:
          if (cards[i].suit === '♥') {
            cards[i].name = 'Kh'
          } else if (cards[i].suit === '♠') {
            cards[i].name = 'Ks'
          } else if (cards[i].suit === '♦') {
            cards[i].name = 'Kd'
          } else {
            cards[i].name = 'Kc'
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
    this.$store.dispatch('createNewDeckInBackend', false)
  },
  store: store,
  router: Router,
  render: h => h(App)
})

<template>
  <div class="outline">
   
    <div v-on:click="renderOneCard"> {{ this.card }}</div>
  </div>
</template>
<script>
  export default {
    created() {
      this.createDeck(this.deck)
    },
    data() {
      return {
        imgArray: [],
        deck: [],
        bool: true,
        card: {},
        testDeck: []
      }
    },
    methods: {
      drawFlop(cardArr) {
        for (var i = 0; i < 3; i++) {
          cardArr[i].id = 'tablecard'+i
          this.testDeck.push(cardArr[i])
        }
        console.log(cardArr[0].id);
      },
      addCardsToTable(cardArr) {
        for (var index in cardArr) {
        switch(cardArr[index].value) {
          case 'A':
            if (cardArr[index].suit === '♥') {
              cardArr[index].imageUrl = 'Images/Playing_cards/ace_of_hearts.png'
            } else if (cardArr[index].suit === '♠') {
              cardArr[index].imageUrl = 'Images/Playing_cards/ace_of_spades.png'
            } else if (cardArr[index].suit === '♦') {
              cardArr[index].imageUrl = 'Images/Playing_cards/ace_of_diamonds.png'
            } else {
              cardArr[index].imageUrl = 'Images/Playing_cards/ace_of_clubs.png'
            }
          break;
          case 2:
          if (cardArr[index].suit === '♥') {
            cardArr[index].imageUrl = 'Images/Playing_cards/2_of_hearts.png'
          } else if (cardArr[index].suit === '♠') {
            cardArr[index].imageUrl = 'Images/Playing_cards/2_of_spades.png'
          } else if (cardArr[index].suit === '♦') {
            cardArr[index].imageUrl = 'Images/Playing_cards/2_of_diamonds.png'
          } else {
            cardArr[index].imageUrl = 'Images/Playing_cards/2_of_clubs.png'
          }
          break;
          case 3:
          if (cardArr[index].suit === '♥') {
            cardArr[index].imageUrl = 'Images/Playing_cards/3_of_hearts.png'
          } else if (cardArr[index].suit === '♠') {
            cardArr[index].imageUrl = 'Images/Playing_cards/3_of_spades.png'
          } else if (cardArr[index].suit === '♦') {
            cardArr[index].imageUrl = 'Images/Playing_cards/3_of_diamonds.png'
          } else {
            cardArr[index].imageUrl = 'Images/Playing_cards/3_of_clubs.png'
          }
          break;
          case 4:
          if (cardArr[index].suit === '♥') {
            cardArr[index].imageUrl = 'Images/Playing_cards/4_of_hearts.png'
          } else if (cardArr[index].suit === '♠') {
            cardArr[index].imageUrl = 'Images/Playing_cards/4_of_spades.png'
          } else if (cardArr[index].suit === '♦') {
            cardArr[index].imageUrl = 'Images/Playing_cards/4_of_diamonds.png'
          } else {
            cardArr[index].imageUrl = 'Images/Playing_cards/4_of_clubs.png'
          }
          break;
          case 5:
          if (cardArr[index].suit === '♥') {
            cardArr[index].imageUrl = 'Images/Playing_cards/5_of_hearts.png'
          } else if (cardArr[index].suit === '♠') {
            cardArr[index].imageUrl = 'Images/Playing_cards/5_of_spades.png'
          } else if (cardArr[index].suit === '♦') {
            cardArr[index].imageUrl = 'Images/Playing_cards/5_of_diamonds.png'
          } else {
            cardArr[index].imageUrl = 'Images/Playing_cards/5_of_clubs.png'
          }
          break;
          case 6:
          if (cardArr[index].suit === '♥') {
            cardArr[index].imageUrl = 'Images/Playing_cards/6_of_hearts.png'
          } else if (cardArr[index].suit === '♠') {
            cardArr[index].imageUrl = 'Images/Playing_cards/6_of_spades.png'
          } else if (cardArr[index].suit === '♦') {
            cardArr[index].imageUrl = 'Images/Playing_cards/6_of_diamonds.png'
          } else {
            cardArr[index].imageUrl = 'Images/Playing_cards/6_of_clubs.png'
          }
          break;
          case 7:
          if (cardArr[index].suit === '♥') {
            cardArr[index].imageUrl = 'Images/Playing_cards/7_of_hearts.png'
          } else if (cardArr[index].suit === '♠') {
            cardArr[index].imageUrl = 'Images/Playing_cards/7_of_spades.png'
          } else if (cardArr[index].suit === '♦') {
            cardArr[index].imageUrl = 'Images/Playing_cards/7_of_diamonds.png'
          } else {
            cardArr[index].imageUrl = 'Images/Playing_cards/7_of_clubs.png'
          }
          break;
          case 8:
          if (cardArr[index].suit === '♥') {
            cardArr[index].imageUrl = 'Images/Playing_cards/8_of_hearts.png'
          } else if (cardArr[index].suit === '♠') {
            cardArr[index].imageUrl = 'Images/Playing_cards/8_of_spades.png'
          } else if (cardArr[index].suit === '♦') {
            cardArr[index].imageUrl = 'Images/Playing_cards/8_of_diamonds.png'
          } else {
            cardArr[index].imageUrl = 'Images/Playing_cards/8_of_clubs.png'
          }
          break;
          case 9:
          if (cardArr[index].suit === '♥') {
            cardArr[index].imageUrl = 'Images/Playing_cards/9_of_hearts.png'
          } else if (cardArr[index].suit === '♠') {
            cardArr[index].imageUrl = 'Images/Playing_cards/9_of_spades.png'
          } else if (cardArr[index].suit === '♦') {
            cardArr[index].imageUrl = 'Images/Playing_cards/9_of_diamonds.png'
          } else {
            cardArr[index].imageUrl = 'Images/Playing_cards/9_of_clubs.png'
          }
          break;
          case 10:
          if (cardArr[index].suit === '♥') {
            cardArr[index].imageUrl = 'Images/Playing_cards/10_of_hearts.png'
          } else if (cardArr[index].suit === '♠') {
            cardArr[index].imageUrl = 'Images/Playing_cards/10_of_spades.png'
          } else if (cardArr[index].suit === '♦') {
            cardArr[index].imageUrl = 'Images/Playing_cards/10_of_diamonds.png'
          } else {
            cardArr[index].imageUrl = 'Images/Playing_cards/10_of_clubs.png'
          }
          break;
          case 'J':
          if (cardArr[index].suit === '♥') {
            cardArr[index].imageUrl = 'Images/Playing_cards/jack_of_hearts.png'
          } else if (cardArr[index].suit === '♠') {
            cardArr[index].imageUrl = 'Images/Playing_cards/jack_of_spades.png'
          } else if (cardArr[index].suit === '♦') {
            cardArr[index].imageUrl = 'Images/Playing_cards/jack_of_diamonds.png'
          } else {
            cardArr[index].imageUrl = 'Images/Playing_cards/jack_of_clubs.png'
          }
          break;
          case 'Q':
          if (cardArr[index].suit === '♥') {
            cardArr[index].imageUrl = 'Images/Playing_cards/queen_of_hearts.png'
          } else if (cardArr[index].suit === '♠') {
            cardArr[index].imageUrl = 'Images/Playing_cards/queen_of_spades.png'
          } else if (cardArr[index].suit === '♦') {
            cardArr[index].imageUrl = 'Images/Playing_cards/queen_of_diamonds.png'
          } else {
            cardArr[index].imageUrl = 'Images/Playing_cards/queen_of_clubs.png'
          }
          break;
          case 'K':
          if (cardArr[index].suit === '♥') {
            cardArr[index].imageUrl = 'Images/Playing_cards/king_of_hearts.png'
          } else if (cardArr[index].suit === '♠') {
            cardArr[index].imageUrl = 'Images/Playing_cards/king_of_spades.png'
          } else if (cardArr[index].suit === '♦') {
            cardArr[index].imageUrl = 'Images/Playing_cards/king_of_diamonds.png'
          } else {
            cardArr[index].imageUrl = 'Images/Playing_cards/king_of_clubs.png'
          }
          break;
        }
      }
      this.drawFlop(cardArr)
      },
      renderOneCard() {
        //Lägger till översta kortet i kortleken och tar bort det ur arrayen
        // console.log(this.deck[0].suit+this.deck[0].value)
        this.card = this.deck[0].suit+this.deck[0].value
        this.deck.splice(0,1)

      },
      createDeck(deck) {
        const suits = ['♥', '♠', '♦', '♣']
        const values = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K']
        for (var i = 0; i < suits.length; i++) {
          for (var n = 0; n < values.length; n++) {
            deck.push({suit:suits[i], value: values[n], imageUrl: '', id: ''})
          }
        }

        this.shuffle(deck)
      },
      shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]
        }
        this.deck = array
        this.card = this.deck[0].suit+this.deck[0].value
        this.addCardsToTable(this.deck)
      }
    }
  }
</script>
<style scoped>
  input {
    width: 100%;
  }
  .outline {
    color: white;
  }

  #tablecard0 {
     position: fixed;
     bottom: 300px;
     right: 950px;
     width: 100px;

  }

   #tablecard1 {
     position: fixed;
     bottom: 300px;
     right: 830px;
     width: 100px;

  }

  #tablecard2 {
     position: fixed;
     bottom: 300px;
     right: 710px;
     width: 100px;

  }
  #tablecard3 {
     position: fixed;
     bottom: 300px;
     right: 590px;
     width: 100px;

  }
  #tablecard4 {
     position: fixed;
     bottom: 300px;
     right: 470px;
     width: 100px;

  }

</style>

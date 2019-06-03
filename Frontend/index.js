import Vue from 'vue'

import CounterButton from './CounterButton.vue'

new Vue({

  data: {
    katt: "Hej"
  },

  el: '#app',

  
  render: h => h(CounterButton)
 
  
})


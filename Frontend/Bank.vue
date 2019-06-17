<template>
  <div id="bank">
    <input
      class="button"
      type="button"
      value="Bank"
      @click="onClick"
    >
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      onClick() {
        this.$store.dispatch('loanMoney')
      }
    }
  }
</script>
    <style scoped>
#bank {
  position: relative;
  z-index: 2;
}

.button {
  margin-right: 70%;
  background-color: #008CBA;
  color: white;
  padding: 8px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  float: left;
}
  </style>

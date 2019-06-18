<template>
  <div id="bank">
    <input
      class="bankbtn"
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
.bankbtn {
  background-color: #4CAF50;
  border: none;
  border-radius: 50%;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
  </style>

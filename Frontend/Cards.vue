<template>
  <div class="outline">
    <div class="top"><span>A</span><span>&hearts;</span></div>
    <h1>&hearts;</h1>
    <div class="bottom"><span>&hearts;</span><span>A</span></div>
  </div>
</template>
<script>
  export default {
    created() {
      this.onClick()
    },
    data() {
      return {
        myCard: []
      }
    },
    methods: {
      onClick() {
        this.counter = this.counter + 1
      }
    }
  }
</script>
<style scoped>
.outline{
    width: 110px;
     text-align: center; 
     padding: 10px;
      background: red;
       display: block
}
.top{
    text-align: left
}
.bottom{
    text-align: right
}
</style>




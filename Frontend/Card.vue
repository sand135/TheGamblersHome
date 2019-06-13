<template>
  <div class="outline">
    <input
       type="button"
       value="Dela ut ett kort"
       v-on:click="$store.commit('drawTurnAndRiver')"
       >
  </div>

</template>
<script>
  export default {
    created() {
    },
    data() {
      return {
      }
    },

    methods: {
    }
  }
</script>
<style scoped>
  input {
    width: 100%;
  }
  .outline {
    color: white;
    position: absolute;
  }
</style>

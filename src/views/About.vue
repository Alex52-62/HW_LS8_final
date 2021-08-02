<template>
  <div class="lorem">
      <button @click="showCalc">Show Calculator</button>
  </div>
  
</template>

<script>

export default {
    name: "About",
    methods: {
      showCalc(){
        this.$modal.show('Calc', {header: "calculator"})
      }
    }
}
</script>

<style scoped>
.lorem {
  width: 1920px;
  height: 1080px;
  background-image: url(../assets/about.jpg);
}
</style>
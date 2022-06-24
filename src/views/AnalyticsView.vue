<template>
<div class="wrapper">
  <header class="header">
    <h1>Аналитика</h1>
  </header>
  <ChartComp />
</div>
</template>

<script>
import ChartComp from '../components/ChartComp.vue'

export default {
  name: 'AnalyticsView',
  components: {
    ChartComp
  },
  mounted(){
    if(!this.$store.getters.token == '5f8475902b0be670555f1bb3'){
      this.$router.push('/auth')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
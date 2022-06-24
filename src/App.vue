<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app{
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
  font-family: 'Roboto', sans-serif;
}
.wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

h1{
  color: #696969;
  font-size: 40px;
  margin: 0 0 10px;
}
</style>

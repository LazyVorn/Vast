<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {}
  },
  computed:{
    userId(){
      return this.$store.state.userId
    }
  },
  watch:{
    userId(){
      this.userId == "" ? this.$router.push("/") : ""
    }
  }
}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  h1,h2,h3,h4,h5,h6,p,span,em,i{
    margin: 0;
    padding: 0;
  }
}
</style>

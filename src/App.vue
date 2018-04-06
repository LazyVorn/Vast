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
    cookiesUserId(){
      this.$store.commit("INIT_USER_ID",this.$cookies.get('user_id'))
      return this.$cookies.get('user_id')
    },
    cookiesToken(){
      return this.$cookies.get('user_token')
    },
    projectId(){
      this.$store.commit("INIT_PROJECT_ID",this.$cookies.get('project_id'))
      return this.$cookies.get('project_id')
    }
  },
  watch:{
  },
  created(){
     if(!this.cookiesUserId || this.cookiesUserId == ""){
       this.$router.push("/")
     } else if(!this.projectId || this.cookiesUserId == "") {
       this.$router.push("/ProjectInfo")
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

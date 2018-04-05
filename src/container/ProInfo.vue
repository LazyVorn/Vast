<template>
<div class="pro_info_wrap">
    <div class="pro_info_top">
        <img class="logo" src="../assets/logo.png">
        <lv-button size="small" @on-click="quit">退出登录</lv-button>
        <lv-button size="small" @on-click="addPro">新建项目</lv-button>
    </div>
    <add-project v-if="add" @close="add = false"></add-project>
</div>  
</template>

<script>
import LvButton from "../components/lv/LvButton"
import AddProject from "../components/AddProject"
export default {
name:"",
components:{
    AddProject,
    LvButton
},
data(){
    return {
        add:false
    }
},
methods:{
    addPro(){
        this.add = true
    },
    quit(){
        this.$store.commit("INIT_USER_ID","")
    }
}
}
</script>

<style lang="less">
.pro_info_wrap{
    width: 100%;
    height: 100%;
    overflow: auto;
    .pro_info_top{
        width: 100%;
        height: 50px;
        border-bottom:1px solid #dddee1;
        .logo{
            float: left;
            height: 50px;
        }
        .lv_btn_wrap{
            float: right;
            margin: 9px 5px;
        }
    }
}
</style>

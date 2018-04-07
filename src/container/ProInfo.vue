<template>
<div class="pro_info_wrap">
    <div class="pro_info_top">
        <img class="logo" src="../assets/logo.png">
        <lv-button size="small" @on-click="quit">退出登录</lv-button>
        <lv-button size="small" @on-click="addPro">新建项目</lv-button>
    </div>
    <div class="pro_list_wrap">
        <pro-box v-for="ele in proInfo" :projectInfo="ele" :key="ele.id" @on-click="getProId"></pro-box>
    </div>
    <add-project v-if="add" @close="add = false" @overload="getList"></add-project>
</div>  
</template>

<script>
import ProBox from "../components/ProBox"
import LvButton from "../components/lv/LvButton"
import AddProject from "../components/AddProject"
export default {
name:"ProInfo",
components:{
    AddProject,
    LvButton,
    ProBox
},
data(){
    return {
        add:false,
        proInfo:[]
    }
},
computed:{
    userId(){
        return this.$store.state.userId
    }
},
methods:{
    addPro(){
        this.add = true
    },
    quit(){
        this.$store.commit("INIT_USER_ID","")
        this.$cookies.remove("user_id")
        this.$cookies.remove("user_token")
        window.location.reload()
    },
    getList(){
        let url = this.$api.fetchProList()
        this.$get(url,{'userId':this.userId}).then(res => {
            this.proInfo = res.rows
        })
    },
    getProId(id){
        this.$cookies.set("project_id",id)
        this.$store.commit("INIT_PROJECT_ID",id)
        this.$router.push(`/${id}/Frame`)
    }
},
created(){
        this.$cookies.remove("project_id")
    this.getList()
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
    .pro_list_wrap{
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
    }
}
</style>

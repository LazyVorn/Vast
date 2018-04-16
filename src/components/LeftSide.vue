<template>
<div class="left_wrap" :class="wrapClass">
    <div class="menu_box" v-for="(ele,index) in menuArr" :key="index" @click="btnClick(ele)" :class="activeId == ele.id ? 'active' : ''">
        <i class="iconfont" v-html="ele.src"></i>
        <span class="value">{{ele.simpleValue}}</span>
    </div>
</div>
</template>

<script>
export default {
name:"LeftSide",
props:{},
data () {
    return {
        activeId:"",
        wrapClass:"",
        menuArr:[
            {
                id:1,
                value:"游戏概况",
                simpleValue:"概况",
                src:"&#xe612;",
                path:"/Overview"
            },
            {
                id:2,
                value:"游戏阵营",
                simpleValue:"阵营",
                src:"&#xe608;",
                path:"/Comp"
            },
            {
                id:3,
                value:"NPC",
                simpleValue:"NPC",
                src:"&#xe612;",
                path:"/NPC"
            },
            {
                id:4,
                value:"角色概览",
                simpleValue:"角色",
                src:"&#xe612;",
                path:"/Character"
            },
            {
                id:5,
                value:"BOSS总览",
                simpleValue:"BOSS",
                src:"&#xe60e;",
                path:"/BOSS"
            }
        ]
    }
},
methods:{
    btnClick(ele){
        this.activeId = ele.id
        this.$router.push(`/${this.$store.state.userId}/Frame${ele.path}`)
    }
},
mounted(){
    this.btnClick(this.menuArr[0])
}
}
</script>

<style lang="less">
.left_wrap{
    box-sizing: border-box;
    position: absolute;
    width: 68px;
    top:60px;
    left:10px;
    bottom:10px;
    color:#fff;
    border:1px solid #4472c4;
    background-color: rgba(255,255,255,0.4);
    border-radius: 10px;
    overflow: hidden;
    .menu_box{
        width: 52px;
        height: 52px;
        margin: 8px auto;
        background-color: #fff;
        border:1px solid #4472c4;
        color:#4472c4;
        border-radius: 6px;
        cursor: pointer;
        transition: .3s;
        &:hover{
            color:#fff;
            background-color: #4472c4;
            box-shadow: 0 0 2px #4472c4;
        }
        &.active{
            color:#fff;
            background-color: #4472c4;
        }
        .iconfont{
            display: block;
            width: 100%;
            height: 30px;
            margin: 2px auto;
            font-size: 24px;
            line-height: 30px;
            text-align: center;
        }
        .value{
            display: block;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
        }
    }
}
</style>

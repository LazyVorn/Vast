/*
 * @Author: 李荣男 
 * @File: 规范-二级规范菜单组件
 * @Date: 2017-12-12 11:28:33 
 * @Last Modified by: 李荣男 
 */
<template>
    <div class="lv_menu">
        <div class="lv_menu_box" v-for="(ele,index) in menuArr" :key="index">
            <div :class="isClick==ele.id?'active':''" class="lv_menu_title" @click.stop="arrowClick($event,ele)">
                <span @click.stop="navClick(ele)">{{ele.name}}</span>
                <i v-if="ele.childs" :class="ele.isShow?'active':''" class="lv_menu_arrow iconfont icon-youjiantou"></i>
            </div>
            <ul v-if="ele.childs" :class="ele.isShow?'active':''" class="lv_menu_nav">
                <li v-for="(child,_index) in ele.childs" :key="_index" :title="child.name" :class="navIsClick==child.id?'active':''"
                @click="navClick(child,ele)">{{child.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
name:"LvMenuList",
props:{
    //数据
    menuData:{
        type:Array,
        default:function(){
            return []
        }
    },
},
computed: {
    //对传入的数据做下处理,加入是否收起的标识
    menuArr(){
        this.menuData.forEach((ele,index) => {
            if(index==0){
                this.$set(ele,"isShow",true)
            } else {
                this.$set(ele,"isShow",false)
            }
        })
        return this.menuData
    },
    //获取全局的mark标记,如触发则意味着我的收藏页面有了变化,自己要更新状态
    mark() {
        return this.$store.state.markNum
    }
},
data () {
    return {
        isClick:"",//一级菜单勾选信息
        navIsClick:""//二级菜单勾选信息
    }
},
methods: {
    //点击箭头
    arrowClick(event,e){
        e.isShow = !e.isShow
        if(event.target.className.indexOf("lv_menu_arrow") < 0){
            this.isClick = e.id
            this.navIsClick = ""
            this.$emit("navClick",{
                "event":e,
                "parent":null
            })
        }
    },
    //点击二级菜单
    navClick(e,parent){
        if(parent){
            this.isClick = parent.id
            this.navIsClick = e.id
            this.$emit("navClick",{
                "event":e,
                "parent":parent
            })
        }
    }
}
}
</script>

<style lang="less">
.lv_menu{
    width: 200px;
    height: 100%;
    border-right:1px solid #eee;
    background-color: #fff;
    .lv_menu_box{
        width: 100%;
        overflow: hidden;
        .lv_menu_title{
            box-sizing: border-box;
            position: relative;
            width: 100%;
            height: 40px;
            text-align: left;
            padding:0 10px;
            font-size: 14px;
            color:#48576a;
            line-height: 40px;
            overflow: hidden;
            cursor: pointer;
            &.active{
                background-color: #e4e8f1;
            }
            &:hover{
                background-color: #e4e8f1;
            }
            .lv_menu_arrow{
                display: block;
                float: right;
                width: 12px;
                height: 20px;
                font-size: 12px;
                line-height: 20px;
                margin: 10px 5px 0 20px;
                cursor: pointer;
                transition: .3s;
                &.active{
                    transform: rotate(90deg);
                }
            }
        }
        .lv_menu_nav{
            width: 100%;
            list-style: none;
            text-align: left;
            margin: 0;
            padding: 0;
            color:#999;
            font-size: 14px;
            border-bottom: 1px solid #eee;
            li{
                position: relative;
                height: 0;
                width: 100%;
                line-height: 26px;
                text-align: left;
                text-indent: 20px;
                transition: .3s;
                cursor: pointer;
                color:#fff;
                background-color: #fff;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &:hover{
                    color:#4ba0e6 !important;
                    text-decoration: underline;
                }
                &.active{
                    color:#4ba0e6 !important;
                    text-decoration: underline;
                }
            }
            &.active{
                li{
                    color:#48576a;
                    height: 26px;
                }
            }
        }
    }
}
</style>
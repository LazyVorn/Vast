<template>
    <div class="lv_box_wrap" :style="wrapStyle">
        <h1 class="lv_box_title" v-if="needTitle">
            <span v-html="title"></span>
            <i v-if="needClose" class="iconfont close-btn icon-cha"></i>
        </h1>
        <div class="lv_box">
            <slot>这是一段文本</slot>
        </div>
    </div>
</template>

<script>
export default {
name:"lv_box",
title:"box组件",
props:{
    needTitle:{
        type:Boolean,
        default:true
    },
    needClose:{
        type:Boolean,
        default:true
    },
    title:{
        type:String,
        default:""
    },
    width:{
        type:String,
        default:"400px"
    },
    height:{
        type:String,
        default:"260px"
    }
},
computed: {
    wrapStyle(){
        return {
            width:this.checkFunc(this.width),
            height:this.checkFunc(this.height)
        }
    }
},
data() {
    return {
    }
},
methods:{
    checkFunc(e){
        let _info = e
        if(_info.indexOf("px")<0 && _info.indexOf("%")<0){
            _info += "px"
        }
        return _info
    }
}
}
</script>

<style lang="less">
.lv_box_wrap{
    position: relative;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 5px;
    padding-top:34px;
    cursor: default;
    .lv_box_title{
        position: absolute;
        box-sizing: border-box;
        width:100%;
        height: 34px;
        top:0;
        line-height: 34px;
        text-align: center;
        font-size: 14px;
        padding:0 10px;
        overflow: hidden;
        color:#48576a;
        background-color: #e4e8f1;
        border: 1px solid #ccc;
        border-radius: 5px 5px 0 0;
        .close-btn{
            float: right;
            cursor:pointer;
            transition: .3s;
            &:hover{
                color:#000;
            }
        }
    }
    .lv_box{
        box-sizing: border-box;
        width:100%;
        height: 100%;
        overflow: hidden;
        border: 1px solid #ccc;
        border-top:none;
        box-shadow: 3px 3px 4px #d6dbdb;
    }

}
</style>

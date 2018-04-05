<template>
    <div class="lv_btn_wrap" @click="btnClick($event)">
        <i v-if="icon!=''" :class="icon" class="iconfont btn_icon"></i>
        <button :style="Object.assign(wrapSize,btnColor)" :class="needBan ? 'ban_style' : ''">
            <slot></slot>
        </button>
    </div>
</template>

<script>
export default {
name:"lv_btn",
title:"按钮组件",
props:{
    icon:{
        type:String,
        default:""
    },
    size:{
        type:String,
        default:"normal"
    },
    type:{
        type:String,
        default:"normal"
    },
    needBan:{
        type:Boolean,
        default:false
    }
},
computed: {
    wrapSize(){
        return this.sizeOption[this.size] || this.sizeOption.normal
    },
    btnColor(){
        return this.colorOption[this.type] || this.colorOption.normal
    },
},
data() {
    return {
        sizeOption:{
            large:{
                padding:"0 30px",
                height:"48px",
                fontSize:"16px",
                lineHeight:"50px"
            },
            normal:{
                padding:"0 20px",
                height:"40px",
                lineHeight:"40px"
            },
            small:{
                padding:"0 15px",
                height:"32px",
                lineHeight:"32px"
            }
        },
        colorOption:{
            success:{
                backgroundColor: "green"
            },
            normal:{
                backgroundColor: "#007fff"
            },
            warning:{
                backgroundColor: "red"
            }
        }
    }
},
methods:{
    btnClick(event){
        if(this.needBan) return
        this.$emit("on-click",event)
    }
}
}
</script>

<style lang="less">
    .lv_btn_wrap{
        box-sizing: border-box;
        display:inline-block;
        button{
            display: block;
            width:100%;
            height:100%;
            color:#fff;
            font-size: 14px;
            transition: .3s;
            border: 1px solid #ddd;
            border-radius: 5px;
            &:hover{
                opacity: .8;
            }
            &.ban_style{
                background-color: #ddd !important;
                cursor:not-allowed;
            }
        }
    }
</style>

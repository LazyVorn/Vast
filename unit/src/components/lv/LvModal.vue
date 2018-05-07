<template>
    <div class="lv_modal_layer">
        <div class="lv_modal_wrap" :style="{width:width + 'px',marginLeft : - width/2 + 'px'}">
            <div class="lv_modal_title">
                <p>{{title}}</p>
                <i class="iconfont" @click="close">&#xe603;</i>
            </div>
            <div class="lv_modal_body">
                <slot></slot>
            </div>
            <div class="lv_modal_btn_wrap" v-if="needBtn">
                <lv-button size="small" @on-click="cancel">{{noSure}}</lv-button>
                <lv-button size="small" @on-click="ok">{{sure}}</lv-button>
            </div>
        </div>
    </div>
</template>

<script>
import LvButton from "./LvButton"
export default {
name:"LvModal",
props:{
    width:{
        type:Number,
        default:300
    },
    title:{
        type:String,
        default:""
    },
    sure:{
        type:String,
        default:"确定"
    },
    noSure:{
        type:String,
        default:"取消"
    },
    needShow:{
        type:Boolean,
        default:false
    },
    needBtn:{
        type:Boolean,
        default:true
    }
},
components:{
    LvButton
},
methods:{
    close(){
        this.$emit('close')
    },
    ok(){
        this.$emit('ok')
        this.close()
    },
    cancel(){
        this.$emit('cancel')
        !this.needShow ? this.close() : ""
    },
}
}
</script>

<style lang="less">
.lv_modal_layer{
    position: fixed;
    width: 100%;
    height: 100%;
    left:0;
    top:0;
    overflow: auto;
    z-index: 2000;
    background-color: rgba(0, 0, 0, .6);
    .lv_modal_wrap{
        position: absolute;
        top:10%;
        left:50%;
        min-width: 300px;
        border:1px solid #dddee1;
        border-radius: 6px;
        background-color: #fff;
        .lv_modal_title{
            width: 100%;
            height: 40px;
            border-bottom:1px solid #dddee1;
            border-radius: 5px 5px 0 0;
            color:#424242;
            line-height: 40px;
            text-indent: 10px;
            font-size: 14px;
            p{
                font-weight: 600;
                float: left;
            }
            .iconfont{
                float: right;
                height: 40px;
                line-height: 42px;
                transition: .3s;
                margin-right: 10px;
                cursor: pointer;
                &:hover{
                    color:#4472c4;
                }
            }
        }
        .lv_modal_body{
            width: 100%;
            min-height:120px;
        }
        .lv_modal_btn_wrap{
            position: absolute;
            bottom: 0;
            left:0;
            width: 100%;
            height: 46px;
            border-top: 1px solid #dddee1;
            .lv_btn_wrap{
                margin: 7px 10px 0 0;
                float: right;
            }
        }
    }
}
</style>

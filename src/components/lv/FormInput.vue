<template>
<div class="lv_form_input_wrap">
    <span v-if="this.label!=''" class="lv_form_input_label">{{label}}</span>
    <input :class="warning?'warning':''" maxlength="20" class="lv_form_input" :type="type" v-model="message" :placeholder="placeholder" @blur="blurFunc" @keyup="keyup" @keyup.enter="enterClick($event)">
    <p v-if="this.needCheck&&this.warning" class="lv_form_input_info" v-html="checkInfo"></p>
    <p v-if="this.needCheck&&this.repeat" class="lv_form_input_info" v-html="repeatInfo[noRepeat]"></p>
</div>  
</template>

<script>
export default {
    name:"lv-input-of-form",
    title:"表单需交验的input组件",
    props:{
        label:{
            type:String,
            default:""
        },
        type:{
            type:String,
            default:"text"
        },
        noRepeat:{
            type:String,
            default:""
        },
        placeholder:{
            type:String,
            default:""
        },
        checkInfo:{
            type:String,
            default:"输入值不符合标准"
        },
        needCheck:{
            type:Boolean,
            default:false
        },
        enter:{
            type:Boolean,
            default:false
        }
    },
    computed: {
    },
    data () {
        return {
            message:"",
            repeatInfo:{
                "account":"用户名重复，请重新命名",
                "email":"邮箱重复，请重新命名",
                "tel":"手机号重复，请重新命名"
            },
            warning:false,
            repeat:false
        }
    },
    watch: {
        message(){
            this.message = this.message.trim()
        },
    },
    methods:{
        enterClick(event){
            if(!this.enter) return
            this.blurFunc()
            this.$emit("enter")
        },
        keyup(){
            this.$emit("value",this.message.trim())
        },
        checkRepeat(){
            let url = "http://47.98.112.70:8080/user/precondition",
                _obj = {}
                _obj[this.noRepeat] = this.message
            this.$post(url,_obj).then(res => {
                if(res.status && res.status == 409) {
                    this.repeat = true
                } else {
                    this.repeat = false
                }
            })
        },
        blurFunc(){
            if(!this.needCheck) return
            let check = new RegExp()
            if(this.type=="text"){
                check = /^[a-zA-Z0-9_-]{4,16}$/
                this.warning = !check.test(this.message) ? true : false
            }
            if(this.type=="password"){
                this.warning = this.message == "" ? true : false
            }
            this.$emit("warning",this.warning)
            !this.warning && this.noRepeat != "" ? this.checkRepeat() : ""
        }
    }
}

</script>

<style lang="less">
    .lv_form_input_wrap{
        position: relative;
        width:240px;
        height: 60px;
        margin:10px 0px 10px 80px;
        input{
            box-sizing: border-box;
            width: 100%;
            height:38px;
            font-size: 14px;
            line-height:40px;
            padding:0;
            color:#999;
            text-indent: 8px;
            background-color: #fff;
            border:1px solid #bbb;
            border-radius: 0 6px 6px 0;
            &.warning{
            border-radius: 0 6px 6px 0;
            border:1px solid red;
            border-left:8px solid red;
            }
            &:focus{
                outline: none;
                box-shadow: 2px 2px 2px #ddd;
            }
            &::placeholder{
                font-size: 12px;
                color:#ccc;
            }
        }
        .lv_form_input_info{
            font-size: 12px;
            color:red;
            text-align: left;
            text-indent: 8px;
            line-height: 22px;
        }
        .lv_form_input_label{
            position: absolute;
            left:-80px;
            width: 80px;
            height:38px;
            line-height: 36px;
            text-align: right;
            font-size: 14px;
            font-weight: 400;
            color:#48576a;
        }
    }
</style>

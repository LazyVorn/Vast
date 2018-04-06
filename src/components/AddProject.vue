<template>
    <div class="add_pro_layer">
        <div class="add_pro_wrap">
            <div class="add_pro_title">
                <i class="title_btn iconfont">&#xe60e;</i>
                <p>新建项目</p>
                <i class="close_btn iconfont" @click="close">&#xe603;</i>
            </div>
            <div class="add_pro_box">
                <el-steps :active="active" finish-status="success" simple style="zoom:0.9">
                    <el-step title="第一步"></el-step>
                    <el-step title="第二步"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
                <div class="apb_first_box" v-show="active == 1">
                    <label for="name-inp">游戏名称：</label>
                    <input type="text" id="name-inp" maxlength="20" v-model="nameInfo" placeholder="请输入新游戏的名字,不得超过20字">
                    <p class="none"></p>
                    <label for="detail-inp">游戏简述：</label>
                    <textarea id="detail-inp" maxlength="200" v-model="detailInfo" placeholder="请输入新游戏的大概描述,200字以内"></textarea>
                </div>
            </div>
            <div class="add_pro_btn_wrap">
                <lv-button size="small" v-if="active == 3" @on-click="finishClick">完成</lv-button>
                <lv-button size="small" v-if="active < 3" @on-click="active++" :needBan="next">下一步</lv-button>
                <lv-button size="small" v-if="active > 1" @on-click="active--">上一步</lv-button>
            </div>
        </div>
    </div>
</template>

<script>
import LvButton from "../components/lv/LvButton"
export default {
name:"AddProject",
components:{
    LvButton
},
data(){
    return {
        active:1,
        nameInfo:"",
        detailInfo:""
    }
},
computed:{
    next(){
        let _mark = true
        if(this.active == 1){
            _mark = this.nameInfo != "" ? false : true
        } else {
            _mark = false
        }
        return _mark 
    },
    userId(){
        return this.$store.state.userId
    }
},
watch:{
    nameInfo(){
        this.nameInfo = this.nameInfo.trim()
    },
},
methods:{
    finishClick(){
            let url = this.$api.addPro()
        this.$post(url,{'createPerson':this.userId,'name':this.nameInfo,'introduction':this.detailInfo}).then(res => {
            this.$Message.success("新建成功")
            this.$emit('overload')
            this.close()
        })
    },
    close(){
        this.$emit("close")
    }
}
}
</script>

<style lang="less">
.add_pro_layer{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    background-color: rgba(0,0,0,.6);
    .add_pro_wrap{
        position: absolute;
        box-sizing: border-box;
        width: 900px;
        height: 600px;
        top:10%;
        left:50%;
        margin-left: -450px;
        padding:0 10px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        .add_pro_title{
            position: relative;
            width: 100%;
            height: 50px;
            border-bottom: 1px solid #ddd;
            .title_btn{
                position: absolute;
                top:13px;
                font-size: 20px;
                left:10px;
                font-weight: 900;
            }
            p{
                width: 100%;
                height: 50px;
                font-size: 16px;
                font-weight: 400;
                line-height: 50px;
                text-indent: 40px;
            }
            .close_btn{
                position: absolute;
                top:12px;
                right:0px;
                font-size: 20px;
                cursor: pointer;
                transition: .3s;
                &:hover{
                    color:#007fff;
                }
            }
        }
        .add_pro_box{
            position: absolute;
            box-sizing: border-box;
            width: 100%;
            top:50px;
            bottom:50px;
            left:0;
            padding:10px;
            overflow: auto;
            .apb_first_box{
                width: 405px;
                margin: 40px auto;
                .none{
                    height: 40px;
                }
                label{
                    font-size: 14px;
                    color:#666;
                }
                #name-inp{
                    width: 300px;
                    height: 40px;
                    margin: 0 10px;
                    border: none;
                    border-bottom: 1px solid #ddd;
                    font-size: 14px;
                    line-height:40px;
                    color:#999;
                    text-indent: 8px;
                    transition: .3s;
                    &::placeholder{
                        font-size: 12px;
                        color:#ccc;
                    }
                    &:focus{
                        border-bottom: 1px solid#007fff;
                        outline: none;
                    }
                }
                #detail-inp{
                    box-sizing: border-box;
                    width: 300px;
                    height: 200px;
                    margin: 0 10px;
                    border:1px solid #ddd;
                    font-size: 14px;
                    line-height: 1.5;
                    padding:8px;
                    color:#999;
                    vertical-align: top;
                    resize:none;
                    &::placeholder{
                        font-size: 12px;
                        color:#ccc;
                    }
                }  
            }
        }
        .add_pro_btn_wrap{
            position: absolute;
            height: 50px;
            border-top:1px solid #ddd;
            bottom:0;
            left:10px;
            right:10px;
            .lv_btn_wrap{
                float: right;
                margin: 9px 0 0 10px;
            }
        }
    }
}
</style>

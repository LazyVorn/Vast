<template>
    <div class="add_dic_wrap">
        <ul>
            <li v-for="(ele,index) in addList" :key="index">
                <p>
                    <span class="label">字段名称:</span>
                    <input class="name_inp" type="text" v-model="ele.name"/>
                    <el-radio-group v-model="ele.type">
                        <el-radio :label="1">常量</el-radio>
                        <el-radio :label="2">变量</el-radio>
                        <el-radio :label="3">函数型</el-radio>
                    </el-radio-group>
                    <template v-if="type=='add'">
                        <em class="btn" v-if="index + 1 == addList.length" @click="btnClick(1,index)"><i class="iconfont">&#xe676;</i></em>
                        <em class="btn" v-if="index + 1 != addList.length" @click="btnClick(0,index)"><i class="iconfont">&#xe675;</i></em>
                    </template>
                </p>
                <p>
                    <el-select v-model="ele.tagIds" size="small" multiple placeholder="请选择标签">
                        <el-option
                        v-for="item in allTags"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name">
                        </el-option>
                    </el-select>
                </p>
            </li>
        </ul>
        <div class="lv_modal_btn_wrap">
            <lv-button size="small" @on-click="close">取消</lv-button>
            <lv-button size="small" :needBan="checkOk" @on-click="ok">确定</lv-button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
name:"AddDic",
props:{
    type:{
        type:String,
        default:"add"
    },
    editData:{
        type:Object,
        default:function(){
            return {}
        }
    }
},
components:{},
data () {
    return {
        addList:[{name:"",type:1,tagIds:[]}],
    }
},
methods:{
    close(){
        this.$emit('close')
    },
    ok(){
        if(this.type == "add"){
            this.$post(this.$api.editDic(7),{projectId:this.projectId,abilities:this.addList}).then(res => {
                this.$emit("reload")
                this.$Message.success("添加成功")
                this.close()
            })
        } else {
            this.$put(this.$api.editDic(7),{projectId:this.projectId,abilities:this.addList}).then(res => {
                this.$emit("reload")
                this.$Message.success("修改成功")
                this.close()
            })
        }
    },
    btnClick(type,index){
        type == 1 ? this.addList.push({name:"",type:1,tagIds:[]}) : this.addList.splice(index,1)
    }
},
computed:{
    ...mapState(["projectId","allTags"]),
    checkOk(){
        return this.addList.some(ele => ele.name == '')
    },
},
watch:{
    editData(){
        if(this.type == "edit"){
            this.addList = []
            this.addList.push(this.editData)
        }
    }
},
created(){
    if(this.type == "edit"){
        this.addList = []
        this.addList.push(this.editData)
    }
}
}
</script>

<style lang="less">
    .add_dic_wrap{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 10px;
        ul{
            box-sizing: border-box;
            width: 100%;
            height: 240px;
            padding: 0 10px;
            overflow: auto;
            overflow-x: hidden;
            list-style: none;
            li{
                width: 100%;
                overflow: hidden;
                p{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    .label{
                        font-size: 14px;
                        font-weight: 600;
                    }
                    .name_inp{
                        width: 120px;
                        height: 30px;
                        line-height: 30px;
                        font-size: 14px;
                        margin: 0 10px;
                        border-radius: 6px;
                        text-indent: 10px;
                        color:#999;
                        border:1px solid #999;
                        outline: none;
                    }
                    .el-select{
                        width:458px;
                        input{
                            border-color:#999;
                            &:hover{
                                border-color:#999;
                            }
                        }
                        .el-input__icon{
                            color:#999;
                        }
                    }
                    .el-radio+.el-radio {
                        margin-left: 10px;
                    }
                    .btn{
                        float: right;
                        display: block;
                        margin-left: 10px;
                        font-size: 18px;
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        color:#fff;
                        margin: 5px auto;
                        border-radius: 6px;
                        background-color: rgb(68, 114, 196);
                        text-align: center;
                        transition: .3s;
                        cursor: pointer;
                        &:hover{
                            background-color:#409EFF;
                        }
                    }
                }
            }
        }
    }
</style>

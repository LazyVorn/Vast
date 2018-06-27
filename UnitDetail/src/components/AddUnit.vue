<template>
    <div class="add_unit_wrap">
        <div class="unit_info_box">
            <label for="unit_name">兵种名称：</label>
            <input id="unit_name" type="text" placeholder="请输入名称" v-model="name"><br>
            <label for="unit_remark">选择标签：</label>
            <el-select v-model="tagIds" size="small" multiple placeholder="请选择标签">
                <el-option
                v-for="item in allTags"
                :key="item.id"
                :value="item.id"
                :label="item.name">
                </el-option>
            </el-select><br>
            <label for="unit_remark">简单介绍：</label>
            <textarea id="unit_remark" placeholder="请输入备注"></textarea>
        </div>
        <div class="unit_abilities_box">
            <div class="unit_abilities_btn_wrap">
                <lv-button size="mini" @on-click="abilityClick">定制能力</lv-button>
            </div>
            <div class="ability_box" :class="editAbilities ? 'active' : ''">
                <div class="ability_nav">
                    <el-radio-group v-model="choosedTag">
                        <el-radio v-for="ele in abilityTagArr" :key="ele.id" :label="ele.id">{{ele.name}}</el-radio>
                    </el-radio-group>
                </div>
                <div class="ability_list">
                    <span class="ability_tag" v-for="ele in abilityArr" :key="ele.id" 
                    v-show="ele.isChoosed" :class="ele.active ? 'active' : ''" @click="tagClick(ele)">{{ele.name}}</span>
                </div>
                <div class="ability_btn">
                    <span class="btn" @click="editOk">选择完毕</span>
                    <span class="btn" @click="chooseAll">{{allChooseState ? "全部取消" : "全部选择"}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
name:"AddUnit",
data () {
    return {
        name:"",
        editAbilities:false,
        allTags:[],
        tagIds:[],
        abilityArr:[],
        choosedTag:"",
        abilityTagArr:[],
        allChooseState:false,
        abilityObjArr:[]
    }
},
methods:{
    getAllTageArr(){
        this.$get(this.$api.getAllTage(this.projectId)).then(res => {
            res.rows.unshift({id:-1,name:"全部",color:"#fff"})
            this.abilityTagArr = res.rows
            this.choosedTag = -1
        })
    },
    getAbilityArr(){
        this.$get(this.$api.getDicList(this.projectId)).then(res => {
            res.rows.forEach(ele => {
                ele.isChoosed = true
                ele.active = false
            })
            this.abilityArr = res.rows
        })
    },
    getTags(){
    },
    abilityClick(){
        this.editAbilities = !this.editAbilities
    },
    tagClick(ele){
        ele.active = !ele.active
    },
    chooseAll(){ 
            this.allChooseState = !this.allChooseState
            this.abilityArr.forEach(ele => {
                ele.isChoosed ? ele.active = this.allChooseState : ""
          })
    },
    editOk(){
        let _arr = []
        this.abilityArr.forEach(ele => {
            ele.isChoosed && !this.abilityObjArr.some(_e => _e == ele.id) ? _arr.push(ele.id) : ""
            this.abilityObjArr.forEach(_ele => {
                _ele.id == ele.id && ele.isChoosed ? _arr.push(_ele.id) : ""
            })
        })
        this.abilityObjArr = this.abilityObjArr.filter(ele => _arr.some(_ele => ele.id == _ele.id))
        this.editAbilities = false
    }
},
  computed: {
    ...mapState(["projectId"])
  },
  watch:{
      choosedTag(){
        if(this.choosedTag == -1){
            this.abilityArr.forEach(ele => {
                ele.isChoosed = true
            })
        } else {
            this.abilityArr.forEach(ele => {
                ele.isChoosed = false
              let _mark = 0
              ele.tags.forEach(_ele => {
                  _ele.id == this.choosedTag ? _mark++ : ""
              })
              ele.isChoosed = (_mark > 0)
          })
        }
      }
  },
created(){
    this.getAbilityArr()
    this.getAllTageArr()
}
}
</script>

<style lang="less">
.add_unit_wrap{
    box-sizing: border-box;
    width: 100%;
    height: 600px;
    padding: 10px;
    overflow: auto;
    .unit_info_box{
        box-sizing: border-box;
        float: left;
        width: 285px;
        height: 530px;
        padding: 10px;
        border: 1px solid #dddee1;
        border-radius: 6px;
        #unit_name,#unit_remark{
            box-sizing: border-box;
            width: 200px;
            padding: 0 15px;
            border: 1px solid #dddee1;
            border-radius: 6px;
            margin:0 0 10px 0;
            &:focus{
                outline: none;
                box-shadow: 2px 2px 2px #ddd;
            }
            &::placeholder{
                font-size: 12px;
                color:#ccc;
            }
        }
        #unit_name{
            height: 30px;
            line-height: 30px;
        }
        #unit_remark{
            height: 120px;
            line-height: 30px;
            font-size: 14px;
            color:#999;
        }
        label{
            font-weight: 600;
        }
        .el-select{
            width: 200px;
            margin-bottom: 10px;
            input::placeholder{
                font-size: 12px;
                color:#ccc;
            }
        }
    }
    .unit_abilities_box{
        position: relative;
        box-sizing: border-box;
        float: right;
        width: 880px;
        height: 530px;
        padding: 10px;
        border: 1px solid #dddee1;
        border-radius: 6px;
        .unit_abilities_btn_wrap{
            width: 100%;
            height: 34px;
            .lv_btn_wrap{
            margin: 0 6px 0 0;
            float: right;
            }
        }
        .ability_box{
            box-sizing: border-box;
            position: absolute;
            width:860px;
            height: 0;
            padding: 0 10px;
            overflow: auto;
            border: 1px solid #dddee1;
            border-radius:0 0 6px 6px;
            transition: .3s;
            &.active{
                padding:5px 10px;
                height: 124px;
            } 
            .ability_nav{
                width: 100%;
                margin-bottom: 5px;
            }
            .ability_list{
                height: 69px;
                .ability_tag{
                    display: block;
                    float: left;
                    height: 24px;
                    line-height: 24px;
                    padding: 0 8px;
                    margin: 5px 5px 5px 0;
                    border:1px solid #eee;
                    background-color:#fff;
                    color:#999;
                    font-size: 14px;
                    cursor: pointer;
                    transition: .3s;
                    &:hover{
                        color: #4472c4;
                        border:1px solid #4472c4;
                    }
                    &.active{
                        color: #4472c4;
                        border:1px solid #4472c4;
                    }
                }
            }
            .ability_btn{
                width: 100%;
                .btn{
                    display: block;
                    float: right;
                    margin: 0 0 0 10px;
                    color:#4472c4;
                    font-size: 12px;
                    cursor: pointer;
                    transition: .3s;
                    &:hover{
                    color:#5288e6;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>

<template>
    <p class="lv_tag_label" :style="{background:info.color || '#666'}">
      <i class="iconfont" @click="editTag(info)" v-if="needEdit">&#xe601;</i>
      <span class="label_name">{{info.name}}</span>
      <i class="iconfont" @click="delTag(info)" v-if="needEdit">&#xe603;</i>
      <span class="hide"></span>
    </p>  
</template>

<script>
export default {
name:"LvTag",
props:{
  needEdit:{
    type:Boolean,
    default:false
  },
    info:{
        type:Object,
        default:function(){
            return {}
        }
    }
},
methods:{
  delTag(){
    this.$emit("del",this.info)
  },
  editTag(){
    this.$emit("edit",this.info)
  }
}
}
</script>

<style lang="less">
      .lv_tag_label {
        box-sizing: border-box;
        display: inline-block;
        min-width: 60px;
        height: 20px;
        margin: 0 5px;
        padding: 0 0 0 5px;
        border-radius: 0 5px 5px 0;
        color: #fff;
        font-size: 12px;
        line-height: 20px;
        .iconfont {
          font-size: 12px;
          margin-right: 5px;
          cursor: pointer;
          transition: .3s;
          &:hover{
            color: #eee;
          }
        }
        .label_name {
          cursor: pointer;
          margin-right: 5px;
          transition: .3s;
          &:hover{
            color: #eee;
          }
        }
        .hide {
          display: block;
          float: right;
          border-left: none;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-right: 6px solid #fff;
        }
      }
</style>

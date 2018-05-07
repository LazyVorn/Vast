<template>
    <ul class="dic_ul">
        <li v-for="ele in data" :key="ele.id">
            <div class="list_name">
                <span class="name" @click="editTag(ele)">{{ele.name}}</span>
                <span class="type">({{typeStatus[ele.type]}})</span>
            </div>
            <div class="list_label">
                <lv-tag v-for="_ele in ele.tags" :key="_ele.id" :info="_ele"></lv-tag>
            </div>
                <i class="iconfont del_btn" @click="delClick(ele)">&#xe632;</i>
        </li>
    </ul>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: "DicList",
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      typeStatus:{1:'常量',2:'变量',3:'函数型'}
    };
  },
  methods: {
    delClick(ele) {
        this.$del(this.$api.delDic(ele.id,7,this.projectId)).then(res => {
            this.$Message.success("删除成功")
            this.$emit("reload")
        })
    },
    editTag(ele) {
        this.$emit("edit",ele)
    }
  },
  computed:{
    ...mapState(["projectId"])
  }
};
</script>

<style lang="less">
.dic_ul {
  width: 100%;
  height: 100%;
  overflow: auto;
  list-style-type: none;
  cursor: default;
  li {
    width: 100%;
    height: 40px;
    border-bottom: 1px dashed #dddee1;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &.active {
      color: #4472c4;
      .name{
          text-decoration: underline;
      }
    }
    .list_name {
      float: left;
      overflow: hidden;
      .name{
          float: left;
          font-size: 14px;
            display: block;
            max-width: 150px;
            text-indent: 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            &:hover{
                color:#4472c4;
          text-decoration: underline;
            }
      }
      .type{
          float: left;
            display: block;
            line-height: 42px;
            margin-left: 10px;
            color: #4472c4;
      }
    }
    .list_label {
      float: left;
      margin-left: 10px;
      overflow: hidden;
    }
    .del_btn {
    float: right;
      font-size: 14px;
      line-height: 42px;
      margin-left: 5px;
      color: #999;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        color: #4472c4;
      }
    }
  }
}
</style>
